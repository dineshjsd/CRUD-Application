const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const empRouter = require('./router/empRouter');

require('./config.js')
// Parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));

// set view engine
app.set('view engine', 'ejs');


// Load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));


// Load router
app.use('/', empRouter);

app.listen('3000', () =>{
    console.log('server is running at port 3000');
});