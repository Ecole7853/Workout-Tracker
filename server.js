// dependancies //routes
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const mongoose = require('mongoose');
const morgan = require('morgan');
const apiRoutes = require('./routes/api');
// requires express and sets our host page #
const app = express();
const PORT = process.env.PORT || 3001;
// facilitates express / builds middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
app.use(htmlRoutes);
app.use(apiRoutes);
// connects database
// then turn on the server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});