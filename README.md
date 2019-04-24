# Express_Demo

For further reference use [Express Docs](http://expressjs.com)

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

- Look up a course
- If not existing, return 404
- Validate
- If invalid, return 400 - Bad request
- Update course
- Return the updated course

## Middleware

We use middlewares for modularization. Some good libraries are :

- Moment for `Date` formatting
- Use `uuid` for generating hash user ids.

Usually we modularize all routes in a routes folder, and set all CRUD operations in specific files. eg. `/api/members` api can be declared inside a `member.js` folder inside routes.

Routes have to be exportes from the routes folder, and can be used in the `index.js`.

## JSON Web Tokens (JWT)

For full stack apps, using an Express servers, we use JWT to authenticate with a React front-end requesting to the Api.

## MongoDB

MongoDb uses a Data-format called BSON

- Database
- Collections
- Documents

Documents are in the form of JSON objects. They are Schema-less. We can have one collection where we store different knids of data. Hence it is very much flexible. We can add / remove data as we please from collections, and simply modify the query structures.

### BSON Data Format

BSON stands for Binary JSON. It has the same format as JSON, but is binary encoded to make working with data more efficient, and works with all languages.

```json
{
  name: 'Max;,
  age: 29,
  address:{
      city: 'Munich
    },
  hobbies: [
    { name: 'Cooking' },
    { name: 'Sports' }
  ]
}
```

A JSON attribute is referred to as a document. We can also have embedded documents e.g, address has an embeded document. We keep related data in the same document. this makes data retrieval much more easier. We do not need complicated joins, which can cause performance loss.

We can also have multiple embeded documents such as an array of objects.

- `NoSQL` : Fewer or no relations
- `Relational Database` : Data needs to be merged manually.
  
## MongoDB Atlas

It is a database running in the cloud to which we can connect to. Create a cluster, and account at [MongoDb Cloud](https://cloud.mongodb.com). We can configure clusters in here, and connect using node applications.

There are 3 ways to use Mongo:

- Mongo Shell
- Node JS
- Compass GUI

## Mongo Shell

Use the command and run it in the shell to access the cluster in the cloud. This can be added by simply writing the following commands :

- `sudo apt update`
- `sudo apt install -y mongodb`
- `sudo systemctl start mongodb` use this command to start the local server
- `sudo systemctl stop mongodb` to stop the server
- `mongo --eval 'db.runCommand({ connectionStatus: 1 })'` to check server status
- `sudo systemctl status mongodb` mongodb server status
- `mongod` checks whether the mongo daemon is running or not

## Mongoose

Install as an `npm` package `npm i --save mongoose`.Install compass for mongoDB, and connect to the server. Make sure mongo is running in the shell.

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to Mongo',err))
```

## Creating Schema

We use a schema to define the shape of documents within a collection in MongoDB. Suppose we have a database called `playground` inside we have a collection of `courses`.

- A collection in MongoDb is like a table in relational database.
- A Document in MongoDB is similar to a Row in Relational database

A document is a container of key value pairs, essentially a glorified JSON object. Each document has a unique identifier of `_id: ObjectID("742bjhbgjg4224")`.

The concept of Schema is only relevant for `mongoose`, and is not compulsory for `MongoDB`.

```js
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    ispublished: Boolean
});
```

The following is an example of a small schema. The list of types when creating a Schema:

- String
- Number
- Date
- Buffer (Used to store Binary data)
- Boolean
- ObjectID (Used to store uniqueIDs)
- Array

## Models

Suppose we want to have a Class called `courses` and instances of that class such as `JavaCourse`. We need to compile the Schema into a model. So, a Model is analogous to the instance of a Course.

```js
const Course = mongoose.model('Course', courseSchema);

const course = new Course({
    name: 'Node.js Course',
    author: 'Awsaf',
    tags: ['node','backend'],
    ispublished: true
});
```

The following example shows how to create a model from a schema. Mongoose has a function called `model()` first parameter is the collection that the model is for.

We put `Course` as the 1st parameter, which is the singular form of the collection `courses`  we also use pascal naming convention, to define classes.

Objects are created based on the class. We use `camel-case` to name our objects, and `pascal-case` to name our classes.

NoSQL databases can have complex datastructures, such as array of strings. So, many to many relations do not need to be resolved by multiple tables.

## Saving a document to Database

Saving a document to a database is an `async` operation. So, we use `const result = await course.save()` to save to database. Since it is Asynchronous, we need to use an async function.It returns the result:

```json
{ tags: [ 'node', 'backend' ],
  _id: 5cc0cf0a0de9aa4f8e2125b9,
  name: 'Node.js Course',
  author: 'Awsaf',
  ispublished: true,
  date: 2019-04-24T21:03:06.957Z,
  __v: 0
}
```

## Querying

- select() returns the Datastructure of queries
- find() for filtering
- count() returns the number of columns for queries
- limit(number) limits the npo. of responses
- skip( (pageNumber) * pageSize )  defines pagination -> the documents of a given page.
- sort() sorts the object according to filters

Query:

```js
async function getCourses(){
    const courses = await Course
    .find({ author: 'Awsaf' })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1});
    console.log(courses);
}
```

Response :

```json
[ { tags: [ 'angular', 'frontend' ],
    _id: 5cc0cf9b14c5e550373578fa,
    name: 'Angular Course' },
  { tags: [ 'node', 'backend' ],
    _id: 5cc0cf0a0de9aa4f8e2125b9,
    name: 'Node.js Course' }
]
```

## Comparison Operations

- eq (equal)
- ne (not equal)
- gt (greater than)
- gte (greater than or equal to)
- lt (less than)
- lte (less than or equal to)
- in
- nin (not in)
  
```js
const courses = await Course
    .find({ author: 'Awsaf', price: { $gt: 10, $lte: 20 } })
```

```js
const courses = await Course
    .find({ author: 'Awsaf', price: { $in: [10, 20,15] } })
```

## Logical Operations

- or()
- and()

```js
const courses = await Course
                      .find()
                      .or([{ author: 'Awsaf' }, { ispublished: true }])
```

this represents `author: 'Awsaf` or `ispublished`. So, we can use regular filters to perform complex queries.

## Regular Expressions

For more control over filtering strings:

- Starts with Awsaf `.find({ author: /^Aws/ })`
- Ends with saf `.find({ author: /saf$/i })` case insensitive
- Contains saf `.find({ author: /.*saf.*/ })` zero or more characters before or after.

There are more use cases and syntax of Javascript Regular Expressions that can be learnt.

## Update

- update
- findByIdAndUpdate

```js
async function updateCourse(id) {
	// Approach: Query first
	//findById()
	//Modify its properties
  //save()
  
	const course = await Course.findById(id);
	if(!course) return;
	course.ispublished = true;
	course.author = 'Another';
	course.set({
		ispublished: true,
		author: 'Another'
	});
	const result = await course.save();

	//Approach-2: Update first
	//Update deirectly -> using MongoDB update operations
	//Optionally: get the updated document
	const c = await Course.update({_id: id},{
		$set: {
			author: 'Awsaf',
			ispublished: false
		}
	}, { new: true });
	console.log(c)
}
```

For further reference, look at the update parameters in mongodb docs.

Similarly for Deletion, we use

- deleteOne (Deletes the first matching item)
- deleteMany
- findByIdAndRemove (Deletes and returns null is success )