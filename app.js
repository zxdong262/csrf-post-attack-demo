/*!
 * main entrance
**/

'use strict'

const config = require('./config')
const appTarget = require('./lib/app-target').start()
const appAttack = require('./lib/app-attack').start()


appTarget.listen(config.targetSitePort, 'localhost', function() {
	console.log('' + new Date(), 'targetSite runs on port', config.targetSitePort, `http://localhost:${config.targetSitePort}`)
})

appAttack.listen(config.attackSitePort, 'localhost', function() {
	console.log('' + new Date(), 'attackSite runs on port', config.attackSitePort, `http://localhost:${config.attackSitePort}`)
})
