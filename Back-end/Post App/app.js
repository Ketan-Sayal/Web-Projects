const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const userModel = require('./models/user.js');
const postModel = require('./models/post.js');
const commentModel = require('./models/comment.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index');
});

let isLoggedIn = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    try {
        let data = jwt.verify(token, "secret");
        req.user = data;
    }
    catch (error) {
        return res.redirect('/login');
    }
    next();
}

app.get('/posts', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts");
    let posts = await postModel.find().populate("user").populate("comments");
    res.render('post.ejs', { user: user, posts: posts });
});

app.get('/createPost', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    res.render('createPost', { user });
});

app.post('/createpost/:_id', async (req, res) => {
    let { heading, content } = req.body;
    let post = await postModel.create({
        user: req.params._id,
        heading,
        content
    });
    let user = await userModel.findOne({ _id: req.params._id });
    user.posts.push(post._id);
    await user.save();
    return res.redirect('/posts');
});

app.post('/createUser', async (req, res) => {
    let { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err;
                await userModel.create({
                    name,
                    email,
                    password: hash
                });
                let token = jwt.sign({ email }, "secret");
                res.cookie("token", token);
                return res.redirect('/posts');
            });
        });
    }
    else {
        return res.redirect('/login');
    }
});


app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/loginCheck', async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
        return res.redirect('/login');
    }
    bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
            let token = jwt.sign({ email }, "secret");
            res.cookie("token", token);
            return res.redirect('/posts');
            // res.send(user);
        }
        else {
            return res.redirect('/login');
            // res.send('User not found!');
        }
    });
});


app.get('/like/:_id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params._id });
    let user = await userModel.findOne({ email: req.user.email });
    if (post.likes.indexOf(user._id) == -1) {
        post.likes.push(user._id);
    }
    else {
        post.likes.splice(post.likes.indexOf(user._id), 1);
    }
    await post.save();
    res.redirect('/posts');
});

app.get('/delete/:_id', async (req, res) => {
    await postModel.findOneAndDelete({ _id: req.params._id });
    res.redirect('/posts');
});

app.get('/edit/:_id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params._id });
    res.render('edit.ejs', { post });
});

app.post('/edit/post/:_id', isLoggedIn, async (req, res) => {
    let { heading, content } = req.body;
    await postModel.findOneAndUpdate({ _id: req.params._id }, { heading, content });
    res.redirect('/posts');
});

app.get('/logOut', (req, res) => {
    res.cookie("token", "");
    res.redirect('/login');
});

app.post('/post/comment/:_id', isLoggedIn, async (req, res) => {
    let { comment } = req.body;
    // console.log(comment);
    let post = await postModel.findOne({ _id: req.params._id });
    let user = await userModel.findOne({ email: req.user.email });
    let aboutComment = await commentModel.create({
        user: user.name,
        content: comment
    });
    post.comments.push(aboutComment._id);
    await post.save();
    res.redirect('/posts');
});

app.get('/about', isLoggedIn, (req, res) => {
    res.render('about');
});

app.get('/contact', isLoggedIn, (req, res) => {
    res.render('contact.ejs');
});

app.get('/future', (req, res) => {
    res.render('future.ejs');
});


app.listen(80, () => {
    console.log('Server is running on port 80...');
});