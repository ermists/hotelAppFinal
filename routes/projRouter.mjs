import express from 'express';

import dotenv from 'dotenv'
import { checkAuthenticatedUser } from '../Controller/loginLogoutController.mjs';
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
router.get('/adminLogout', loginController.logout);
router.get('/adminMain', loginController.checkAuthenticatedAdmin, loginController.adminMain);
router.get('/userMain', loginController.checkAuthenticatedUser, loginController.userMain);
router.get('/newAdmin', loginController.newAdminShow);
router.route('/newAdmin').post(loginController.addNewAdmin);
router.get('/newUser', loginController.newUserShow);
router.route('/newUser').post(loginController.addNewUser);

router.post('/changeResDate',loginController.checkAuthenticatedAdmin, projController.changeResDate);
router.post('/changeResRoom',loginController.checkAuthenticatedAdmin, projController.changeResRoom);
router.post('/deleteRes',loginController.checkAuthenticatedAdmin, projController.deleteRes);
router.get('/newRes', projController.loadNewRes);
router.route('/newRes').post(projController.addNewRes);
router.get('/aboutfood', projController.aboutFood);

router.get('/declareInterest', projController.declareInterestShow);
router.route('/declareInterest').post(projController.declareInterestSubmit);

router.get('/', projController.applicLoad);

export default router;