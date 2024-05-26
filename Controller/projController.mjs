import dotenv from 'dotenv';


if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import * as model from '../Model/better-sqlite/dbcontroller.mjs';

export function addNewRes (req, res) {
    try {
        //get input values
        let clientName = req.body.name;
        let surname = req.body.surname;
        let SSN = req.body.SSN;
        let arrivalDate = req.body.arrival_date;
        let departureDate = req.body.departure_date;
        let room = req.body.room;
        let PeopleNo = req.body.PeopleNo;
        let street = req.body.street;
        let city = req.body.city;
        let postalCode = req.body.postal_code;
        let food = req.body.food;
        let email = req.body.email;
        let telephone = req.body.telephone;
        
        let existingUser = model.getClientbySSN(SSN);
        if (existingUser == undefined) {
            model.addNewUser(clientName, surname, SSN, street, city, postalCode, email, telephone);
        }

        if (model.checkRes(arrivalDate, departureDate, room)) {
            model.addNewRes(SSN, arrivalDate, departureDate, room, PeopleNo, food);
            res.redirect('/userMain');
        } else {
            req.seesion.loggedUserID = req.session.loggedUserID;
            req.session.formData = req.body;
            res.redirect('/newRes');
        }
    }catch (err) {
        console.error(err);
        req.seesion.loggedUserID = req.session.loggedUserID;
        req.session.formData = req.body;
        res.redirect('/newRes');
    }
}

export function changeResDate(req, res, next) {
    try {
        let roomNo = req.body.roomNo;
        let custEmail = req.body.custEmail;
        let newArrivalDate = req.body.newarrivalDate;
        let newDepartureDate = req.body.newdepartureDate;
        let oldArrivalDate = req.body.oldarrivalDate;

        model.changeResDate(roomNo, custEmail, oldArrivalDate, newArrivalDate, newDepartureDate);

        res.redirect('/adminMain');
    }catch (err) {
        next(err);
    }
}



export function changeResRoom (req, res, next) {
    try {
        let roomNo = req.body.roomNotochange;
        let newRoomNo = req.body.newRoomNo;
        let custEmail = req.body.CustEmailtochange;
        let arrivalDate = req.body.arrivalDatetochange;

        model.changeResRoom(roomNo, newRoomNo, custEmail, arrivalDate);

        res.redirect('/adminMain');
    }catch (err) {
       next(err);
    }
}

export function deleteRes (req, res, next) {
    try {
        let roomNo = req.body.roomNotodelete;
        let custEmail = req.body.CustEmailtodelete;
        let arrivalDate = req.body.arrivalDatetodelete;

        model.deleteRes(roomNo, custEmail, arrivalDate);

        res.redirect('/adminMain');
    }catch (err) {
        next(err);
    }
}

export function applicLoad (req, res, next) {
    try {
        res.render('index');
    }catch (err) {
        next(err);
    }
}

export function loadNewRes (req, res, next) {
    try {
        let formData = req.session.formData || {};
        req.session.formData = {};
        res.render('newRes', {formData: formData});
    }catch (err) {
        next(err);
    }
}

export function aboutFood (req, res, next) {
    try {
        res.render('aboutfood');
    }catch (err) {
        next(err);
    }
}

export function declareInterestShow (req, res, next) {
    try {
        res.render('declareInterest');
    }catch (err) {
        next(err);
    }
}

export function declareInterestSubmit (req, res, next) {
    try {
        SSN = req.body.SSN;
        actSelection = req.body.actSelection;
        date = req.body.date;

        model.declareInterest(name, surname, email, phone, interest);

        res.redirect('/');
    }catch (err) {
        next(err);
    }
}

export function loadRooms (req, res, next) {
    try {
        res.render('rooms');
    }catch (err) {
        next(err);
    }
}