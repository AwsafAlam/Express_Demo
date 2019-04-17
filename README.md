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

## Setting up routes

We use the get methode such as `app.get(root,CallbackFunction)`

## Input Validation

Server requests need to be validated, and done using the node package joi. `npm i joi`. For each api call, we create a schema :

```js
  const schema = {
      name: Joi.string().min(3).required(),
      subject: Joi.string().min(4).optional()
  }
```

Then call the validation function `const result = Joi.validate(req.body, schema)`. This result object will return a JSON object :

```json
{
  error: null,
  value: { name: 'new course', subject: 'Arts' },
  then: [Function: then],
  catch: [Function: catch]
}
```

For no errors, `error: null`. For errors present, value will be null. We can use `result.error` for prompt in client side.

## Updating using PUT request

