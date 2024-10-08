CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    creationDate DATE NOT NULL,
    birthdate DATE NOT NULL,
    profileImg BYTEA
);

CREATE TABLE travels(
    id SERIAL PRIMARY KEY,
    location TEXT NOT NULL,
    locationImg BYTEA NOT NULL,
    nativeLanguage TEXT,
    languageSpoken TEXT,
    passportReq BOOLEAN NOT NULL,
    distanceToBrazil INT NOT NULL,
    flightCompany VARCHAR(100) NOT NULL,
    flightClass TEXT NOT NULL,
    flightPrice NUMERIC(10,2) NOT NULL,
    hostingType TEXT NOT NULL,
    hostingDays INT NOT NULL,
    hostingDailyPrice NUMERIC(10,2) NOT NULL,
    hostingScore INT,
    user_id UUID,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    postdate DATE NOT NULL,
    likes INT NOT NULL, 
    tag1 TEXT,
    tag2 TEXT,
    user_id UUID NOT NULL,
    travels_id SERIAL NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_travels FOREIGN KEY(travels_id) REFERENCES travels(id)
);