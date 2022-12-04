const bcrypt = require('bcrypt');
const saltRounds = 12;

const getPasswordHash = async (password) => {
	let hash = await bcrypt.hashSync(password, saltRounds);
	return hash;
};

module.exports = getPasswordHash;
