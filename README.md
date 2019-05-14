# Quickcredit

[![npm version](https://badge.fury.io/js/express.svg)](https://badge.fury.io/js/express)
[![Build Status](https://travis-ci.org/hardecx/Quickcredit.svg?branch=develop)](https://travis-ci.org/hardecx/Quickcredit)
[![Maintainability](https://api.codeclimate.com/v1/badges/d88297d66181f684ef84/maintainability)](https://codeclimate.com/github/hardecx/Quickcredit/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d88297d66181f684ef84/test_coverage)](https://codeclimate.com/github/hardecx/Quickcredit/test_coverage)
[![Coverage Status](https://coveralls.io/repos/github/hardecx/Quickcredit/badge.svg?branch=develop)](https://coveralls.io/github/hardecx/Quickcredit?branch=develop)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


## Getting Started
Quickcredit is an online lending platform that provides short term soft loans to individuals. This
helps solve problems of financial inclusion as a way to alleviate poverty and empower low
income earners.

The application' UI template is on github pages [here](https://hardecx.github.io/UI/index.html)

## Implemented Features

- User (client) can sign up.
- Users can login.
- User can apply for loan.
- User can view loan repayment history
- Admin can mark a client as verified, after confirming his/her home and work address.
- Admin can view a specific loan application.
- Admin can approve or reject a client's loan application.
- Admin can post loan repayment transaction in favour of a client.
- Admin can view all loan applications.
- Admin can view all current loans (not fully repaid).
- Admin can view all repaid loans.
- User can reset password.

---
## Github Pages
[UI](https://hardecx.github.io/UI/index.html)

## Pivotal Tracker
[Project Management](https://www.pivotaltracker.com/n/projects/2326900)

## Heroku App deployment link
[Backend](https://bootquickcredit.herokuapp.com/)

## Technologies to be Used

- [NodeJS](https://nodejs.org/)

- [Express](https://expressjs.com/)

- [Babel](https://babeljs.io/)

- [ESLint](https://eslint.org/)

- [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/)

---

## Installation

#### Clone this repository and navigate into it.

`git clone https://github.com/hardecx/quickcredit.git && cd quickcredit`

#### Install dependencies.

`npm install`

#### Add Neccessary Environment Variables

 Add a .env file to the root and declare the following environment variables:  

- SECRET: A jswebtoken secret to encrypt jsonwebtoken

#### Start the application.

`npm start`

---