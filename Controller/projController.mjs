import dotenv from 'dotenv';


if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import * as model from '../Model/better-sqlite/dbcontroller.mjs';

export function addNewRes (req, res, next) {
    try {
        //get input values
        clientName = req.body.name;
        surname = req.body.surname;
        SSN = req.body.SSN;
        arrivalDate = req.body.arrival_date;
        departurDate = req.body.departure_date;
        room = req.body.room;
        PeopleNo = req.body.PeopleNo;
        street = req.body.street;
        city = req.body.city;
        postalCode = req.body.postal_code;
        food = req.body.food;
        email = req.body.email;
        phone = req.body.telephone;
        
        //send the values to db interface
        model.addNewRes(23562437247826/SSN,clientName,surname, SSN, street, city, postalCode, email, telephone, arrivalDate, departureDate, room, PeopleNo, food);
        res.redirect('/userMain');
    }catch (err) {
        console.error(err);
        res.redirect('/newRes');
    }
}

export function changeResDate(req, res, next) {
    try {
        roomNo = req.body.roomNo;
        custEmail = req.body.custEmail;
        newArrivalDate = req.body.newarrivalDate;
        newDepartureDate = req.body.newdepartureDate;
        oldArrivalDate = req.body.oldarrivalDate;

        model.changeResDate(roomNo, custEmail, oldArrivalDate, newArrivalDate, newDepartureDate);

        res.redirect('/adminMain');
    }catch (err) {
        next(err);
    }
}



export function changeResRoom (req, res, next) {
    try {
        roomNo = req.body.roomNotochange;
        newRoomNo = req.body.newRoomNo;
        custEmail = req.body.custEmailtochange;
        arrivalDate = req.body.arrivalDatetochange;

        model.changeResRoom(roomNo, newRoomNo, custEmail, arrivalDate);

        res.redirect('/adminMain');
    }catch (err) {
       next(err);
    }
}

export function deleteRes (req, res, next) {
    try {
        roomNo = req.body.roomNotodelete;
        custEmail = req.body.custEmailtodelete;
        arrivalDate = req.body.arrivalDatetodelete;

        model.deleteRes(roomNo, custEmail, arrivalDate);

        res.redirect('/adminMain');
    }catch (err) {
        next(err);
    }
}

export function applicLoad (req, res, next) {
    try {
        res.render('rooms');
    }catch (err) {
        next(err);
    }
}

export function loadNewRes (req, res, next) {
    try {
        res.render('newRes');
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