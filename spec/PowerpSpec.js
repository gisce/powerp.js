import Client from "../src/powerp";

const BACKEND_URL = '';
const BACKEND_DATABASE = '';

describe("a PowERP Client", () => {
  describe('When initializing', () => {
    it('should receive host, database', () => {
      const c = new Client('https://localhost:8068', 'db');
      expect(c.hasOwnProperty('host')).toBeTruthy();
      expect(c.host).toBe('https://localhost:8068');
      expect(c.hasOwnProperty('database')).toBeTruthy();
      expect(c.database).toBe('db');
      expect(c.hasOwnProperty('token')).toBeTruthy();
      expect(c.token).toBeNull();
    });

    it('should allow login', (done) => {
      const c = new Client(BACKEND_URL, BACKEND_DATABASE);
      c.login('test', 'test').then(() => {
        expect(c.token).toBeTruthy();
        done();
      }).catch(done);
    })

  });
  describe('Getting a model', () => {
    it('should return a Model instance', () => {
      const c = new Client(BACKEND_URL, BACKEND_DATABASE);
      const model = c.model('res.users');
      expect(model.model).toEqual('res.users');
      expect(model.client).toEqual(c);
    });
  });
});

describe("a Model", () => {
  describe('Calling methods', () => {

    describe("when reading", () => {
      it("must call post with the ids and fields", (done) => {
        const c = new Client(BACKEND_URL, BACKEND_DATABASE);
        const model = c.model('res.partner');
        c.login('test', 'test').then(() => {
          model.read([1], ['name']).then(result => {
            expect(result.length).toBe(1);
            expect(result[0].id).toBe(1);
            expect(result[0].hasOwnProperty('name')).toBeTruthy();
            done();
          }).catch(done);
        }).catch(done);
      });
    });

    describe("when searching", () => {
      it("must accept a search args", (done) => {
        const c = new Client(BACKEND_URL, BACKEND_DATABASE);
        const model = c.model('res.partner');
        c.login('test', 'test').then(() => {
          model.search([['id', '=', '1']]).then(result => {
            expect(result.length).toBe(1);
            done();
          }).catch(done);
        }).catch(done);
      });
    });

    describe("when creating", () => {
      it("must create a new record", (done) => {
        const c = new Client(BACKEND_URL, BACKEND_DATABASE);
        const model = c.model('res.partner');
        c.login('test', 'test').then(() => {
          model.create({name: 'GISCE'}).then(result => {
            expect(result).toBeGreaterThan(0);
            done();
          }).catch(done);
        }).catch(done);
      });
    });

    describe('when browsing', () => {
      it('should return a list of records', (done) => {
        const c = new Client(BACKEND_URL, BACKEND_DATABASE);
        const model = c.model('res.partner');
        c.login('test', 'test').then(() => {
          model.search([]).then((ids) => {
            const records = model.browse(ids).then((records) => {
              expect(records.length).toBe(ids.length);
              done();
            }).catch(done);
          }).catch(done);
        }).catch(done);
      });
    });

    describe('when calling undefined method in library', () =>{
      it('should call the method in the backend', (done) => {
        const c = new Client(BACKEND_URL, BACKEND_DATABASE);
        const model = c.model('res.partner');
        c.login('test', 'test').then(() => {
          model.fields_get(['name']).then((result) => {
            expect(result.hasOwnProperty('name')).toBeTruthy();
            expect(result.name.hasOwnProperty('required')).toBeTruthy();
            done();
          })
        }).catch(done);
      });
    });

  });
});
