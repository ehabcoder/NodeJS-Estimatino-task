/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// myApp/api/models/Clients.js

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    client_id: {
      type: 'number',
      required: true
    },
    merchant_id: {
      type: 'number',
    },
    driver_id: {
      type: 'number',
    },
    merchant_status: {
      type: 'string',
      defaultsTo: "Waiting for merchant Status",
    },
    driver_status: {
      type: 'string',
      defaultsTo: "Waiting for Delevery!",
    },

  },

};

