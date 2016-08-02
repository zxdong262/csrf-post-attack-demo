

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

,config = require('../config')

route.get('/', function* (next) {
	this.render('attack', config)
})

exports.start = function() {

	let
	app = koa()

	app.use(bodyParser())
	app.use( serve( path.resolve(__dirname, '../bower_components') ))
	app.use(jade.middleware)
	app.use(route.routes())
	app.use(route.allowedMethods())
	app.use(function* (next) {
		this.status =  404
		this.body = '404'
	})
	
	return app
}
