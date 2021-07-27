process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Post = require('../models/post.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Endpoint testing [posts]', () => {
	it('GET all posts', (done) => {
		chai
			.request(server)
			.get('/api/posts')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});

describe('Endpoint testing [user]', () => {
	it('GET user by ID', (done) => {
		chai
			.request(server)
			.get('/api/user/605af51a285e070015c96916')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('GET user by handle', (done) => {
		chai
			.request(server)
			.get('/api/user/handle/tester')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});
