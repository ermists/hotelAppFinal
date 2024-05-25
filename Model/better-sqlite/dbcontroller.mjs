import db from 'better-sqlite3';
import bcrypt from 'bcrypt';

const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});



export function addNewRes (resCode, name, surname, SSN, street, city, postalCode, email, telephone, arrivalDate, departureDate, room,peopleNo) {
    try {
        const stmt = sql.prepare('INSERT INTO "RESERVATION" VALUES (?, ?, ?, ?, ?, ?)');
        stmt.run(resCode, SSN, arrivalDate, departureDate, room, peopleNo);

        const stmt2 = sql.prepare('INSERT INTO "USER" VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        stmt2.run(SSN, name, surname, street, city, postalCode, email, telephone);
    }catch (err) {
        console.error('Error creating new reservation:', err);
        throw(err);
    }
}

export function changeResDate (roomNo, custEmail, oldArrivalDate, newArrivalDate, newDepartureDate) {
    try {
        const stmt = sql.prepare('UPDATE "RESERVATION" SET "Arrival" = ? AND "Departure" = ? WHERE "RoomNumber" = ? AND "Arrrival" = ? AND SSN IN (SELECT SSN FROM "USER" WHERE "Email" = ?)');
        stmt.run(newArrivalDate, newDepartureDate, roomNo, oldArrivalDate, custEmail);
    }catch (err) {
        console.error('Error changing reservation date:', err);
        throw(err);
    }
}

export function changeResRoom (roomNo, newRoomNo, custEmail, arrivalDate) {
    try {
        const stmt = sql.prepare('UPDATE "RESERVATION" SET "RoomNumber" = ? WHERE "RoomNumber" = ? AND SSN IN (SELECT SSN FROM "USER" WHERE "Email" = ?) AND "Arrival" = ?');
        stmt.run(newRoomNo, roomNo, custEmail, arrivalDate);
    }catch (err) {
        console.error('Error changing reservation room:', err);
        throw(err);
    }
}

export function deleteRes (roomNo, custEmail, arrivalDate) {
    try {
        const stmt = sql.prepare('DELETE FROM "RESERVATION" WHERE "RoomNumber" = ? AND SSN IN (SELECT SSN FROM "USER" WHERE "Email" = ?) AND "Arrival" = ?');
        stmt.run(roomNo, custEmail, arrivalDate);
    }catch (err) {
        console.error('Error deleting reservation:', err);
        throw(err);
    }
}

export let findUserByUsernamePassword = async (username, password) => {
    //Φέρε μόνο μια εγγραφή (το LIMIT 0, 1) που να έχει username και password ίσο με username και password 
    const stmt = sql.prepare('SELECT userUsername FROM "SIMPLEUSER" WHERE userUsername = ? and userPassword = ? LIMIT 0, 1');
    try {
        const user = stmt.all(username, password);
    } catch (err) {
        return false;
    }
}

export let findAdminByUsernamePassword = async (username, password) => {
    //Φέρε μόνο μια εγγραφή (το LIMIT 0, 1) που να έχει username και password ίσο με username και password
    const stmt = sql.prepare('SELECT adminUsername FROM "ADMIN" WHERE adminUsername = ? and adminPassword = ? LIMIT 0, 1');
    try {
        const user = stmt.all(username, password);
    }
    catch (err) {
        return false;
    }
}


export let getAdminByUsername = (username) => {
    const stmt = sql.prepare('SELECT AdminID, adminUsername, adminPassword FROM "ADMIN" WHERE adminUsername = ? LIMIT 0, 1');
    try {
        const user = stmt.all(username);
        return user[0];
    } catch (err) {
        return false;
    }
}

export let getUserByUsername = (username) => {
    const stmt = sql.prepare('SELECT UserID, userUsername, userPassword FROM "SIMPLEUSER" WHERE userUsername = ? LIMIT 0, 1');
    try {
        const user = stmt.all(username);
        return user[0];
    } catch (err) {
        return false;
    }
}

//Η συνάρτηση δημιουργεί έναν νέο χρήστη με password
export let registerUser = async function (username, password) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    const userId = getUserByUsername(username);
    if (userId != undefined) {
        return { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" };
    } else {
        try {
            let max = 1487485793;
            let randomInt = Math.floor(Math.random() * max);
            const hashedPassword = await bcrypt.hash(password, 10);
            const stmt = sql.prepare('INSERT INTO "SIMPLEUSER" VALUES (null,?, ?, ?)');
            const info = stmt.run(randomInt,String(username), hashedPassword);
        } catch (error) {
            console.error('Error registering user:', error);
            throw(error);
        }
    }
}

export let registerAdmin = async function (username, password) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    const userId = getAdminByUsername(username);
    if (userId != undefined) {
        return { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" };
    } else {
        try {
            let max = 1487485793;
            let randomInt = Math.floor(Math.random() * max);
            const hashedPassword = await bcrypt.hash(password, 10);
            const stmt = sql.prepare('INSERT INTO "ADMIN" VALUES (null, ?, ?, ?)');
            const info = stmt.run(randomInt, String(username), hashedPassword);
        } catch (error) {
            console.error('Error registering Admin:', error);
            throw(error);
        }
    }
}

export let declareInterest = function (SSN, actSelection, date) {
    try {
        const stmt = sql.prepare('INSERT INTO "DECLARATION" VALUES (?, ?, ?)');
        stmt.run(SSN, actSelection, date);
    } catch (error) {
        console.error('Error declaring interest:', error);
        throw(error);
    }
}
