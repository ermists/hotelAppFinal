CREATE TABLE IF NOT EXISTS "USER" (
	"SSN" integer,
	"Name" varchar,
	"Surname" varchar,
	"Street" varchar,
	"City" integer,
	"PostalCode" integer,
	"email" varchar,
	"PhoneNo" integer,
	PRIMARY KEY ("SSN")
);

CREATE TABLE IF NOT EXISTS "ROOM" (
	"RoomNo" integer,
	"Capacity" integer,
	"PricePerPers" integer,
	PRIMARY KEY ("RoomNo")
);

CREATE TABLE IF NOT EXISTS "ACTIVITY" (
	"Name" varchar,
	"Day" varchar,
	"Time" integer,
	"EntryFee" integer,
	PRIMARY KEY ("Name")
);

CREATE TABLE IF NOT EXISTS "FOODPACKAGE" (
	"CodeNo" integer,
	"Name" varchar,
	"PricePerPerPerDay" integer,
	PRIMARY KEY ("CodeNo")
);

CREATE TABLE IF NOT EXISTS "RESERVATION" (
	"ResCode" integer,
	"SSN" integer,
	"Arrival" date,
	"Departure" date,
	"PeopleNo" integer,
	"RoomNumber" integer,
	PRIMARY KEY ("ResCode"),
	FOREIGN KEY ("SSN") REFERENCES "USER" ("SSN")
            ON UPDATE CASCADE
            ON DELETE CASCADE,
	FOREIGN KEY ("RoomNumber") REFERENCES "ROOM" ("RoomNo")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "DECLARATION" (
	"SSN" integer,
	"ActName" string,
	FOREIGN KEY ("SSN") REFERENCES "USER" ("SSN")
            ON UPDATE CASCADE
            ON DELETE CASCADE,
	FOREIGN KEY ("ActName") REFERENCES "ACTIVITY" ("Name")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "SIMPLEUSER" (
	"SSN" integer,
	"UserID" varchar,
	"userUsername" varchar,
	"userPassword" varchar,
	PRIMARY KEY ("UserID"),
	FOREIGN KEY ("SSN") REFERENCES "USER" ("SSN")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ADMIN" (
	"SSN" integer,
	"AdminID" varchar,
	"adminUsername" varchar,
	"adminPassword" ,
	PRIMARY KEY ("AdminID"),
	FOREIGN KEY ("SSN") REFERENCES "USER" ("SSN")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "FOODRESERVCON" (
	"ResCode" ,
	"CodeNo" ,
	FOREIGN KEY ("ResCode") REFERENCES "RESERVATION" ("ResCode")
            ON UPDATE CASCADE
            ON DELETE CASCADE,
	FOREIGN KEY ("CodeNo") REFERENCES "FOODPACKAGE" ("CodeNo")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

