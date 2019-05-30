import Client from "../src/powerp";

describe("a PowERP Client", () => {
  describe('When initializing', () => {
    it('should receive host, database, user, password', () => {
      const c = new Client('http://localhost/api/v1', 'db', 'root', 'root');
      expect(c.hasOwnProperty('host')).toBeTruthy();
      expect(c.hasOwnProperty('database')).toBeTruthy();
      expect(c.hasOwnProperty('user')).toBeTruthy();
      expect(c.hasOwnProperty('password')).toBeTruthy();
    });
  });
  describe('Getting a model', () => {
    it('should return a Model instance', () => {
      const c = new Client('http://localhost/api/v1', 'db', 'root', 'root');
      const model = c.model('res.users');
      expect(model.model).toEqual('res.users');
      expect(model.client).toEqual(c);
    });
  });
});

describe("a Model", () => {

  describe("when reading", () => {
    it("must call post with the ids and fields", () => {
      const c = new Client('http://localhost:8068', 'test_1559245558', 'admin', 'admin');
      const model = c.model('res.partner');
      model.read([1], ['name']).then(result => {
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(1);
        expect(result[0].hasOwnProperty('name')).toBeTruthy();
      }).catch(reason => {
        throw reason;
      });
    });
  });

  describe("when searching", () => {
    it("must accept a search args", () => {
      const c = new Client('http://localhost:8068', 'test_1559245558', 'admin', 'admin');
      const model = c.model('res.partner');
      model.search([['name', 'ilike', 'tiny sprl']]).then(result => {
        expect(result.length).toBe(1);
      });
    });
  });

  describe("when creating", () => {
    it("must create a new record", () => {
      const c = new Client('http://localhost:8068', 'test_1559245558', 'admin', 'admin');
      const model = c.model('res.partner');
      model.create({name: 'GISCE'}).then(result => {
        expect(typeof(result)).toBeGreaterThan(0);
      });
    });
  });

});
