const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/learning-jwt')
      .then(db => console.log('DB is connected'))