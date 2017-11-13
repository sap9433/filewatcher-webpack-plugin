var chai             = require('chai');
var webpack          = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var config           = require("./webpack.config.js");
var expect           = chai.expect;
var fs               = require("fs");
var path             = require("path");
var fetch            = require('node-fetch');


describe('watchFile-webpack-plugin', function(){

	it('Change rt file content, webDevServer should hash code should change.', function(done){
		this.timeout(50000);
		fs.writeFileSync(path.join(__dirname, "/fixtures/components/local-hello-world.rt"), "<div><h3>Hello World From Local...!{this.props.name}</h3></div>");
		var compiler = webpack(config);
		var server = new webpackDevServer(compiler);
		server.listen(1024);
		fs.writeFileSync(path.join(__dirname, "/fixtures/components/local-hello-world.rt"), "<div><h3>Hello World From Austin</h3></div>");
		fetch('http://localhost:1024/js/index.js')
		.then(function(res) {
			return res.text();
		}).then(function(body) {
			expect(body.indexOf("Hello World From Austin")).to.not.equal(-1);
			done();
		});
	});

});