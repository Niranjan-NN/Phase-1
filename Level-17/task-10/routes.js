const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('./models');
const { auth, role } = require('./middleware');

const createToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

router.post('/register', async (req, res) => {
  const user = await User.create(req.body);
  const token = createToken(user._id);
  res.json({ token, user });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = createToken(user._id);
  res.json({ token, user });
});

router.get('/profile', auth, (req, res) => res.json(req.user));
router.get('/admin', auth, role(['admin']), (req, res) => res.json({ message: 'Admin content' }));

module.exports = router;
