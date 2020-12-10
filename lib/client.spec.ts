import { Client } from "./client";
require("dotenv").config();

describe("A PowERP Client", () => {
  describe("When initializing", () => {
    test("should receive host, database", () => {
      const c = new Client(process.env.ERP_HOST!, process.env.ERP_DB!);
      expect(c.hasOwnProperty("host")).toBeTruthy();
      expect(c.host).toBe(process.env.ERP_HOST!);
      expect(c.hasOwnProperty("database")).toBeTruthy();
      expect(c.database).toBe(process.env.ERP_DB!);
      expect(c.hasOwnProperty("token")).toBeTruthy();
      expect(c.token).toBeNull();
    });
  });

  test("should allow login", async (done) => {
    const c = new Client(process.env.ERP_HOST!, process.env.ERP_DB!);
    await c.login(process.env.ERP_USER!, process.env.ERP_PASSWORD!);
    expect(c.token).toBeTruthy();
    done();
  });
});
