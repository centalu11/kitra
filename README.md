# Installation

- First, clone this repo
- Then, create a new file `.env` in the root folder and copy the contents from `.env.example.`
  Change some configurations based on your local like the database name if you want or just leave the same values.
- Then create a mysql database with the same name as the one defined as `TYPEORM_DATABASE` from `.env`.
  This is an empty database for now and will get populated later.
- If nodejs is currently not installed, install it from https://nodejs.org/en.
  The current version I was using is v16.11.1
- Run `npm install`
- Run `npm run migrate:run`
- Run `npm run seed:run`

# Running

- Check the port you defined in your `.env` via `APP_PORT`, default is `3005` if not supplied in `.env`.
This port will be used as part of the URL
- Then, please run the command `npm run start` to start the local server.
- The final base url will be `localhost:<APP_PORT>` example `localhost:3005`

# Endpoints

For the endpoints, I only created 2.

## Geolocation Endpoint (<base_url>/kitra/v1/geolocation)
- Sample URL: `localhost:3005/kitra/v1/geolocation`
- HTTP Method: `GET`
- Query Params:
    - `latitude`: required
    - `longitude`: required
    - `distance`: required
        - possible values: 1 or 10 Only
    - `prize_value`: optional
        - possible values: within range of 10 to 30, whole numbers only

## Login Endpoint (<base_url>/kitra/v1/auth/login)
- Sample URL: `localhost:3005/kitra/v1/auth/login`
- HTTP Method: `POST`
- Body Params (JSON):
    - `email`: required
    - `password`: required

> **Note** I only created the login endpoint for the requirement. It doesn't really create a session and doesn't restrict access to other APIs (geolocation). Although, it does authenticate users and check if the user is existing.