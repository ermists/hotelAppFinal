import db from 'better-sqlite3';
import bcrypt from 'bcrypt';


export function addNewRes (name, surname, SSN, street, city, postalCode, email, telephone, arrivalDate, departureDate, room,peopleNo) {
    try {
        const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
        let max = 18736534;
        let randomInt = Math.floor(Math.random() * max);
        const stmt = sql.prepare('INSERT INTO "RESERVATION" VALUES (?, ?, ?, ?, ?, ?)');
        stmt.run(randomInt, SSN, arrivalDate, departureDate, room, peopleNo);

        const stmt2 = sql.prepare('INSERT INTO "USER" VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        stmt2.run(SSN, name, surname, street, city, postalCode, email, telephone);
        sql.close();
    }catch (err) {
        sql.close();
        console.error('Error creating new reservation:', err);
        throw(err);
    }
}

export function changeResDate (roomNo, custEmail, oldArrivalDate, newArrivalDate, newDepartureDate) {
    try {
        const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
        const stmt = sql.prepare('UPDATE "RESERVATION" SET "Arrival" = ? AND "Departure" = ? WHERE "RoomNumber" = ? AND "Arrrival" = ? AND SSN IN (SELECT SSN FROM "USER" WHERE "Email" = ?)');
        stmt.run(newArrivalDate, newDepartureDate, roomNo, oldArrivalDate, custEmail);
        sql.close();
    }catch (err) {
        sql.close();
        console.error('Error changing reservation date:', err);
        throw(err);
    }
}

export function changeResRoom (roomNo, newRoomNo, custEmail, arrivalDate) {
    try {
        const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
        const stmt = sql.prepare('UPDATE "RESERVATION" SET "RoomNumber" = ? WHERE "RoomNumber" = ? AND SSN IN (SELECT SSN FROM "USER" WHERE "Email" = ?) AND "Arrival" = ?');
        stmt.run(newRoomNo, roomNo, custEmail, arrivalDate);
        sql.close();
    }catch (err) {
        sql.close();
        console.error('Error changing reservation room:', err);
        throw(err);
    }
}

export function deleteRes (roomNo, custEmail, arrivalDate) {
    try {
        const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
        const stmt = sql.prepare('DELETE FROM "RESERVATION" WHERE "RoomNumber" = ? AND SSN IN (SELECT SSN FROM "USER" WHERE "Email" = ?) AND "Arrival" = ?');
        stmt.run(roomNo, custEmail, arrivalDate);
        sql.close();
    }catch (err) {
        sql.close();
        console.error('Error deleting reservation:', err);
        throw(err);
    }
}

export let findUserByUsernamePassword = async (username, password) => {
    const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
    //Φέρε μόνο μια εγγραφή (το LIMIT 0, 1) που να έχει username και password ίσο με username και password 
    const stmt = sql.prepare('SELECT userUsername FROM "SIMPLEUSER" WHERE userUsername = ? and userPassword = ? LIMIT 0, 1');
    try {
        const user = stmt.all(username, password);
        sql.close();
    } catch (err) {
        sql.close();
        return false;
    }
}

export let findAdminByUsernamePassword = async (username, password) => {
    const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
    //Φέρε μόνο μια εγγραφή (το LIMIT 0, 1) που να έχει username και password ίσο με username και password
    const stmt = sql.prepare('SELECT adminUsername FROM "ADMIN" WHERE adminUsername = ? and adminPassword = ? LIMIT 0, 1');
    try {
        const user = stmt.all(username, password);
        sql.close();
    }
    catch (err) {
        sql.close();
        return false;
    }
}


export let getAdminByUsername = function (username)  {
    const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
    const stmt = sql.prepare('SELECT * FROM "ADMIN" WHERE adminUsername = ? LIMIT 0, 1');
    try {
        const user = stmt.all(String(username));
        if (user.length==0) {
            return undefined;
        }
        sql.close();    
        return user[0];
    } catch (err) {
        sql.close();
        return false;
    }
}

export let getUserByUsername = async function (username)  {
    const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
    const stmt = sql.prepare('SELECT * FROM "SIMPLEUSER" WHERE userUsername = ? LIMIT 0, 1');
    try {

        const user = stmt.all(String(username));
        if (user.length==0) {
            return undefined;
        }
        sql.close();
        return user[0];
    } catch (err) {
        sql.close();
        return false;
    }
}

//Η συνάρτηση δημιουργεί έναν νέο χρήστη με password
export let registerUser = async function (username, password) {
    const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    const userId = await getUserByUsername(username);
    console.log(userId);
    if (userId != undefined ) {
        sql.close();
        return { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" };
    } else {
        try {
            let max = 1487485793;
            let randomInt = Math.floor(Math.random() * max);
            const hashedPassword = await bcrypt.hash(password, 10);
            const stmt = sql.prepare('INSERT INTO "SIMPLEUSER" VALUES (null,?, ?, ?)');
            const info = stmt.run(randomInt,String(username), hashedPassword);
            sql.close();
        } catch (error) {
            sql.close();
            console.error('Error registering user:', error);
            throw(error);
        }
    }
}

export let registerAdmin = async function (username, password) {
    const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    const userId = getAdminByUsername(username);
    if (userId != undefined) {
        sql.close();
        return { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" };
    } else {
        try {
            let max = 1487485793;
            let randomInt = Math.floor(Math.random() * max);
            const hashedPassword = await bcrypt.hash(password, 10);
            const stmt = sql.prepare('INSERT INTO "ADMIN" VALUES (null, ?, ?, ?)');
            const info = stmt.run(randomInt, String(username), hashedPassword);
            sql.close();
        } catch (error) {
            sql.close();
            console.error('Error registering Admin:', error);
            throw(error);
        }
    }
}

export let declareInterest = function (SSN, actSelection, date) {
    try {
        const sql = new db('./model/db/hotelProjectDB.db',{fileMustExist: true});
        const stmt = sql.prepare('INSERT INTO "DECLARATION" VALUES (?, ?, ?)');
        stmt.run(SSN, actSelection, date);
        sql.close();
    } catch (error) {
        sql.close();
        console.error('Error declaring interest:', error);
        throw(error);
    }
}
