import { Client } from "../lib/client";
const axios = require("axios");
require("dotenv").config();

describe("A PowERP Client", () => {
  describe("When initializing", () => {
    test("should receive host, database", () => {
      const c = new Client(process.env.ERP_HOST);
      expect(c.hasOwnProperty("host")).toBeTruthy();
      expect(c.host).toBe(process.env.ERP_HOST);

      c.setDatabase(process.env.ERP_DB!);
      expect(c.hasOwnProperty("database")).toBeTruthy();
      expect(c.database).toBe(process.env.ERP_DB);

      expect(c.token).toBeUndefined();
    });

    test("should fail if we don't set a host in constructor", () => {
      const undefinedConstructor = () => {
        const c = new Client("");
      };

      expect(undefinedConstructor).toThrow("A host is required");
    });

    test("should receive token externally", () => {
      const c = new Client(process.env.ERP_HOST);
      c.setToken("test-token");
      expect(c.hasOwnProperty("token")).toBeTruthy();
      expect(c.token).toBe("test-token");
    });

    test("should create an axios instance if not set", () => {
      const c = new Client(process.env.ERP_HOST);
      expect(c.axiosInstance).toBeTruthy();
    });

    test("should receive an axios instance if set", () => {
      const c = new Client(process.env.ERP_HOST);
      const axiosApiInstance = axios.create();
      c.setAxiosInstance(axiosApiInstance);
      expect(c.axiosInstance).toBe(axiosApiInstance);
    });

    test("should allow login", async (done) => {
      const c = new Client(process.env.ERP_HOST);
      c.setDatabase(process.env.ERP_DB!);

      const token = await c.loginAndGetToken({
        user: process.env.ERP_USER!,
        password: process.env.ERP_PASSWORD!,
      });
      expect(token).toBeTruthy();
      done();
    });

    test("should not allow login with invalid credentials", async () => {
      const c = new Client(process.env.ERP_HOST);
      c.setDatabase(process.env.ERP_DB!);

      await expect(
        c.loginAndGetToken({
          user: process.env.ERP_USER!,
          password: "invalidPassword",
        })
      ).rejects.toEqual("Invalid User/Login");
    });

    test("should refresh token", async () => {
      const c = new Client(process.env.ERP_HOST);
      c.setDatabase(process.env.ERP_DB!);
      const token = await c.loginAndGetToken({
        user: process.env.ERP_USER!,
        password: process.env.ERP_PASSWORD!,
      });

      expect(c.token).toBe(token);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const refreshedToken = await c.refreshToken(token);
      expect(c.token).toEqual(refreshedToken);
      expect(refreshedToken.length > 1).toBeTruthy();
      expect(token !== refreshedToken).toBeTruthy();
    });
  });

  describe("Before login", () => {
    test("should be able to get list of db's", async (done) => {
      const c = new Client(process.env.ERP_HOST);
      const dbs: Array<string> = await c.getDatabases();

      expect(Array.isArray(dbs)).toBe(true);
      expect(dbs.length).toBeGreaterThan(0);
      done();
    });

    test("should be able to get server version", async (done) => {
      const c = new Client(process.env.ERP_HOST);
      const serverVersion: string = await c.getServerVersion();
      expect(serverVersion).toBeTruthy();
      done();
    });

    test("should be able to get login message", async (done) => {
      const c = new Client(process.env.ERP_HOST);
      const loginMessage: string = await c.getLoginMessage();
      expect(typeof loginMessage).toBe("string");
      done();
    });
  });
});
