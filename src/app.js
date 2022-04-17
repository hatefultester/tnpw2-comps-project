const express = require("express");
require("./db/database").connect();

const handlebars = require("express-handlebars");
const compRoutes = require("./routes/comp/competitionRoutes");
const userRoutes = require("./routes/userRoutes");
const webRoutes = require("./routes/webRoutes");
const langRoutes = require("./routes/langRoutes");
const userAgent = require('express-useragent');
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(userAgent.express());

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    layoutsDir: `${__dirname}/../views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: `${__dirname}/../views/partials`
}));

app.use('/api/comp/', compRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/lang/', langRoutes);

app.use(express.static('public'));
app.use('/', webRoutes);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});