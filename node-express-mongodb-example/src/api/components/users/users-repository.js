const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Check if a email exist
 * @param {string} email - Email
 * @returns {Promise}
 */
async function checkEmail(email) {
  const users = await User.findOne({ email });
  return users;
}

async function validatePassword(userId, old_password) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User tidak ditemukan');
  }
  console.log(old_password);
  const match = await passwordMatched(old_password, user.password);
  return match;
}

async function updatePassword(userId, new_Password) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User tidak ditemukan');
  }
  user.password = new_Password;
  await user.save();
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkEmail,
  validatePassword,
  updatePassword,
};