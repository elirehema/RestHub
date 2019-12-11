let router = require('express').Router();
const product_docs = require('../../docs/products.json');
const auth_docs = require('../../docs/auth.json');
const contact_docs = require('../../docs/contact.json');

const user_docs = require('../../docs/user.json');

router.get('/user', function(req, res){
    return res.json(user_docs);
});
router.get('/products', function(req, res){
    return res.json(product_docs);
});
router.get('/auth', function(req, res){
    return res.json(auth_docs);
});
router.get('/contacts', function(req, res){
    return res.json(contact_docs);
});
// Import contact controller

module.exports = router;