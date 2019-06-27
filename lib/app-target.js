

/**
 * Module dependencies.
 */

//imports
const
koa = require('koa')
,path = require('path')
,bodyParser = require('koa-bodyparser')
,Router = require('koa-router')
,route = new Router()
,session = require('koa-session')
,Jade = require('koa-jade')
,serve = require('koa-static')
//view engine
,jade = new Jade({
	viewPath: path.resolve(__dirname, '../views')
	,debug: false
	,pretty: true
	,compileDebug: true
	,noCache: true
})
,nid = require('shortid').generate

route.get('/', function* (next) {
	this.session.csrf = nid()
	this.render('target', {
		csrf: this.session.csrf
	})
})

route.post('/login', function* (next) {
	this.session.logined = true
	this.body = { res: 'ok' }
})

route.get('/logout', function* (next) {
	this.session = null
	this.redirect('/')
})

route.post('/authed-action', function* (next) {

	if(!this.session.logined) {
		return this.body = {
			err: 'not logined'
		}
	}

	let body = this.request.body

	this.body = {
		req: body
		,res: 'you got it'
	}

})

route.post('/authed-action-with-csrf-validate', function* (next) {

	if(!this.session.logined) {
		return this.body = {
			err: 'not logined'
		}
	}

	let body = this.request.body

	if(body.csrf !== this.session.csrf) {
		return this.body = {
			err: 'got you! csrf attacker'
		}
	}

	this.body = {
		req: body
		,res: 'you got it, even with csrf :)'
	}

})


exports.start = function() {

	let
	app = koa()

	app.keys = ['ffdfg']

	app.use(bodyParser())
	app.use( serve( path.resolve(__dirname, '../bower_components') ))
	app.use(session(app))
	app.use(jade.middleware)
	app.use(route.routes())
	app.use(route.allowedMethods())
	app.use(function* (next) {
		this.status =  404
		this.body = '404'
	})
	
	return app
}
