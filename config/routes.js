/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //  res.view('pages/orders', {client: client[0]});

  // Gerneral routes for rendering the starging pages
  ' /': { view: 'pages/homepage' },
  ' /client': { view: 'pages/client' },
  ' /merchant': { action: 'Merchants/merchant' },
  ' /driver': { action: 'Drivers/driver' },
  ' /order': { view: 'pages/orders' },

  // Client Routes
  ' /createClient': { action: 'Clients/createUser' },
  ' /getOrderForm/:client_id': { action: 'Clients/getOrderForm' },
  ' /ORRoom/:client_id': { action: 'Order/ORRoom' },
  ' POST /makeOrder': { action: 'Clients/makeOrder' },

  // Merchants routes
  ' /getMerchant': { action: 'Merchants/getMerchant' },
  ' /merchantOrdersView/:id': { action: 'Merchants/merchantOrdersView' },


  // Drivers routes
  ' /getDriver': { action: 'Drivers/getDriver' },
  ' /driverOrdersView/:id': { action: 'Drivers/driverOrdersView' },
  ' /driverOrders/:id': { action: 'Order/driverOrders' },

  // Sockets Routes GET
  'GET /merchantOrders/:id': { action: 'Order/merchantOrders' },
  'GET /orderWithDriver/:driver_id': { action: 'Order/OrderWithDriver' },
  'GET /ORRooms': { action: 'Clients/ORRooms' },
  // Sockets Routes POST
  'POST /ORRoom': { action: 'Clients/ORRoom' },
  'POST /createOrder': { action: 'Clients/createOrder' },
  'POST /create': { action: 'Clients/createOrder' },
  // Sockets Routes PUT
  'PUT /merchant/accept/:order_id': { action: 'Order/merchantAccept' },
  'PUT /merchant/reject/:order_id': { action: 'Order/merchantReject' },
  'PUT /driver/assignToDriversRoom/:driver_id': { action: 'Drivers/assignToDriversRoom' },
  'PUT /client/assignToORRoom/:client_id': { action: 'Clients/assignToClientRoom' },
  'PUT /driver/accept/:order_id': { action: 'Order/driverAccept' },
  'PUT /driver/reject/:order_id': { action: 'Order/driverReject' },
  'PUT /driverNotifications': { action: 'Drivers/notification' },
  'PUT /received': { action: 'Clients/recieved' },






  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
