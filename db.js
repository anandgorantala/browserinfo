var rethinkdb = require('rethinkdb'),
  	util = require('util'),
  	assert = require('assert'),
  	logdebug = require('debug')('rdb:debug'),
    logerror = require('debug')('rdb:error'),
  	config = {
          host: process.env.RDB_HOST || 'localhost',
          port: parseInt(process.env.RDB_PORT) || 28015,
          db  : process.env.RDB_DB || 'browserinfo'
      };

function onConnect(callback) {
  rethinkdb.connect({host: config.host, port: config.port }, function(err, connection) {
    assert.ok(err === null, err);
    connection['_id'] = Math.floor(Math.random()*10001);
    callback(err, connection);
  });
}

module.exports = {
	onConnect: onConnect,
	config: config
};