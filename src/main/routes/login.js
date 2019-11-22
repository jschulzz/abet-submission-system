var express = require('express');
var mustache = require('../common/mustache')
var user_lib = require('../lib/users')
var router = express.Router();

/* GET login page */
router.get('/', function (req, res, next) {
	res.render('base_template', {
		title: 'Login',
		body: mustache.render('login')
	})
})

/* POST login page */
router.post('/', async (req, res, next) => {
	try{
		var in_database = await user_lib.get(req.body.username)
		res.redirect(302, '/course/')
	} catch(error)
	{
		res.redirect(302, '/login/')
	}
})

module.exports = router;
