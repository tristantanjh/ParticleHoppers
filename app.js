// Require configurated Express app
const { app } = require("./config");

// Routes and handlers
app
  .use(require('./routes/home'))
  .use('/logout', require('./routes/logout'))
  .use('/login', require('./routes/login'))
  .use('/register', require('./routes/register'))
  .use('/breathe', require('./routes/breathe'))
  .use('/quote', require('./routes/quote'))
  .use('/about', require('./routes/about'))
  .use('/404', require('./routes/404'));

// Starting the server on port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000");
});