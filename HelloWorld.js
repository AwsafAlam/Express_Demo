const express = require('express');

//Init express
const app = express();

app.get('/' , function(req, res){
    res.send('Hello World!');
});

// Listen on a port
app.listen(5000);