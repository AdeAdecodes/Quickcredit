
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
  );
   CREATE TABLE IF NOT EXISTS loans( 
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    createdOn DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'pending',
    repaid BOOLEAN DEFAULT false,
    tenor INTEGER NOT NULL,
    amount FLOAT NOT NULL,
    paymentInstallment FLOAT NOT NULL,
    balance FLOAT NOT NULL,
    interest FLOAT NOT NULL
    ); 
    CREATE TABLE IF NOT EXISTS repayments(
      id serial NOT NULL,
      createdOn DATE DEFAULT CURRENT_DATE,
      loanId INTEGER NOT NULL,
      amount FLOAT NOT NULL,
      status VARCHAR(50) DEFAULT 'unapproved'
    );`;
query(queryString);
