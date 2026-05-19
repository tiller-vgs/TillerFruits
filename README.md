# Tillerfruits

An online classroom tool for creative feedback between classmates

## About

TillerFruits is a platform for peer assessment. The teacher creates the assignment and sets the criteria, the students submit and assess each other. Simple and straightforward.

### This project uses:

- [Material UI](https://mui.com/)
- [Tailwind](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Better-Auth](https://better-auth.com/)
- [multer](https://www.npmjs.com/package/multer)
- [react-hook-form](https://react-hook-form.com/)
- [react-pdf](https://react-pdf.org/)

## Installation Guide

#### Node Installation

In order to open and try out the website, you need to have Node.js installed on your machine.

```
check your node and NPM versions with these commands:
$ node -v
$ npm -v
```

#### Repository cloning

Open GitBash or another terminal of your choice

```
Run this command to clone the repo:
    $ git clone <repository_URL>

Then open the frontend folder using:
    $ cd TillerFruits/frontend

Run this command to install all dependencies:
    $ npm install

Then, repeat the same process for backend:

    $ cd TillerFruits/backend
    $ npm install
```

Setup DB
To setup the database, create a new .env file with these values:
```
DATABASE_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```
Ask one of the devs for the env values.
After that, you need to generate the database using the pre-made schema.sql
Simply follow these steps:

```
open the backend once more:
     $ cd TillerFruits/backend

run this command to generate from schema:
    $ npx prisma generate
```
If you did everything correctly, backend should respond with:     
`✔ Generated Prisma Client`     

and the database connection should work!

#### Opening the website

Keeping the frontend AND backend terminals open, run `npm run dev` in both of them  
A link including a blue-highlighted localhost should pop up in your frontend terminal.  
Control + Click on `http://localhost:5137/` in order to open the website in your browser

### Credits

This is a school project inspired by [FeedbackFruits](https://feedbackfruits.com/)
