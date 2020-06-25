const swagger_options = {
    explorer: true,
    swaggerOptions:{
      urls:[
        {
            url: '/api/doc/auth.json',
            name: 'Authentication'
        },
        {
            url: '/api/doc/user.json',
            name: 'Users'
        },
        {
            url: '/api/doc/products.json',
            name: 'Products'
        },
        {
            url: '/api/doc/contact.json',
            name: 'Contacts'
        },
        {
            url: '/api/doc/questions.json',
            name: 'Questions'
        },
        
       
      ]
    }
};

module.exports = swagger_options;