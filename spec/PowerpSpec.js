import Client from "../src/powerp";
import chai from 'chai';
import moxios from 'moxios';

var expect = chai.expect;

describe("a PowERP Client", function() {
  describe('When initializing', function() {
    it('should receive host, database, user, password', function() {
      let c = new Client('http://localhost/api/v1', 'db', 'root', 'root');
      expect(c).to.have.property('host');
      expect(c).to.have.property('database');
      expect(c).to.have.property('user');
      expect(c).to.have.property('password');
    });
  });
  describe('Getting a model', function() {
    it('should return a Model instance', function() {
      let c = new Client('http://localhost/api/v1', 'db', 'root', 'root');
      let model = c.model('res.users');
      expect(model.model).to.equal('res.users');
      expect(model.client).to.equal(c);
    });
  });
});

describe("a Model", function() {
  beforeEach(function () {
    console.log('install mock');
    moxios.install();
  });
  afterEach(function () {
    moxios.uninstall();
  });
  describe("when reading", function() {
    it("must call axios with the filter params, offset, limit", function() {
      let c = new Client('http://localhost/api/v1', 'db', 'root', 'root');
      let model = c.model('res.users');
      model.read([['name', '=', 'admin']], ['name']).then(function(response) {
        console.log("Response: " + response);
      });
      console.log('palante no?');
      moxios.wait(function() {
        console.log('Fooo');
        let request = moxios.requests.mostRecent();
        console.log(request);
        request.respondWith({
          status: 200,
          response: {
              items: [
                {
                  id: 1,
                  name: "Admin"
                }
              ],
              n_items: 1,
              limit: 80,
              offset: 0
          }
        }).then(function() {
          console.log('AAAAAAAAAa');
          done();
        })
      });
    })
  });
});
