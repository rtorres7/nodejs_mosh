const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error('could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            // isAsync: true,
            // validator: function(v, callback) {
            //     setTimeout(() => {
            //         // do some async work
            //         const result = v && v.length > 0;
            //         callback(result);
            //     }, 4000);
            // },

            // use Promise below; isAsync above deprecated
            validator: function(v) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        // do some async work
                        const result = v && v.length > 0;
                        resolve(result);
                    }, 4000); 
                });
            },
            message: 'a course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('course', courseSchema);

// async function createCourse() {
//     const course = new Course({
//         name: 'A Brand New Course',
//         category: 'MOBIle',
//         author: 'Allen',
//         tags: ['frontend'],
//         isPublished: false,
//         price: 38.7
//     });

//     try {
//         const result = await course.save();
//         console.log(result);
//     }
//     catch (ex) {
//         for (field in ex.errors)
//         console.log(ex.errors[field].message);
//     }
// }
// createCourse();

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        .find({ _id: '5d41bb08062e084a61b6b2d4'})
        //.find({ author: 'Mosh', isPublished: true })
        //.skip((pageNumber - 1) * pageSize)
        //.limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, price: 1 });
    console.log(courses[0].price);
}
getCourses();

// // update - query first
// async function updateCourse(id) {
//     const course = await Course.findById(id);
//     if (!course) return;
//     course.set({
//         isPublished: true,
//         author: 'Another Author'
//     });
//     const result = await course.save();
//     console.log(result);
// }
// //updateCourse();

// // update - update first
// async function updateCourse(id) {
//     const result = await Course.update({ _id: id }, {
//         $set: {
//             author: 'Mosh',
//             isPublished: false
//         }
//     });
//     console.log(result);
// }
// //updateCourse('5d410a5634dfa72e70857fde');

// async function removeCourse(id) {
//     const result = await Course.deleteOne({ _id: id });
//     console.log(result);
// }
// removeCourse('5d410a5634dfa72e70857fde');