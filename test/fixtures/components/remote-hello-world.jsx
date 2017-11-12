var React = require('React/addons');
// var helloTemplate = require("./local-hello-world.rt");
var helloTemplate = require("./remote-hello-world.ajs");
var Hello = React.createClass({
  
  render: function() {  
    return helloTemplate.apply(this); 
  }
  
});
 
module.exports = Hello;