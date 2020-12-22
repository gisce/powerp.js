import { Client } from "../lib/client";
import { Model } from "../lib/model";
require("dotenv").config();

describe("A Model", () => {
  describe("Calling methods", () => {
    describe("when searching", () => {
      test("must accept a search args", async (done) => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const partner = new Model("res.partner", c);

        const result = await partner.search({
          params: [["id", "=", "1"]],
        });
        expect(result.length).toBe(1);
        done();
      });
      test("must retrieve menu items id's", async (done) => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const menu = new Model("ir.ui.menu", c);

        const results = await menu.search({
          params: [["parent_id", "=", false]],
        });
        expect(results.length).toBeGreaterThan(1);
        done();
      });
      test("must retrieve menu items with full details", async (done) => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const menu = new Model("ir.ui.menu", c);

        const ids = await menu.search({
          params: [["parent_id", "=", false]],
        });

        const idsAndNames = await menu.read({
          ids,
        });
        expect(idsAndNames.length).toBeGreaterThan(1);
        const testItem = idsAndNames[1];
        expect(testItem.id).toBeTruthy();
        expect(testItem.icon).toBeTruthy();
        expect(testItem.icon.length).toBeGreaterThan(0);
        expect(testItem.name).toBeTruthy();
        expect(testItem.name.length).toBeGreaterThan(0);
        done();
      });
    });
  });
});
