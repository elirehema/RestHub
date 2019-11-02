# RestHub [![Build Status](https://travis-ci.com/elirehema/RestHub.svg?branch=master)](https://travis-ci.com/elirehema/Onn)

## Project

    This repo contain a demo NODEJS apis for [eLog](https://github.com/elirehema/Onn/) Project

## API's

    The API is devided into the following section's
   
  ##### BaseUrl
 ***
  * Through out this documentation i'll reference the BaseUrl as : `https://infosk.herokuapp.com/api`
  * And Every request except Authentication required Authorization header which is Token you get after login success
  e.g. `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDhkY2EwNmY3ZGFmOTE0YzRmMGNhNTciLCJpYXQiOjE1NzAyODk3ODAsImV4cCI6MTU3MDM3NjE4MH0.kOvcpeDTZ04tv0Cnsg0jL9NJ_vumOKDXJP9rgu1nA9Y`
 * ###### Authentication
    
   | URL | Method  | Header  |  Body   | Response   |
   |-----|:---------:|:--------|:----------:|-----------|
   | ` /auth/login` | `POST`  | `Content-Type`:`application/json` |  `email` & `password`   | TokenID   |
 * ###### Users
     | URL | Method  | Header  |  Body   | Response   |
    |-----|:---------:|:--------|:----------:|-----------|
    | ` /users` | `GET`  | `Content-Type`:`application/json` |  null   | Users   |
     
 * ###### Commenting
 * ###### Messages
 * ###### Products
   | URL | Method  | Header  |  Body   | Response   |
    |-----|:---------:|:--------|:----------:|-----------|
    | ` /products` | `GET`  | `Content-Type`:`application/json` |  null   | Products   |

 
