import { describe, expect, it } from "vitest";
import { formatCurrency, formatCompactNumber, formatPercent, timeAgo } from "./utils";

describe("formatCurrency", () => {
  it("formats whole-dollar amounts with no decimals at $1,000+", () => {
    expect(formatCurrency(18720)).toBe("$18,720");
  });

  it("keeps cents for amounts under $1,000", () => {
    expect(formatCurrency(2.4)).toBe("$2.40");
  });
});

describe("formatCompactNumber", () => {
  it("compacts large numbers", () => {
    expect(formatCompactNumber(154200)).toBe("154.2K");
  });
});

describe("formatPercent", () => {
  it("appends exactly one percent sign", () => {
    const result = formatPercent(6.31);
    expect(result).toBe("6.3%");
    expect(result.match(/%/g)).toHaveLength(1);
  });
});

describe("timeAgo", () => {
  it("reports 'just now' for the current instant", () => {
    expect(timeAgo(new Date().toISOString())).toBe("just now");
  });

  it("reports whole hours for a timestamp a few hours back", () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(threeHoursAgo)).toBe("3h ago");
  });
});
