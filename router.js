var routes          = require('./routes');

module.exports = function(app) {
	// Routing
	app.get('/', routes.index);
};
