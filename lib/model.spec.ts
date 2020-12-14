import { Client } from "./client";
import { Model } from "./model";
require("dotenv").config();

describe("A Model", () => {
  describe("Calling methods", () => {
    describe("when searching", () => {
      test("must accept a search args", async (done) => {
        const token = await Client.loginAndGetToken({
          host: process.env.ERP_HOST!,
          database: process.env.ERP_DB!,
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        });
        expect(token).toBeTruthy();

        const result = await Model.search(
          {
            model: "res.partner",
            params: [["id", "=", "1"]],
          },
          {
            host: process.env.ERP_HOST!,
            database: process.env.ERP_DB!,
            token,
          }
        );
        expect(result.length).toBe(1);
        done();
      });
    });
  });
  describe("when creating", () => {
    test("must create a new record", async (done) => {
      const token = await Client.loginAndGetToken({
        host: process.env.ERP_HOST!,
        database: process.env.ERP_DB!,
        user: process.env.ERP_USER!,
        password: process.env.ERP_PASSWORD!,
      });
      expect(token).toBeTruthy();
      const result = await Model.create(
        {
          model: "res.partner",
          values: { name: "GISCE" },
        },
        {
          host: process.env.ERP_HOST!,
          database: process.env.ERP_DB!,
          token,
        }
      );
      expect(result).toBeGreaterThan(0);
      done();
    });
  });
});
