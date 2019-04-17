const express = require('express');

//Init express
const app = express();

app.get('/' , function(req, res){
    // res.send('<h1>Hello World</h1>');
    res.sendFile(path.join(__dirname, 'public','index.html'));
});

const PORT = process.env.PORT || 5000;
// Listen on a port
app.listen(PORT , () => console.log(`Server started on port ${PORT}`));