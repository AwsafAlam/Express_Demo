# Express_Demo

---

## Starting a basic server

We start the `PORT` at `5000`. Basic server code:

```js
const express = require('express');

//Init express
const app = express();

app.get('/' , function(req, res){
    res.send('<h1>Hello World!</h1>');
});

const PORT = process.env.PORT || 5000;
// Listen on a port
app.listen(PORT , () => console.log(`Server started on port ${PORT}`));
```

To run the code simply write `node server.js`

## Live Reload Server

We install the dev dependency `npm install -D nodemon`. Nodemon will watch the server and live reload. We create a script in `package.json` called `npm start` to start the node server.

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index",
    "dev": "nodemon index"
  }
```

Use `npm run dev` for reload on save.