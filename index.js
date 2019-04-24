const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to Mongo',err))

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Awsaf:kolpoBD@15@clusterdemo0-1pdvg.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('Could not connect',err);
//   client.close();
// });

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    ispublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Awsaf',
        tags: ['angular','frontend'],
        ispublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

// createCourse();

async function getCourses(){
    const courses = await Course
    // .find({ author: 'Awsaf', price: { $gt: 10, $lte: 20 } })
    // .find({ author: 'Awsaf', price: { $in: [10, 20,15] } })
    .find({ author: /^Aws/ })
    .find()
    .or([{ author: 'Awsaf' }, { ispublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1});
    console.log(courses);
}

getCourses();

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
	});
	console.log(c)
}

updateCourse('5cc0cf0a0de9aa4f8e2125b9');