/* eslint-disable no-console */
export const GetContextPath = (loc) => {
  let ctx = loc.pathname.split("/")?.[1] || "maximo";
  if (ctx === 'oslc' || ctx === 'ui') return '';
  return ctx;
};

export const GetDefaultPath = (loc) => {
  let ctx = GetContextPath(loc);
  if (!ctx) return `/ui/`;
  return `/${ctx}/ui/`;
};

