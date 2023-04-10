const router = require('express').Router();

const { getbill, postMail } = require('../controller/appController.js')
const { getAllData } = require('../index.js')
const { getDataByIndex } = require('../index.js')
const { postData } = require('../index.js')
const { updateData } = require('../index.js')
const { deleteData } = require('../index.js')


/** HTTP Reqeust */

router.post('/product/postMail', postMail);
router.post('/userPost', postData);
router.get('/userTable', getAllData);
router.get('/userTable/:id', getDataByIndex);
router.put('/usersPut/:id', updateData);
router.delete('/usersDelete/:id', deleteData);

module.exports = router;