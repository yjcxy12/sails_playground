/**
* Blog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	tableName: 'blogs',

	attributes: {
		title: {
			type: 'string',
			unique: true
		},
		body: {
			type: 'string'
		}
	}
};

