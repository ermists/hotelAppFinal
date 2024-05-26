import bcrypt from 'bcrypt';
const model = await import(`../Model/better-sqlite/dbcontroller.mjs`);

export function adminLoginshow (req, res, next) {
    try {
        res.render('adminLogin', { message: '' });
    }catch (err) {
        next(err);
    }
}

export function userLoginshow (req, res, next) {
    try {
        res.render('userLogin', { message: '' });
    }
    catch (err) {
        next(err);
    }
}

export async function userDoLogin (req, res, next) {
    try {
        const user = await model.getUserByUsername(req.body.username); 
        if (user == undefined || !user.userPassword || !user.UserID) {
            res.render('userLogin', { message: 'Δε βρέθηκε αυτός ο χρήστης' });
        }
        else {
            const match = await bcrypt.compare(req.body.password, user.userPassword);
            if (match) {
                //Θέτουμε τη μεταβλητή συνεδρίας "loggedUserId"
                req.session.loggedUserId = user.userUsername;
                const redirectTo = "/userMain";
    
                res.redirect(redirectTo);
            }
            else {
                res.render('userLogin', { message: 'Ο κωδικός πρόσβασης είναι λάθος' })
            }
        }
    }catch (err) {
        next(err);
    }
}

export async function adminDoLogin (req, res, next) {
    try {
        const user = model.getAdminByUsername(req.body.username); 
        
        if (user == undefined || !user.adminPassword || !user.adminUsername) {
            res.render('adminLogin', { message: 'Δε βρέθηκε αυτός ο χρήστης' });
        }
        else {
            const match = await bcrypt.compare(req.body.password, user.adminPassword);
            if (match) {
                //Θέτουμε τη μεταβλητή συνεδρίας "loggedUserId"
                req.session.loggedAdminId = user.adminUsername;

                const redirectTo = "/adminMain";
    
                res.redirect(redirectTo);
            }
            else {
                console.log('check3')
                res.render('adminLogin', { message: 'Ο κωδικός πρόσβασης είναι λάθος' })
            }
        }
    }catch (err) {
        next(err);
    }
}

export function logout (req, res,next) {
    try {
        req.session.destroy();
        res.redirect('/');
    }catch (err) {
        next(err);
    }
}

export let checkAuthenticatedAdmin = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedAdminId) {
        console.log("Admin is authenticated", req.originalUrl);
        try{
            let x = model.getAdminByUsername(req.session.loggedAdminId);
        }catch(err){
            res.redirect('/adminLogin');
        }
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        next();
    }
    else {
        //Ο χρήστης δεν έχει ταυτοποιηθεί, αν απλά ζητάει το /login ή το register δίνουμε τον
        //έλεγχο στο επόμενο middleware που έχει οριστεί στον router
        if ((req.originalUrl === "/adminLogin")) {
            next()
        }
        else {
            //Στείλε το χρήστη στη "/login" 
            console.log("not authenticated, redirecting to /login")
            res.redirect('/adminLogin');
        }
    }
}

export let checkAuthenticatedUser = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedUserId) {
        console.log("User is authenticated", req.originalUrl);
        try{
            let x = model.getUserByUsername(req.session.loggedUserId);
        }catch(err){    
            res.redirect('/userLogin');
        }
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        next();
    }
    else {
        //Ο χρήστης δεν έχει ταυτοποιηθεί, αν απλά ζητάει το /login ή το register δίνουμε τον
        //έλεγχο στο επόμενο middleware που έχει οριστεί στον router
        if ((req.originalUrl === "/userLogin")) {
            next()
        }
        else {
            //Στείλε το χρήστη στη "/login" 
            console.log("not authenticated, redirecting to /login")
            res.redirect('/userLogin');
        }
    }
}


export function adminMain (req, res) {
    try {
        res.render('adminMain');
    }catch (err) {
        console.error(err);
    }
}

export function userMain (req, res) {
    try {
        res.render('userMain');
    }catch (err) {
        console.error(err);
    }
}

export function addNewUser (req, res) {
    try {
        const registrationResult = model.registerUser(req.body.username, req.body.password);
        if (registrationResult.message !== undefined) {
            res.render('userRegister', { message: registrationResult.message })
        }
        else {
            res.redirect('/userLogin');
        }
    } catch (error) {
        console.error('registration error');
        res.redirect('/newUser');
    }
}

export function addNewAdmin (req, res) {
    try {
        const registrationResult = model.registerAdmin(req.body.username, req.body.password);
        if (registrationResult.message !== undefined) {
            res.render('adminRegister', { message: registrationResult.message })
        }
        else {
            res.redirect('/adminLogin');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/newAdmin');
    }
}


export function newAdminShow (req, res, next) {
    try {
        res.render('adminRegister', { message: '' });
    }catch (err) {
        next(err);
    }
}

export function newUserShow (req, res, next) {
    try {
        res.render('userRegister', { message: '' });
    }catch (err) {
        next(err);
    }
}