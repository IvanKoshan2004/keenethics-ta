# How to run the project

## Using Docker.

Run `docker compose up` in the root directory. This sets up client, API server and mongodb.

## Manually.

1. Inside the terminal, navigate to `client` folder and run `npm run dev` to start client dev server.
2. Run a MongoDB server locally at port 27017, or change MONGODB_URI env variable in the `.env` file in `server` folder, to connect to a running server.
3. Then navigate to `server` folder and run `npm run start:dev` to run the api server.
