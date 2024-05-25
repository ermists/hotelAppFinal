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

export function userDoLogin (req, res, next) {
    try {
        if (req.body.username != "" || req.body.password != "" || req.body.username === undefined || req.body.password === undefined) {
            const user = model.getUserByUsername(req.body.username); //prepi na epsitrefi kai to password apo ti basi !!!!!
        }else{
            res.render('userLogin', { message: 'Δεν έχετε εισάγει όνομα χρήστη ή κωδικό πρόσβασης' });
        }

        if (user == undefined || !user.password || !user.id) {
            res.render('userLogin', { message: 'Δε βρέθηκε αυτός ο χρήστης' });
        }
        else {
            const match = bcrypt.compare(req.body.password, user.password);
            if (match) {
                //Θέτουμε τη μεταβλητή συνεδρίας "loggedUserId"
                req.session.loggedUserId = user.username;
                //Αν έχει τιμή η μεταβλητή req.session.originalUrl, αλλιώς όρισέ τη σε "/" 
                // res.redirect("/");            
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

export function adminDoLogin (req, res, next) {
    try {

        if (req.body.username != ""|| req.body.password != "" || req.body.username === undefined || req.body.password === undefined) {
            const user = model.getAdminByUsername(String(req.body.username)); //prepi na epsitrefi kai to password apo ti basi !!!!!
        }else{
            res.render('adminLogin', { message: 'Δεν έχετε εισάγει όνομα χρήστη η΄κωδικό πρόσβασης' });
        }

        if (user == undefined || !user.password || !user.id) {
            res.render('adminLogin', { message: 'Δε βρέθηκε αυτός ο χρήστης' });
        }
        else {
            const match = bcrypt.compare(req.body.password, user.password);
            if (match) {
                //Θέτουμε τη μεταβλητή συνεδρίας "loggedUserId"
                req.session.loggedUserId = user.username;
                //Αν έχει τιμή η μεταβλητή req.session.originalUrl, αλλιώς όρισέ τη σε "/" 
                // res.redirect("/");            
                const redirectTo = "/adminMain";
    
                res.redirect(redirectTo);
            }
            else {
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
    if (req.session.loggedUserId) {
        console.log("Admin is authenticated", req.originalUrl);
        try{
            let x = model.getAdminByUsername(req.session.loggedUserId);
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
        console.log('first check')
        const registrationResult = model.registerAdmin(req.body.username, req.body.password);
        console.log('second check')
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