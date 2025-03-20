const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static('node_modules'));
app.use(express.static('public'));


const router = require('./routes/index.js');
app.use('/',router);


app.listen(8888,()=>{
    console.log('Server runner at http://127.0.0.1:8888/');
});

