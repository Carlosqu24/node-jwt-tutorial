const express = require('express');
const app = express();

require('./database')

app.set('port', 4000)

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// ROUTES
app.use(require('./routes/auth.routes'))

app.listen(app.get('port'), () => {
      console.log("Listen in port", app.get('port'));
      console.log(`http://localhost:${app.get('port')}`);
})