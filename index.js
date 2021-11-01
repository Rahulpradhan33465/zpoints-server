const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mainRouter = require('./routers/routes');
const ConnectDB = require('./database/connect');
// Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routes

app.use('/api', mainRouter);

// routes
app.get('/', (req, res) => {
  res.status(200).send('Hello Welcome to rahul SERVER');
});

const port = process.env.PORT || 5000;

const Start = async () => {
  try {
    await ConnectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

Start();
