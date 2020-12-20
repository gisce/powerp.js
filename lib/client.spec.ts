import { Client } from "./client";
require("dotenv").config();

describe("A PowERP Client", () => {
  describe("When initializing", () => {
    test("should receive host, database", () => {
      const c = new Client({
        host: process.env.ERP_HOST!,
        database: process.env.ERP_DB!,
      });
      expect(c.hasOwnProperty("host")).toBeTruthy();
      expect(c.host).toBe(process.env.ERP_HOST!);
      expect(c.hasOwnProperty("database")).toBeTruthy();
      expect(c.database).toBe(process.env.ERP_DB!);
      expect(c.hasOwnProperty("token")).toBeTruthy();
      expect(c.token).toBeNull();
    });

    test("should allow login", async (done) => {
      const c = new Client({
        host: process.env.ERP_HOST!,
        database: process.env.ERP_DB!,
      });

      const token = await c.loginAndGetToken({
        user: process.env.ERP_USER!,
        password: process.env.ERP_PASSWORD!,
      });
      expect(token).toBeTruthy();
      done();
    });

    test("should not allow login with invalid credentials", async () => {
      const c = new Client({
        host: process.env.ERP_HOST!,
        database: process.env.ERP_DB!,
      });

      await expect(
        c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: process.env.ERP_PASSWORD!,
        })
      ).rejects.toEqual("Invalid User/Login");
    });
  });
});
