import { test, expect, describe, afterEach } from "vitest";
import nock from "nock";
import { Client } from "../lib/client";

const TEST_HOST = "https://test-server.example.com";

describe("X-Request-Id Header", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test("should include X-Request-Id header in requests", async () => {
    let capturedRequestId: string | undefined;

    nock(TEST_HOST)
      .post("/db")
      .reply(function () {
        capturedRequestId = this.req.headers["x-request-id"] as string;
        return [200, JSON.stringify(["testdb"])];
      });

    const client = new Client();
    client.setHost(TEST_HOST);

    await client.getDatabases();

    expect(capturedRequestId).toBeDefined();
    expect(typeof capturedRequestId).toBe("string");
    expect(capturedRequestId!.length).toBeGreaterThan(0);
  });

  test("should generate unique X-Request-Id for each request", async () => {
    const capturedRequestIds: string[] = [];

    nock(TEST_HOST)
      .post("/db")
      .times(3)
      .reply(function () {
        capturedRequestIds.push(this.req.headers["x-request-id"] as string);
        return [200, JSON.stringify(["testdb"])];
      });

    const client = new Client();
    client.setHost(TEST_HOST);

    await client.getDatabases();
    await client.getDatabases();
    await client.getDatabases();

    expect(capturedRequestIds.length).toBe(3);
    // All IDs should be unique
    const uniqueIds = new Set(capturedRequestIds);
    expect(uniqueIds.size).toBe(3);
  });

  test("should include X-Request-Id alongside other custom headers", async () => {
    let capturedHeaders: Record<string, string> = {};

    nock(TEST_HOST)
      .post("/db")
      .reply(function () {
        capturedHeaders = {
          "x-request-id": this.req.headers["x-request-id"] as string,
          "x-gisce-client": this.req.headers["x-gisce-client"] as string,
          "x-gisce-session": this.req.headers["x-gisce-session"] as string,
        };
        return [200, JSON.stringify(["testdb"])];
      });

    const client = new Client();
    client.setHost(TEST_HOST);
    client.setClientHeader("test-client");
    client.setSessionId("test-session-id");

    await client.getDatabases();

    expect(capturedHeaders["x-request-id"]).toBeDefined();
    expect(capturedHeaders["x-gisce-client"]).toBe("test-client");
    expect(capturedHeaders["x-gisce-session"]).toBe("test-session-id");
  });

  test("X-Request-Id should be nanoid format (21 chars, URL-safe)", async () => {
    let capturedRequestId: string | undefined;

    nock(TEST_HOST)
      .post("/db")
      .reply(function () {
        capturedRequestId = this.req.headers["x-request-id"] as string;
        return [200, JSON.stringify(["testdb"])];
      });

    const client = new Client();
    client.setHost(TEST_HOST);

    await client.getDatabases();

    expect(capturedRequestId).toBeDefined();
    // nanoid default length is 21
    expect(capturedRequestId!.length).toBe(21);
    // nanoid uses URL-safe alphabet: A-Za-z0-9_-
    expect(capturedRequestId).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});
