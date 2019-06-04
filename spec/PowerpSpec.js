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

    it('should allow login', (done) => {
      const c = new Client('http://localhost:8068', 'test_1559245558', 'admin', 'admin');
      c.login().then(() => {
        expect(c.uid).toBe(1);
        done();
      }).catch(done);
    })

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
  describe('Calling methods', () => {

    describe("when reading", () => {
      it("must call post with the ids and fields", (done) => {
        const c = new Client('http://localhost:8068', 'test_1559245558', 'admin', 'admin');
        const model = c.model('res.partner');
        c.login().then(() => {
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
        const c = new Client('http://localhost:8068', 'test_1559245558', 'admin', 'admin');
        const model = c.model('res.partner');
        c.login().then(() => {
          model.search([['name', 'ilike', 'tiny sprl']]).then(result => {
            expect(result.length).toBe(1);
            done();
          }).catch(done);
        }).catch(done);
      });
    });

    describe("when creating", () => {
      it("must create a new record", (done) => {
        const c = new Client('http://localhost:8068', 'test_1559245558', 'admin', 'admin');
        const model = c.model('res.partner');
        c.login().then(() => {
          model.create({name: 'GISCE'}).then(result => {
            expect(result).toBeGreaterThan(0);
            done();
          }).catch(done);
        }).catch(done);
      });
    });

    describe('when browsing', () => {
      it('should return a list of records', (done) => {
        const c = new Client('http://localhost:8068', 'test_1559245558', 'admin', 'admin');
        const model = c.model('res.partner');
        c.login().then(() => {
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
        const c = new Client('http://localhost:8068', 'test_1559245558', 'admin', 'admin');
        const model = c.model('res.partner');
        c.login().then(() => {
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
