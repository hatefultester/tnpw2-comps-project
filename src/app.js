const express = require("express");
const path = require("path")
require("./db/database").connect();

const handlebars = require("express-handlebars");
const compRoutes = require("./routes/compRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();


app.use(express.json());
app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
    layoutsDir: `${__dirname}/../views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: `${__dirname}/../views/partials`
}));

app.use(express.static('public'));

app.use('/api/comp/', compRoutes);
app.use('/api/user/', userRoutes);

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/registration', (req, res) => {
    res.render('registration');
});

app.get('*', (req, res) => {
    res.render('page_not_found');
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});