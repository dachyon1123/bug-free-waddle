const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017/socialDB`;

mongoose.connect(connectionStringURI)

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(routes);

const dbName = 'socialDB';


mongoose.connection.once("open", () => {
  app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  });
});
