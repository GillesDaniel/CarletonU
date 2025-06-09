/**
 * To filter mobile maxvar for a given varname in order of SITE, ORG, SYSTEM hierarchy
 * @param {varname} of maxvars for mobile
 * @param {defDS} is defaultSetDs - Datasource
 */
const filterMobileMaxvars = (varname, defDS) => {
  const typeHierarchy = ["SITE", "ORG", "SYSTEM"];
  let MaxVar = [];
  // istanbul ignore else
  if (defDS.items?.length) {
    MaxVar = defDS.items[0]?.mobilemaxvars
      .filter((item) => item.varname === varname && typeHierarchy.includes(item.vartype))
      .sort((a, b) => {
        return typeHierarchy.indexOf(a.vartype) - typeHierarchy.indexOf(b.vartype);
      });
  }
  return MaxVar;
}
  
  const functions = {
      filterMobileMaxvars
  };
    
  export default functions;