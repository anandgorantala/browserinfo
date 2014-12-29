var ip = require('ip');
var uaParser = require('ua-parser');
var r = require('rethinkdb');
var db = require('../db');


exports.index = function(req, res){
	var ua = req.headers['user-agent'];
	var browser = uaParser.parse(ua);

	db.onConnect(function (err, connection) {
	    r.db(db.config.db).table('visitors').filter({ip: ip.address(), ua: ua}).run(connection, function(err, cursor) {
	    	cursor.toArray(function(err, results) {
	    		if(!results.length) {
			       	r.db(db.config.db).table('visitors').insert({ip: ip.address(), ua: ua, timestamp: Date.now()}).run(connection, function(err, cursor) {
				        connection.close();
				  	});
		       	} else {
		       		connection.close();
		       	}
	    	});
	       	
	  	});
	});

	res.render('index', {
		title: 'About My Browser. Ip Address, Browser and OS', 
		ip: req.headers['x-real-ip'] || ip.address(), 
		ua: ua,
		browser: browser.ua.toString(),
		os: browser.os.toString(),
		device: browser.device.family
	});
};
