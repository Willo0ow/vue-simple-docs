import l from"path";import{cosmiconfig as c}from"cosmiconfig";var s=c("docs"),a={sourceDir:"template/src/components",outputDir:"docs"},f=async()=>{let o=await s.search("docs.config");return o&&o.config?o.config:{...a}},i=f;import r from"fs";import d from"path";function n(o){r.existsSync(o)&&r.readdirSync(o).forEach(t=>{let e=d.join(o,t);r.lstatSync(e).isDirectory()?(n(e),r.rmdirSync(e)):r.unlinkSync(e)})}(async()=>{let o=await i();try{let t=l.join(o.outputDir,"src","generated");n(t),console.log(`Generated data deleted from ${t}`)}catch(t){console.error(`Unable to delete generated data: ${t}`)}})();
