import { test, expect, describe, beforeEach, afterEach } from "vitest";
import nock from "nock";
import { JSONStringify } from "json-with-bigint";
import { Client } from "../lib/client";
import { Model } from "../lib/model";

const TEST_HOST = "https://test.example.com/api";
const TEST_DB = "test_db";
const TEST_TOKEN = "test_token";

describe("BigInt precision handling", () => {
  let client: Client;

  beforeEach(() => {
    client = new Client();
    client.setHost(TEST_HOST);
    client.setDatabase(TEST_DB);
    client.setToken(TEST_TOKEN);
    client.setClientHeader("test-client");
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("when receiving large integer IDs from server", () => {
    test("should preserve precision for IDs larger than Number.MAX_SAFE_INTEGER", async () => {
      const largeId = "4614633174927389872";
      const largeIdAsBigInt = BigInt(largeId);

      expect(largeIdAsBigInt > BigInt(Number.MAX_SAFE_INTEGER)).toBe(true);

      nock(TEST_HOST).post("/object").reply(200, `[${largeId}]`, {
        "Content-Type": "application/json",
      });

      const model = new Model("test.model", client);
      const result = await model.search({ params: [] });

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(largeIdAsBigInt);
    });

    test("should preserve precision for multiple large IDs", async () => {
      const largeIds = [
        "4614633174927389872",
        "4614633173427389842",
        "4614633171927389812",
        "4614633170427389782",
        "4614633168927389752",
      ];

      nock(TEST_HOST)
        .post("/object")
        .reply(200, `[${largeIds.join(",")}]`, {
          "Content-Type": "application/json",
        });

      const model = new Model("test.model", client);
      const result = await model.search({ params: [] });

      expect(result).toHaveLength(5);
      largeIds.forEach((id, index) => {
        expect(result[index]).toBe(BigInt(id));
      });
    });

    test("should preserve precision in read response objects", async () => {
      const largeId = "4614633174927389872";
      const responseJson = `[{"id":${largeId},"name":"test_record","value":42.5}]`;

      nock(TEST_HOST).post("/object").reply(200, responseJson, {
        "Content-Type": "application/json",
      });

      const model = new Model("test.model", client);
      const result = await model.read({
        ids: [BigInt(largeId)],
        fields: ["name", "value"],
      });

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(BigInt(largeId));
      expect(result[0].name).toBe("test_record");
      expect(Number(result[0].value)).toBe(42.5);
    });
  });

  describe("when sending large integer IDs to server", () => {
    test("should serialize BigInt IDs correctly", () => {
      const largeId = BigInt("4614633174927389872");

      const payload = [
        "execute",
        "db",
        "token",
        "tok",
        "model",
        "write",
        [largeId],
        { name: "test" },
      ];

      const serialized = JSONStringify(payload);

      expect(serialized).toContain("4614633174927389872");
      expect(serialized).not.toContain("4614633174927390000");
    });

    test("should complete full round-trip with large IDs", async () => {
      const largeId = "4614633174927389872";

      nock(TEST_HOST).post("/object").reply(200, `[${largeId}]`, {
        "Content-Type": "application/json",
      });

      const model = new Model("test.model", client);
      const searchResult = await model.search({ params: [] });

      expect(searchResult[0]).toBe(BigInt(largeId));

      nock(TEST_HOST).post("/object").reply(200, "[true]", {
        "Content-Type": "application/json",
      });

      const writeResult = await model.write({
        id: searchResult[0] as unknown as number,
        values: { name: "updated" },
      });

      expect(writeResult[0]).toBe(true);
    });
  });

  describe("regular numbers should still work", () => {
    test("should handle normal-sized IDs as numbers", async () => {
      const normalId = 12345;

      nock(TEST_HOST).post("/object").reply(200, `[${normalId}]`, {
        "Content-Type": "application/json",
      });

      const model = new Model("test.model", client);
      const result = await model.search({ params: [] });

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(normalId);
    });

    test("should handle Number.MAX_SAFE_INTEGER as regular number", async () => {
      const maxSafeInt = Number.MAX_SAFE_INTEGER;

      nock(TEST_HOST).post("/object").reply(200, `[${maxSafeInt}]`, {
        "Content-Type": "application/json",
      });

      const model = new Model("test.model", client);
      const result = await model.search({ params: [] });

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(maxSafeInt);
    });
  });
});
