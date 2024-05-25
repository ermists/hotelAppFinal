import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import router from './routes/projRouter.mjs';
import adminSession from './appSetup/appSetupSession.mjs';
import bodyParser from 'body-parser';

const app = express()

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

app.use(adminSession);

app.use(express.static('public'));

app.use((req, res, next) => {
    if (req.session) {
       res.locals.userId = req.session.loggedUserId;
    } else {
       res.locals.userId = 'επισκέπτης';
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');

export function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).redirect('/');
}

app.use(errorHandler);

export { app as mainApp };