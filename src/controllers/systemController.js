const paraQuery = require('../utils/db');

const getSystemDetails = async () => {
    try {
        let x = await paraQuery('SELECT * FROM system_details', []);
        console.log(x[0]);
        return x[0];
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    getSystemDetails
};
