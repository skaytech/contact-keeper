const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Register the Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
