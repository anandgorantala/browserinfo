var ip = require('ip');
var uaParser = require('ua-parser');


exports.index = function(req, res){
	var ua = req.headers['user-agent'];
	var browser = uaParser.parse(ua);

	res.render('index', { 
		title: 'Express', 
		ip: ip.address(), 
		ua: ua,
		browser: browser.ua.toString(),
		os: browser.os.toString(),
		device: browser.device.family
	});
};
