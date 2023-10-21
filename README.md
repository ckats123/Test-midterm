# "Programmer" - Buy/Sell Listings Site

Programmer is a full stack web application built with Node and Express that connects buyers and sellers of tech-services and skills.


## Features
- Buyer/ Seller sign-up and login authentication
- Advanced search for specific service parameters
- Transaction invoice generation and reviews 
- Unique my-account screen for seller and buyer
- Detail view for single listing
- Favorite listing toggle and "favourites" page for user

## Final Product
#### Search and featured listings on home page
!["Screenshot of home-page"](/docs/home_page.png)
#### Advanced listings search
!["Screenshot of advanced listings search field"](/docs/advanced_search.png)
#### Create listing
!["Screenshot of create-listing page"](/docs/create_listing.png)
#### Seller's my-account details
!["Screenshot of seller's account page"](/docs/seller_account.png)
#### Login/Register toggle
!["Screenshot of login toggle"](/docs/login.png)



## Dependencies
- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- EJS
- cookie-parser
- SASS
- dotenv
- express
- morgan


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`



