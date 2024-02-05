
# Job Application Tracker

Simple and easy-to-use web application for tracking and managing multiple job applications by 
reading mails from your email client. (Currently support Gmail ONLY!)

This particular repository is an API for front-end project Please visit- [TseDhondup](https://github.com/Tsedhondup/job-application-tracker)

The app is designed and made for personal use to track and manage job applications. It will help 
ease the load of weight to remember a couple dozen job applications by collectively putting in 
the organized dashboard that is simple yet easy to use.

Currently, the App is designed to be used only by the author. To able to be used by the general 
public, it will require additional skills that are beyond the scope of the author's knowledge.
The app will require personal data to create an account which brings the question of security. 
Therefore, this app will be limited to the author until the app acquires all security features for 
protecting personal data. However, making it accessible to the general public is being planned 
in later Phases of the project



## Acknowledgements

 - [BrainStation](https://brainstation.io/?utm_keyword=brainstation&utm_network=g&utm_matchtype=e&utm_creative=482909840077&utm_target=&utm_placement=&utm_device=c&utm_campaign=11729367083&utm_adgroup=116579479809&utm_source=AdWords&utm_target_id=kwd-296950415241&gad_source=1&gclid=CjwKCAiAiP2tBhBXEiwACslfnm6ei3HVAKqqaSilroeKqbfSP3vlprCfrnn8asaVBRJazdkE11pgwhoCBGQQAvD_BwE)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)


## Authors

- [TseDhondup](https://github.com/Tsedhondup)


## Features

- Create account
- Sign in and Sign out
- custom authentication and authorization
- Retrieve email from mail server
- Read email
- Parse mail data
- Render email body in client server 
- Add email 
- Schedule interview 





## 🚀 About Me
I'm a full stack developer...


## Tech Stack

**Client:** React, SASS

**Server:** Node, Express, Knex

**Database:** SQL



## Installation

Install my-project with npm

```bash
  cd job-application-tracker
```
Install dependencies with npm
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
start express sever with nodemon 
```bash
  npx nodemon index.js // App is listening on port 8080
```

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- PORT=8080
- CORS_ORIGIN=http://localhost:3000 
- DB_HOST=your_db_host
- DB_NAME=job_application_tracker
- DB_USER=data_base_user_name
- DB_PASSWORD=your_mysql_database_password




## Lessons Learned

- Using external packages such as IMAP(Internet Message Access Protocol) for retrieving email from the mail server was the single biggest huddle of this project. Because It required skills that are beyond the scope of my knowledge. 

- Designing and setting up the database were done poorly, which resulted in the need for frequent changes during the development of the front-end. What was initially planned for sending data structure was insufficient and did not meet the requirement of client app functionality. Having to make changes in such a situation significantly slowed the pace of my development. Some features had to be completed in the later phase of this project.



