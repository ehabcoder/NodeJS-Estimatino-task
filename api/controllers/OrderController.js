/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    merchantOrders: async function (req, res) {
        if (!req.isSocket) {
            return res.badRequest();
        };
        const merchantOrders = await Order.find().where({
            merchant_id: req.param('id')
        });
        res.status(200).json({ merchantOrders: merchantOrders[merchantOrders.length - 1] });
    },

    merchantAccept: async function (req, res) {
        if (!req.isSocket) {
            return res.badRequest();
        }
        sails.sockets.join(req, 'ORRoom', async function (err) {
            if (err) {
                return res.serverError(err);
            }
            const updatedOrder = await Order.updateOne({ id: req.param('order_id') })
                .set({
                    merchant_status: 'Accepted!'
                });
            if (updatedOrder) {
                sails.sockets.broadcast('ORRoom', 'merchantAccept', { updatedOrder });
                sails.sockets.broadcast('drivers', 'newOrder', { order: updatedOrder });
            }
            return res.json({
                message: 'Subscribed to the ORRoom'
            })
        })
    },

    driverAccept: async function (req, res) {
        if (!req.isSocket) {
            return res.badRequest();
        }
        sails.sockets.join(req, 'ORRoom', async function (err) {
            if (err) {
                return res.serverError(err);
            }
            const updatedOrder = await Order.updateOne({ id: req.param('order_id') })
                .set({
                    driver_status: 'Accepted!',
                    driver_id: req.body.driver_id
                });
            if (updatedOrder) {
                sails.sockets.broadcast('ORRoom', 'driverAccept', { updatedOrder });
            }
            return res.json({
                message: 'Driver Accept the order and assigned to the ORRoom'
            })
        })
    },


    merchantReject: async function (req, res) {
        if (!req.isSocket) {
            return res.badRequest();
        }
        sails.sockets.broadcast('ORRoom', `merchantReject`);
        const deletedOrder = await Order.destroyOne({ id: req.param('order_id') });
        return res.json({
            message: 'rejected and the order deleted from the database.'
        })
    },

    driverReject: async function (req, res) {
        if (!req.isSocket) {
            return res.badRequest();
        }
        sails.sockets.broadcast('ORRoom', `driverReject`);
        return res.json({
            message: 'driver reject the order'
        })
    },

    ORRoom: async function (req, res) {
        const client_id = req.param('client_id');
        const client = await Clients.find({ id: client_id });
        const orders = await Order.find({ client_id: client_id });
        const order = orders[orders.length - 1];

        // get only the last order in the database
        return res.view('pages/ORRoom', { client: client, order: order })
    },

    OrderWithDriver: async function (req, res) {
        if (!req.isSocket) {
            return res.badRequest();
        }
        const driver = await Order.find({ driver_id: req.param('driver_id') });
        return res.status(200).json({ driver: driver[driver.length - 1] });
    }
}

