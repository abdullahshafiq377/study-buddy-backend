const express = require('express');
const path = require("path");
const router = express.Router();

router
    .route('/:fileName')
    .get((req, res) =>{
        let filePath = path.resolve('./') + '/uploads/' + '' + req.params.fileName;
        console.log(filePath);
        res.sendFile(filePath);
    })
module.exports = router;
