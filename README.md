# Docker Workshop

A simple web app to store quotes.

## Running without Docker

1. Clone repo
2. run `npm install`
3. Install MongoDB and run it.
4. run `node server.js`
5. Open `localhost:3000` in your favorite browser!

## Running with Docker

1. Follow the workshop to write a `Dockerfile` and `docker-compose.yml`.
2. Run `docker-compose up`

Much simpler!

### Adding `quotebook.local` to your `/etc/hosts`

1. Run `sudo nano /etc/hosts`
2. Add this line to the end: `127.0.0.1 quotebook.local` and save
3. Run `docker-compose up` with the nginx proxy, and you have a secure server running!
