
var assert = require('assert'),
http = require('http');
var https = require('https');
const config = require('../app/config/config');


/*
describe('server', function () {
  before(function () {
    server.listen(8080);
  });

  after(function () {
    server.close();
  });
});

 describe('test', () => {
  it('should return a string', () => {
    expect('RestHub api started...').to.equal('RestHub api started...');
  });
});
 */

describe('/', function () {
it('It should return 200', function (done) {
https.get(config.REMOTE_URL, function (res) {
  assert.equal(200, res.statusCode);
  done();
});
});

it('should say "RestHub api started...!"', function (done) {
https.get(config.REMOTE_URL, function (res) {
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
