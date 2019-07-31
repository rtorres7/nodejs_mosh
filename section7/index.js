const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error('could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}
// createCourse();

async function getCourses() {
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}
//getCourses();

// update - query first
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    course.set({
        isPublished: true,
        author: 'Another Author'
    });
    const result = await course.save();
    console.log(result);
}
//updateCourse();

// update - update first
async function updateCourse(id) {
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });
    console.log(result);
}
//updateCourse('5d410a5634dfa72e70857fde');

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}
removeCourse('5d410a5634dfa72e70857fde');