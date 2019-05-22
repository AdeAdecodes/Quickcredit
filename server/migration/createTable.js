import query from './index';


const queryString = `

  CREATE TABLE IF NOT EXISTS users(

    id SERIAL PRIMARY KEY,      
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    homeAddress VARCHAR(128) NOT NULL,
    workAddress VARCHAR(128) NOT NULL,
    phoneNumber VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    registered TIMESTAMP,
    status VARCHAR(128) NOT NULL,
    isAdmin BOOLEAN NOT NULL

  );`;

query(queryString);
