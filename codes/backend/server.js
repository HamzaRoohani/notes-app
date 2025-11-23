const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const notesRouter = require('./routes/notes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notes-app';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
