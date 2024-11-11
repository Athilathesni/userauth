import bcrypt from 'bcryptjs';

let users = [];  // In-memory user storage

export const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

export const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};