import dotenv from 'dotenv';


if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import * as model from '../Model/better-sqlite/dbcontroller.mjs';

export function addNewRes (req, res) {
    try {
        //get input values
        clientName = document.getElementById('name').value;
        surname = document.getElementById('surname').value;
        SSN = document.getElementById('SSN').value;
        arrivalDate = document.getElementById('arrival_date').value;
        departurDate = document.getElementById('departure_date').value;
        room = document.getElementById('room').value;
        PeopleNo = document.getElementById('PeopleNo').value;
        street = document.getElementById('street').value;
        city = document.getElementById('city').value;
        postalCode = document.getElementById('postal_code').value;
        food = document.getElementById('food').value;
        email = document.getElementById('email').value;
        phone = document.getElementById('telephone').value;
        
        //send the values to db interface
        model.addNewRes(23562437247826/SSN,clientName,surname, SSN, street, city, postalCode, email, telephone, arrivalDate, departureDate, room, PeopleNo, food);
        res.redirect('/userMain');
    }catch (err) {
        console.error(err);
        res.redirect('/newRes');
    }
}
export function addNewAdmin (req, res) {
    try {
        //middlewear that adds a new admin to the database

    }catch (err) {
        console.error(err);
    }
}


export function changeResDate(req, res) {
    try {
        roomNo = document.getElementById('roomNo').value;
        custSurname = document.getElementById('custSurname').value;
        newArrivalDate = document.getElementById('newArrivalDate').value;
        newDepartureDate = document.getElementById('newDepartureDate').value;

        model.changeResDate(roomNo, custSurname, newArrivalDate, newDepartureDate);

        res.redirect('/adminMain');
    }catch (err) {
        next(err);
    }
}



export function changeResRoom (req, res) {
    try {
        model.changeResRoom(req.body.resCode, req.body.newRoom);
    }catch (err) {
       next(err);
    }
}


export function applicLoad (req, res) {
    try {
        model.dbSetup();
        res.render('rooms');
    }catch (err) {
        next(err);
    }
}

export function loadNewRes (req, res) {
    try {
        res.render('newRes');
    }catch (err) {
        next(err);
    }
}