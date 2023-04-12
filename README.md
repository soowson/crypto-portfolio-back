# Crypto Portfolio Tracker 
This project allow you to create portfolio of cryptocurriencies. Frontend: 

## General Information
The main goal of this project is to allow you to create your own portfolio of cryptocurrencies. Once we create an account and log in, this application allows us to see the current prices of cryptocurrencies, the current score of individual transactions and the score of the entire portfolio.

## Technologies used
- TypeScript: version 4.7
- Nest: version: 9
- MySQL: version 2.18
- TypeORM: version 0.3
- RxJS: version 7
- passport: version 0.6
- passport-jwt: version 4.0

## Features
- registration with hashed user’s password
- authentication with passport-jwt
- an overview of the current prices of the top 100 cryptocurrencies
- adding executed transactions with the following information: name of cryptocurrency, price, amount, date of transaction, notes
- list of individual transactions with current profit 
- portfolio - a list of aggregated transactions of a particular cryptocurrency
- editing a transaction 
- deleting a transaction

## Setup
1) cd into project folder 
2) npm install
3) create database 'crypto'
4) complete the database configuration in the file config.example.ts
5) start the app: right-click on the package.json file => show npm scripts => start

## Contact
email: jakubsowinski94@gmail.com

