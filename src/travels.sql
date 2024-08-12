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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location TEXT NOT NULL,
    locationImg BYTEA NOT NULL,
    nativeLanguage TEXT,
    languageSpoken TEXT,
    passportReq BOOLEAN NOT NULL,
    distanceToBrazil NUMBER NOT NULL,
    flightCompany VARCHAR(100) NOT NULL,
    flightClass TEXT NOT NULL,
    flightPrice NUMBER NOT NULL,
    hostingType TEXT NOT NULL,
    hostingDays NUMBER NOT NULL,
    hostingDailyPrice NUMBER NOT NULL,
    hostingScore NUMBER,
    user_id UUID,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE posts(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    postdate DATE NOT NULL,
    likes NUMBER NOT NULL, 
    tag1 TEXT,
    tag2 TEXT,
    user_id UUID,
    travels_id UUID,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_travels FOREIGN KEY(travels_id) REFERENCES travels(id)
);

--TODO
--Posts precisam ter informações do tempo do local
--API Para pegar o clima a partir da lat e long: https://open-meteo.com/en/docs
--API Para pegar lat e long do local a partir de um nome: https://open-meteo.com/en/docs/geocoding-api