/**
 * MerchantsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    merchant: async function (req, res) {
        return res.view('pages/merchant', { message: undefined })
    },

    getMerchant: async function (req, res) {
        let merchantData = {
            name: req.param('name'),
            email: req.param('email')
        }
        const merchant = await Merchants.find({ email: merchantData.email, name: merchantData.name });
        if (merchant[0]) {
            // res.view('pages/merchant_orders', {merchant: merchant[0]});
            return res.redirect(`/merchantOrdersView/${merchant[0].id}`);
        } else {
            res.view('pages/merchant', { message: 'Please try again with correct creds.' });
        }
    },

    merchantOrdersView: async function (req, res) {
        const merchant_id = req.param('id');
        // get the merchant data for the view
        const merchant = await Merchants.find().where({
            id: merchant_id
        });
        return res.view('pages/merchant_orders', { merchant: merchant });
    },
};

