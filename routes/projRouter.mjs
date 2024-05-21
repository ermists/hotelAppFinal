import express from 'express';

import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    console.log('loading .env')
    dotenv.config();
}

const router = express.Router();
const projController = await import(`../Controller/projController.mjs`)
const loginController = await import(`../Controller/loginLogoutController.mjs`)
router.route('/page2.html').get((req,res)=>{res.redirect('/newRes')});


router.get('/adminLogin', loginController.adminLoginshow);
router.route('/adminLogin').post(loginController.adminDoLogin);
router.get('/userLogin', loginController.userLoginshow);
router.route('/userLogin').post(loginController.userDoLogin);
router.get('/adminLogout', loginController.adminLogout);
router.get('/adminMain', loginController.checkAuthenticatedAdmin, loginController.adminMain);
router.get('/userMain', loginController.checkAuthenticatedUser, loginController.userMain);

router.post('/changeResDate', projController.changeResDate);
router.get('/changeResRoom', projController.changeResRoom);
router.get('/newRes', projController.loadNewRes);
router.route('/newRes').post(projController.addNewRes);
router.get('/newAdmin', projController.addNewAdmin);
router.get('/', projController.applicLoad);

export default router;