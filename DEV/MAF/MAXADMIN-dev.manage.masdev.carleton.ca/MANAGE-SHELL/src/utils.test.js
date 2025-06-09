import { GetDefaultPath } from "./utils";

it("GetContextPath", async () => {
    expect(GetDefaultPath({pathname: ''})).toBe("/maximo/ui/");
});

it("GetContextPath with ui", async () => {
    expect(GetDefaultPath({ pathname: '/ui/webclient' })).toBe("/ui/");
});

it("GetContextPath with graphite rootr", async () => {
    expect(GetDefaultPath({ pathname: '/oslc/graphite' })).toBe("/ui/");
});

it("GetContextPath with maximo ui ui", async () => {
    expect(GetDefaultPath({ pathname: '/maximo/ui/webclient' })).toBe("/maximo/ui/");
});