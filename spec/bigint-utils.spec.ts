import { test, expect, describe } from "vitest";
import { normalizeBigIntValues } from "../lib/bigint-utils";

describe("normalizeBigIntValues", () => {
  test("should convert BigInt-like objects to BigInt", () => {
    const input = {
      active_id: {
        parsedValue: 4614634274427388000,
        source: "4614634274427387912",
      },
      active_ids: [
        {
          parsedValue: 4614634274427388000,
          source: "4614634274427387912",
        },
      ],
      lang: "ca_ES",
      tz: "Europe/Madrid",
    };

    const result = normalizeBigIntValues(input);

    expect(result.active_id).toBe(BigInt("4614634274427387912"));
    expect(result.active_ids[0]).toBe(BigInt("4614634274427387912"));
    expect(result.lang).toBe("ca_ES");
    expect(result.tz).toBe("Europe/Madrid");
  });

  test("should preserve actual BigInt values", () => {
    const input = {
      id: BigInt("123456789012345678"),
      name: "test",
    };

    const result = normalizeBigIntValues(input);

    expect(result.id).toBe(BigInt("123456789012345678"));
    expect(result.name).toBe("test");
  });

  test("should handle nested objects", () => {
    const input = {
      data: {
        nested: {
          id: {
            parsedValue: 4614634274427388000,
            source: "4614634274427387912",
          },
        },
      },
    };

    const result = normalizeBigIntValues(input);

    expect(result.data.nested.id).toBe(BigInt("4614634274427387912"));
  });

  test("should handle arrays of BigInt-like objects", () => {
    const input = [
      {
        parsedValue: 1000000000000000000,
        source: "1000000000000000001",
      },
      {
        parsedValue: 2000000000000000000,
        source: "2000000000000000002",
      },
    ];

    const result = normalizeBigIntValues(input);

    expect(result[0]).toBe(BigInt("1000000000000000001"));
    expect(result[1]).toBe(BigInt("2000000000000000002"));
  });

  test("should handle null and undefined", () => {
    expect(normalizeBigIntValues(null)).toBe(null);
    expect(normalizeBigIntValues(undefined)).toBe(undefined);
  });

  test("should handle primitive values", () => {
    expect(normalizeBigIntValues(42)).toBe(42);
    expect(normalizeBigIntValues("test")).toBe("test");
    expect(normalizeBigIntValues(true)).toBe(true);
    expect(normalizeBigIntValues(false)).toBe(false);
  });

  test("should fallback to parsedValue if BigInt conversion fails", () => {
    const input = {
      parsedValue: 123,
      source: "not-a-number",
    };

    const result = normalizeBigIntValues(input);

    expect(result).toBe(123);
  });

  test("should handle complex nested structure", () => {
    const input = {
      domain: [
        [
          "previsio_id.id",
          "=",
          {
            parsedValue: 4614634274427388000,
            source: "4614634274427388000",
          },
        ],
      ],
      context: {
        active_id: {
          parsedValue: 4614634274427388000,
          source: "4614634274427387912",
        },
        active_ids: [
          {
            parsedValue: 4614634274427388000,
            source: "4614634274427387912",
          },
        ],
        lang: "ca_ES",
        tz: "Europe/Madrid",
      },
    };

    const result = normalizeBigIntValues(input);

    expect(result.domain[0][2]).toBe(BigInt("4614634274427388000"));
    expect(result.context.active_id).toBe(BigInt("4614634274427387912"));
    expect(result.context.active_ids[0]).toBe(BigInt("4614634274427387912"));
    expect(result.context.lang).toBe("ca_ES");
    expect(result.context.tz).toBe("Europe/Madrid");
  });
});
