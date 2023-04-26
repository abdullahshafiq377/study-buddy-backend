const paraQuery = require('../utils/db');

const getAllInstructorsAndStudents = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM sub_admin', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({error: true});
	}
};
