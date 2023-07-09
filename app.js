// Require configurated Express app
const { app } = require("./config");

// Routes and handlers
app
  .use(require('./controllers/home'))
  .use('/logout', require('./controllers/logout'))
  .use('/login', require('./controllers/login'))
  .use('/register', require('./controllers/register'))
  .use('/breathe', require('./controllers/breathe'))
  .use('/quote', require('./controllers/quote'))
  .use('/about', require('./controllers/about'))
  .use('/journal', require('./controllers/journal'));

// Catch-all middleware for handling 404 errors
app.use((req, res, next) => {
    res.status(404).render('errors/notFound');
});

// Starting the server on the assigned port or 3000 as fallback
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
