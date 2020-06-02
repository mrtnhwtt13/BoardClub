const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const users = require('./routes/users');
const games = require('./routes/games');
const comments = require('./routes/comments');
const mobile_user = require('./routes/mobile/users');
const mobile_game = require('./routes/mobile/game');

//setup environment
dotenv.config();

// mongo db connect
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/games', games);
app.use('/api/comments', comments);
app.use('/api/mobile/users', mobile_user)
app.use('/api/mobile/game', mobile_game)


// run app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

