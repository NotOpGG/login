var expect = require('chai').expect;
var request = require('request');
var app = require('../server/express.js');

describe('Server tests', () => {
  var server;
  before(function () {
    server = app.listen(5000, () => {
      console.log('connection established');
    });
  });
  after(function () {
    server.close();
  });

  var requestToServer = (options, cb, ep = '') => request('http://127.0.0.1:5000' + ep, options, cb);

  describe('server responds to static requests', ()=>{
    it('responds to / ', (done) => {
      requestToServer({
        method: 'GET',
      }, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('Errors out bad requests', (done) => {
      requestToServer({
        method: 'GET',
      }, (err, res, body) => {
        expect(res.statusCode).to.equal(404);
        done();
      }, '/foo/bar');
    });
  });

  describe('Server gets data for a user', () => {
    it('returns data for correct user', (done) => {
      requestToServer({
        method: 'GET',
      }, (err, res, body) => {
        expect(res.statusCode).to.not.equal(404);
        expect(res.req.path).to.include('region=na');
        expect(res.req.path).to.include('username=twittles2');
        done();
      }, '/stats/region=na/username=twittles2');
    });
    
    it('should redirect incorrect user', (done) => {
      requestToServer({
        method: 'GET',
      }, (err, res, body) => {
        expect(res.statusCode).to.not.equal(404);
        expect(res.req.path).to.equal('/');
        done();
      }, '/stats/username=twittles2/region=na');
    });
  });
});
  
  
// it('returns 10 data points', (done) => {
//   requestToServer({
//     method: 'GET',
//   }, (err, res, body) => {
//     expect(res.statusCode).to.equal(200);
//     expect(body.games.length).to.equal(10);
//     done();
//   }, '/stats/api/?region=na&user=twittles2');
// });




// describe('server responds to static requests', ()=>{
//   it('responds to /', function testSlash(done) {
//     axios.get('localhost:5000').then()
//   });
//   it('404 unavailable addresses', function testPath(done) {
//     request(server)
//       .get('/foo/bar')
//       .expect(404, done);
//   });
// });

// describe('Api responds to queries with users and regions', ()=>{
//   it('responds to /stats', function testSlash(done) {
//     request(server)
//       .get('/stats?region=na&user=twittles2') //?region=na&user=twittles2
//       // .expect(200, done);
//     // });
//       .then((err, userData) => {
//         console.log('userData: ', userData);
//         it('will send you back the correct user info', () => {
//           expect(userData.username).to.equal('twittles2');
//           expect(userData.region).to.equal('na');
//         });

//         it('will send you back 10 games', () => {
//           expect(userData.games.length).to.equal(10);
//         });
//         done();
//       });
//   });
// });



