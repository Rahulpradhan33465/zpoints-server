const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const signUp = async (req, res) => {
  const { email, name, password, category } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: 'User already exist' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name,
      category,
    });

    const token = jwt.sign(
      { email: result.email, category: result.category },
      process.env.SECRET,
      { expiresIn: '3h' }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};
const signIn = async (req, res) => {
  const { email, password, category } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(400).json({ message: 'User not exist' });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    const isMatchCategory = category === oldUser.category;

    if (!isPasswordCorrect || !isMatchCategory) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: oldUser.email, category: oldUser.category },
      process.env.SECRET,
      { expiresIn: '3h' }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something Went Wrong' });
  }
};

const Home = (req, res) => {
  res.status(201).json({ message: 'Success fully login' });
};

module.exports = { signIn, signUp, Home };
