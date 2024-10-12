
# [Email Reader](https://tseringdhondup.netlify.app/) 


Simple and easy-to-use web application for reading mails from your email client. (Currently support Gmail ONLY!). 

The app is designed and made for personal use to read and store selected email in MySQl database.
## Features

- Create account
- Sign in and Sign out
- Retrieve email from mail server
- Read email
- Parse mail data
- Render email body in client server 
- Add email 
- Schedule interview 

## Tech Stack

**Client:** React, SASS

**Server:** Node, Express, Knex

**Database:** MySQL


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- PORT=8080
- CORS_ORIGIN=http://localhost:3000 
- DB_HOST=your_db_host
- DB_NAME=job_application_tracker
- DB_USER=data_base_user_name
- DB_PASSWORD=your_mysql_database_password

## [Installation - Back-end](https://github.com/Tsedhondup/EmailReader-API.git)
Clone the repository with npm:

```bash
 git clone https://github.com/Tsedhondup/EmailReader-API.git

```
Navigate into the project directory

```bash
cd EmailReader-API:

```
Install dependencies:
```bash
npm install

```
database migration with npm
```bash
  npm run migrate
```
adding seed data with npm
```bash
  npm run seed
```
## [Installation - Front-end](https://github.com/Tsedhondup/EmailReader.gitr)

Clone the repository with npm:

```bash
 git clone https://github.com/Tsedhondup/EmailReader.git

```
Navigate into the project directory

```bash
cd EmailReader:

```
Install dependencies:
```bash
npm install

```
    
## Usage
Navigate into the project directory

```bash
cd EmailRead-API
```
Start Express Server with nodemon:
```bash
npx nodemon index.js
```
Navigate into the project directory

```bash
cd EmailReader
```
Start React Server:
```bash
npm start
```
## Screenshots

![App Screenshot](https://raw.githubusercontent.com/Tsedhondup/Portfolio/refs/heads/develop/src/assets/image/job-tracker.jpg)


## Authors

- [@Tsedhondup](https://github.com/Tsedhondup)

