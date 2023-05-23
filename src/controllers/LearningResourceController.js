const {saveFile} = require('../utils/saveFiles');
const paraQuery = require('../utils/db');


const getAllLearningResources = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM learning_resource', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const getLearningResourcesBySection = async (req, res) => {
	try {
		const {sectionId} = req.params;
		let x = await paraQuery('SELECT * FROM learning_resource WHERE section_id = ?', [sectionId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const createNewLearningResource = async (req, res) => {
	try {
		let {
			title,
			sectionId,
		} = req.body;
		
		let filePath = null;
		let fileName = null;
		if (req.files) {
			let {file} = req.files;
			console.log(file);
			fileName = file.name;
			filePath = await saveFile(file);
		}
		console.log(filePath, fileName);
		let x = await paraQuery(
			'INSERT INTO learning_resource (title, section_id, file_name, file_path) VALUES (?, ?, ?, ?)',
			[
				title,
				sectionId,
				fileName,
				filePath
			],
		);
		res.status(200)
		   .json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const deleteLearningResource = async (req, res) => {
	try {
		let {id} = req.params;
		
		let x = await paraQuery('DELETE FROM learning_resource WHERE id=?', [id]);
		console.log(x);
		res.status(200)
		   .json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

module.exports = {getAllLearningResources, getLearningResourcesBySection ,createNewLearningResource, deleteLearningResource}
