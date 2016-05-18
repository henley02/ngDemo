/**
 * Created by ־ǿ on 2016/4/14.
 */
/*
var connect = require('connect');
var server = require("serve-static");
app = connect();
app.use(server("angularjs"));
app.listen(5000);
*/
/*var connect=require("connect");
connect.createServer(
    connect.static("../angularjs")
).listen(5000);*/

var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("../angularjs"));
app.listen(5000);