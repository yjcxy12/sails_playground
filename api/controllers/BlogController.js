/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getAll : function (req, res) {
		Blog.find().exec(function (err, blogs) {
			return res.json(blogs);
		});
	},
	createNew : function (req, res) {
		Blog.create(req.body).exec(function (err, blog) {
			return err? res.status(400).send(err) : res.ok();
		});
	}
};

