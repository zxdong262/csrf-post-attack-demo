
const chai = require('chai')
,expect = chai.expect
,pkg = require('../package.json')
,resolve = require('path').resolve
,should = chai.should()
,config = require('../config-sample')
,uri = `http://localhost:${config.port}`
,request = require('request')
,qr = function(args) {

	return new Promise(function(resolve, reject) {
		request(args, function(err, response, body) {
			if(err) reject(err)
			else resolve({
				response: response
				,body: body
			})
		})
	})

}
,urls = {
	add: `${uri}/add/user`
	,update: `${uri}/update/user`
	,del: `${uri}/del/user`
	,get: `${uri}/get/user`
}

describe(pkg.name, function() {

	it('add', function(done) {
		qr({
			uri: urls.add
			,method: 'post'
			,body: {
				name: 'zxd'
				,age: 33
			}
			,json: true
		})
		.then(function(res) {
			//console.log(res)
			expect(res.body.name).to.equal('zxd')
			done()
		})
	})

	it('update', function(done) {

		var changed = 'zxd' + Math.random()
		qr({
			uri: urls.add
			,method: 'post'
			,body: {
				name: 'zxd2'
				,age: 333
			}
			,json: true
		})
		.then(function(res) {
			return qr({
				uri: urls.update
				,method: 'post'
				,body: {
					query: {
						where: {
							id: 1
						}
					}
					,update: {
						name: changed
					}
				}
				,json: true
			})
		})
		.then(function(res) {
			return qr({
				uri: urls.get
				,method: 'post'
				,body: {
					query: {
						where: {
							name: changed
						}
					}
				}
				,json: true
			})
		})
		
		.then(function(res) {
			//console.log(res.body)
			expect(res.body[0].name).to.equal(changed)
			done()
		})
	})

	it('del', function(done) {
		var changed = 'zxd' + Math.random()
		qr({
			uri: urls.add
			,method: 'post'
			,body: {
				name: changed
				,age: 333
			}
			,json: true
		})
		.then(function(res) {
			return qr({
				uri: urls.del
				,method: 'post'
				,body: {
					query: {
						where: {
							name: changed
						}
					}
				}
				,json: true
			})
		})
		.then(function(res) {
			return qr({
				uri: urls.get
				,method: 'post'
				,body: {
					query: {
						where: {
							name: changed
						}
					}
				}
				,json: true
			})
		})
		
		.then(function(res) {
			//console.log(res.body)
			expect(res.body.length).to.equal(0)
			done()
		})
	})

})
