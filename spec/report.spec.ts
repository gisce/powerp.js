import { Client } from "../lib/client";
import { Report } from "../lib/Report";
import * as dotenv from "dotenv";
import { test, expect, describe } from "vitest";

dotenv.config();

describe("A Report", () => {
  test("must create a new report and fetch status", async (done) => {
    const c = new Client();
    c.setHost(process.env.ERP_HOST!);
    c.setDatabase(process.env.ERP_DB!);

    const token = await c.loginAndGetToken({
      user: process.env.ERP_USER!,
      password: process.env.ERP_PASSWORD!,
    });
    expect(token).toBeTruthy();

    const report = new Report(c);

    const result = await report.create({
      name: "report_preus_annex",
      ids: [4],
      datas: {
        model: "wizard.pricelist.report.lead",
        context: {
          active_id: 54,
          active_ids: [54],
          date: "2021-06-25",
          pricelist: 23,
          tarifa: 25,
        },
      },
      context: { active_id: 54, active_ids: [54] },
    });

    expect(result).toBeTruthy();

    const reportState = await report.get({
      id: result,
    });

    expect(reportState.state).toBeDefined();
    expect(reportState.state).toBeFalsy();
  });
});
