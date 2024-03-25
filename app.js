const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js')

// express app
const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv:///<username>:<password>@blogcluster.cnx5xm9.mongodb.net/BlogData?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => {
        // listen for requests
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// // mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/all-blogs', (req,res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('65e967b1ce341a8b01b365e5')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// routes
app.get('/', (req, res) => {
    // // res.send('<p>Home Page</p>');
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat Bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    // ];
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>');
    res.render('about', { title: 'About' });
});

// // re-directs
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

// blog routes
app.use('/blogs', blogRoutes);

// 404-page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
