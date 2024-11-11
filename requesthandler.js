import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register route handler
export const register = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user
  const newUser = await createUser(username, password);
  res.status(201).json({ message: 'User created', user: newUser });
};

// Login route handler
export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Logged in successfully', token });
};