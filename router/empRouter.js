const express =  require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const controller = require('../controller/empControler');
const res = require('express/lib/response');
const app = express();


route.get('/', (req, res) =>{
    res.render('index');
});

route.get('/add-user', (req, res) =>{
    res.render('add_user');
})

route.get('/update-user', (req, res) =>{
    res.render('update_user');
});

route.post('/api/add', controller.add);
route.get('/find',controller.find);
route.put('/update-user/:id', controller.update);
route.delete('/delete/:', controller.delete);

module.exports = route;


