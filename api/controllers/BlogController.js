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
	},
	update: function (req, res) {
		Blog.update({id: req.body.id}, {title: req.body.title, body: req.body.body}).exec(function (err, blog) {
			return err? res.status(400).send(err) : res.ok();
		});
	},
	delete: function (req, res) {
		Blog.destroy(req.body.id).exec(function (err, blog) {			
			return err? res.status(400).send(err) : res.ok();
		});
	}
};

