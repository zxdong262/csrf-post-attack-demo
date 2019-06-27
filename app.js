/*!
 * main entrance
**/

'use strict'

const config = require('./config')
const appTarget = require('./lib/app-target').start()
const appAttack = require('./lib/app-attack').start()


appTarget.listen(config.targetSitePort, config.targetSiteHost, function() {
	console.log('' + new Date(), 'targetSite runs on port', config.targetSitePort, `http://${config.targetSiteHost}:${config.targetSitePort}`)
})

appAttack.listen(config.attackSitePort, config.attackSiteHost, function() {
	console.log('' + new Date(), 'attackSite runs on port', config.attackSitePort, `http://${config.attackSiteHost}:${config.attackSitePort}`)
})
