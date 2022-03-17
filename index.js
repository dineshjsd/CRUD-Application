const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));

// set view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.send("Hellow world");
})

// Load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));


app.listen('3000', () =>{
    console.log('server is running at port 3000');
});