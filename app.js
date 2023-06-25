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
  .use('/about', require('./routes/about'));

// Catch-all middleware for handling 404 errors
app.use((req, res, next) => {
    res.status(404).render('errors/notFound');
});

// Starting the server on the assigned port or 3000 as fallback
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
