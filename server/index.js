require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      app = express();
      
app.use(express.json());

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 *60 * 24}, //good for one day
  })
)



massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db)
  console.log('db connected')
  app.listen(SERVER_PORT, () => console.log( `server is running on port ${SERVER_PORT}`))
}).catch(err => console.log(`massive err`, err))


