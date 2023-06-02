import { format } from "../index";

describe('format' , () => {
  it("format(specifier)(number) returns a string", () => {
    expect(typeof format("d")(0)).toBe("string");
  });

  it("format(specifier).toString() returns the normalized specifier", () => {
    expect(format("d") + "").toBe(" >-d");
  });

  it("format(specifier) throws an error for invalid formats", () => {
    expect(() => { format("foo"); }).toThrow(/invalid format: foo/);
    expect(() => { format(".-2s"); }).toThrow(/invalid format: \.-2s/);
    expect(() => { format(".f"); }).toThrow(/invalid format: \.f/);
  });

  it("format(\",.\") unreasonable precision values are clamped to reasonable values", () => {
    expect(format(".30f")(0)).toBe("0.00000000000000000000");
    expect(format(".0g")(1)).toBe("1");
  });

  it("format(\"s\") handles very small and very large values", () => {
    expect(format("s")(Number.MIN_VALUE)).toBe("0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005y");
    expect(format("s")(Number.MAX_VALUE)).toBe("179769000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000Y");
  });

  it("format(\"n\") is equivalent to format(\",g\")", () => {
    expect(format("n")(123456.78)).toBe("123,457");
    expect(format(",g")(123456.78)).toBe("123,457");
  });

  it("format(\"012\") is equivalent to format(\"0=12\")", () => {
    expect(format("012")(123.456)).toBe("00000123.456");
    expect(format("0=12")(123.456)).toBe("00000123.456");
  });
});
