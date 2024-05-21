import session from 'express-session'

let taskListSession

taskListSession = session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
});

export default taskListSession;
