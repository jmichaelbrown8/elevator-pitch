const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  helpers,
});

const sess = {
  secret: process.env.SESSION_SECRET || 'Replace me',
  cookie: {
    // Stored in milliseconds (1800000 === 30 minutes)
    maxAge: 1800000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize
  .sync({
    force: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening: http://localhost:${PORT}`));
  });
