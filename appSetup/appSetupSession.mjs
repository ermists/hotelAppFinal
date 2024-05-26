import session from 'express-session'

let adminSession

adminSession = session({
    secret: process.env.SESSION_SECRET || 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
});

export default adminSession;
