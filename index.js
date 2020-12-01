const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');
const newPostController = require('./controllers/newPosts');
const homeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const searchPostController = require('./controllers/searchPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleWare = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use('/posts/store', validateMiddleWare);
app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.listen(4000, ()=>{ console.log('App listening on port 4000'); });

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

app.get('/', homeController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);


app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

app.post('/posts/store', authMiddleWare, storePostController);

app.get('/about',(req,res) => {
    res.render('about');
});

app.get('/contact',(req,res) => {
    res.render('contact');
});

app.get('/post/:id', getPostController);

app.get('/posts/new', newPostController);

app.post('/posts/search', searchPostController);

app.use((req,res) => res.render('notfound'));