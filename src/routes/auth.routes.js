const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const config = require('../config')

const User = require('../models/User');

router.get('/signup', (req, res, next) => {

})

router.post('/signup', async (req, res, next) => {
      const { username, email, password } = req.body;

      const user = new User({ username, email, password});
      user.password = await user.encryptPassword(password)

      await user.save();

      const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 60 * 60 * 24
      });

      res.json({ auth: true, token })
})

router.get('/signin', (req, res, next) => {

})

router.post('/signin', async (req, res, next) => {
      const { email, password } = req.body

      const user = await User.findOne({ email });

      if(!user) {
            return res.status(404).send("The email does't exist")
      };

      const passwordIsValid = await user.matchPassword(password);
      
      if(!passwordIsValid) {
            return res.status(401).json({ auth: false, token: null })
      };

      const token = jwt.sign({ id:user._id }, config.secret, {
            expiresIn: 60*60*24
      });

      res.json({ auth: true, token});
});

router.get('/profile', async (req, res, next) => {
      const token = req.headers['x-access-token'];
      
      if(!token) {
            return res.status(401).json({
                  auth: false,
                  message: 'No token provided'
            });
      };

      const decoded = jwt.verify(token, config.secret);
      
      const user = await User.findById(decoded.id, { password: 0 })
      if (!user) {
            return res.status(404).send('No user founded')
      }

      res.json(user)
})

module.exports = router;