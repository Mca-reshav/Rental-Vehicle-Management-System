const bcrypt = require("bcrypt");
const { error } = require("./response.service");

const encryptService = {

  hashPassword: async (password) => {
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (err) {
        error(`Error hashing password: ${err.message}`);
    }
  },

  comparePassword: async (plainPassword, hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (err) {
        error(`Error comparing password: ${err.message}`);
    }
  },
};

module.exports = encryptService;