import { Client } from "./client";
require("dotenv").config();

describe("A PowERP Client", () => {
  describe("When initializing", () => {
    test("should allow login", async (done) => {
      const token = await Client.loginAndGetToken({
        host: process.env.ERP_HOST!,
        database: process.env.ERP_DB!,
        user: process.env.ERP_USER!,
        password: process.env.ERP_PASSWORD!,
      });
      expect(token).toBeTruthy();
      done();
    });
  });
});
