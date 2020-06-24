
var assert = require('assert'),
http = require('http');



describe('server', function () {
  before(function () {
    server.listen(8080);
  });

  after(function () {
    server.close();
  });
});





describe('/', function () {
it('It should return 200', function (done) {
http.get('http://localhost:8080/', function (res) {
  assert.equal(200, res.statusCode);
  done();
});
});

it('should say "RestHub api started..."', function (done) {
http.get('http://localhost:8080/', function (res) {
  var data = '';

  res.on('data', function (chunk) {
    data += chunk;
  });

  res.on('end', function () {
    assert.equal('RestHub api started...', data);
    console.log(data);
    done();
  });
});
});
});
