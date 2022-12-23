const bcrypt = require('bcrypt');
const saltRounds = 12;

const getPasswordHash = async (password) => {
	let hash = await bcrypt.hash(password, saltRounds);
	return hash;
};

module.exports = getPasswordHash;
