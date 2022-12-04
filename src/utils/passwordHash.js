const bcrypt = require('bcrypt');
const saltRounds = 12;

const getPasswordHash = (password) => {
	bcrypt.hash(password, saltRounds, function (err, hash) {
		return hash;
	});
};

module.exports = getPasswordHash;
