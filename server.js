import express from 'express';
import bodyParser from 'body-parser';
import home from './routes/friends';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors());

app.use('/', home);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`you are listening ${port}`));

module.exports = app;
