const {v4: uuidv4} = require('uuid');
const path = require("path");

exports.saveFile = async file => {
    let name = uuidv4() + path.extname(file.name);
    await file.mv( path.resolve('./') + '/uploads/' + '' + name, err => {
        if (err) {
            console.log(err);
            return null;
        }
    });
    return name;
}
