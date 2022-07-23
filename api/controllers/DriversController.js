/**
 * DriversController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getDriver: async function (req, res) {
        let driverData = {
            name: req.param('name'),
            email: req.param('email')
        }
        const driver = await Drivers.find({ email: driverData.email, name: driverData.name });
        if (driver[0]) {
            return res.redirect(`/driverOrdersView/${driver[0].id}`);
        } else {
            res.view('pages/driver', { message: 'Please try again with correct creds.' });
        }
    },


    driverOrdersView: async function (req, res) {
        const driver_id = req.param('id');
        //get driver data to render the view
        const driver = await Drivers.find().where({
            id: driver_id
        });
        return res.view('pages/driver_orders', { driver: driver });
    },

    driver: function (req, res) {
        return res.view('pages/driver', { message: undefined })
    },

    assignToDriversRoom: async function (req, res) {
        if (!req.isSocket) {
            return res.badRequest();
        }
        sails.sockets.join(req, 'drivers', function (err) {
            if (err) {
                return res.serverError(err);
            }
        });
        return res.json({
            message: 'Subscribed to the drivers room!'
        });
    },

    notification: async function (req, res) {
        if (!req.isSocket) {
            return res.badRequest();
        }
        sails.sockets.broadcast('ORRoom', 'notification', { msg: req.body.msg });
        return 'Notification sent successfully!';
    }
};

