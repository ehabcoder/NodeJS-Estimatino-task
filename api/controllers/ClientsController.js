/**
 * ClientsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {

  subscribeFunRoomMembersToFunnerRooms: function (req, res) {
    sails.sockets.addRoomMembersToRooms('clients', ['merchants', 'drivers'], function (err) {
      if (err) { return res.serverError(err); }
      res.json({
        message: 'Subscribed all members of `clients` to `merchants` and `drivers`!'
      })
    });
  },

  createUser: async function (req, res) {
    let clientData = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    }
    let client = await Clients.find({
      where: { email: req.body.email }
    });
    if (client[0]) {
      return res.redirect(`/getOrderForm/${client[0].id}`);
    } else {
      const createdUser = await Clients.create(clientData).fetch();
      return res.redirect(`/getOrderForm/${createdUser.id}`)
    }
  },

  makeOrder: async function (req, res) {
    let orderData = {
      title: req.body.title,
      description: req.body.description,
      client_id: req.body.client_id,
      merchant_id: req.body.merchant_id
    }
    let createdOrder = await Order.create(orderData).fetch();
    return res.redirect(`/ORRoom/${createdOrder.client_id}`);
  },

  getOrderForm: async function (req, res) {
    const client = await Clients.find({ id: req.param('client_id') });
    res.view('pages/orders', { client: client });
  },

  ORRoom: async function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }
    var roomName = "ORRoom"
    sails.sockets.join(req, roomName, async function (err) {
      if (err) {
        return res.serverError(err);
      }
      let orderData = {
        title: req.body.title,
        description: req.body.description,
        client_id: req.body.client_id,
        merchant_id: req.body.merchant_id
      }
      let createdOrder = await Order.create(orderData).fetch();
      res.status(201).json("Created a Room called " + roomName);
    })
  },

  ORRooms: async function (req, res) {
    res.view('pages/ORRoom');
  },

  assignToClientRoom: async function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }
    sails.sockets.join(req, 'ORRoom', function (err) {
      if (err) {
        return res.serverError(err);
      }
    });
    return res.json({
      message: 'Subscribed to the ORRoom room!'
    });
  },

  recieved: async function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }
    const updatedOrder = await Order.updateOne({ id: req.body.orderID })
      .set({
        merchant_status: 'Order Delivered!',
        driver_status: 'Order Delivered!'
      });

    return sails.sockets.blast('delivered',
      { msg: 'Delivered!' });
  }
};

