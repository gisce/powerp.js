import { Client } from "../lib/client";
import { Model } from "../lib/model";
import * as dotenv from "dotenv";

dotenv.config();

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
      test("must count items for a search query", async (done) => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const partner = new Model("res.partner", c);

        const result = await partner.search({
          count: true,
        });
        expect(result).toBeGreaterThan(100);
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
    describe("when retrieving a tree view", () => {
      test("must retrieve a valid action for id 71", async () => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const menu = new Model("ir.actions.act_window", c);
        const actions = await menu.read({
          ids: [71],
        });
        expect(actions.length).toBe(1);
      });
      test("must retrieve valid views for type tree and id 96", async () => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const menu = new Model("res.partner", c);
        const fieldsAndArch = await menu.fields_view_get({
          id: 96,
          type: "tree",
          context: [],
          toolbar: true,
        });
        expect(Object.keys(fieldsAndArch.fields).length).toBeGreaterThan(1);
        expect(fieldsAndArch.arch).toBeTruthy();
        expect(fieldsAndArch.toolbar).toBeTruthy();
        expect(fieldsAndArch.type).toBe("tree");
        expect(fieldsAndArch.view_id).toBe(96);
      });
      test("must retrieve valid views for type form and id 97", async () => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const menu = new Model("res.partner", c);
        const fieldsAndArch = await menu.fields_view_get({
          id: 97,
          type: "form",
          context: [],
          toolbar: true,
        });
        expect(Object.keys(fieldsAndArch.fields).length).toBeGreaterThan(1);
        expect(fieldsAndArch.arch).toBeTruthy();
        expect(fieldsAndArch.toolbar).toBeTruthy();
        expect(fieldsAndArch.type).toBe("form");
        expect(fieldsAndArch.view_id).toBe(97);
      });
      test("must be able to star/unstar an item", async () => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const menu = new Model("ir.ui.menu", c);
        const menuItem = (
          await menu.read({
            ids: [87],
          })
        )[0];

        const action = menuItem.starred ? "unstar" : "star";
        await menu.execute({
          payload: [87],
          action,
        });

        const menuItemUpdated = (
          await menu.read({
            ids: [87],
          })
        )[0];
        const expectedValue = action === "star" ? true : false;
        expect(menuItemUpdated.starred).toBe(expectedValue);
      });
    });
    describe("when writing", () => {
      test("must update name field for an user", async (done) => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const userModel = new Model("res.users", c);
        const newName = "test " + Date.now().toString();

        await userModel.write({
          ids: [6],
          values: { name: newName },
        });

        const updatedUser = (
          await userModel.read({
            ids: [6],
          })
        )[0];

        expect(updatedUser.name).toBe(newName);
        done();
      });
    });
    describe("when creating", () => {
      test("must get new id for new object", async (done) => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const userModel = new Model("giscedata.switching.xml.encoding", c);

        const randName = "test " + Date.now().toString();

        const newId = await userModel.create({
          values: {
            acronim: randName,
            name: randName,
          },
        });

        const newObject = (
          await userModel.read({
            ids: [newId],
          })
        )[0];

        expect(newObject.name).toBe(randName);
        done();
      });
    });
    describe("when deleting", () => {
      test("must get true when removing a new item", async (done) => {
        const c = new Client(process.env.ERP_HOST);
        c.setDatabase(process.env.ERP_DB!);

        const token = await c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const userModel = new Model("giscedata.switching.xml.encoding", c);

        const randName = "test " + Date.now().toString();

        const newId = await userModel.create({
          values: {
            acronim: randName,
            name: randName,
          },
        });

        await userModel.delete({
          ids: [newId],
        });

        const removedObject = await userModel.read({
          ids: [newId],
        });

        expect(removedObject.length).toBe(0);
        done();
      });
    });
  });
});
