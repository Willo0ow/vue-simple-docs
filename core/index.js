import t from"fs";import j from"fs-extra";import i from"path";import{cosmiconfig as u}from"cosmiconfig";var m=u("docs"),y={sourceDir:"template/src/components",outputDir:"docs"},x=async()=>{let o=await m.search("docs.config");return o&&o.config?o.config:{...y}},p=x;async function C(){let o=await p(),d=i.dirname(__filename),n=i.join(d,".."),a=["public","src",".eslintrc.cjs",".gitignore",".prettierrc.json","env.d.ts","index.html","package.json","README.md","tsconfig.node.json","tsconfig.json","vite.config.ts","lib"],s=i.join(process.cwd(),o.outputDir);t.existsSync(n)||(console.error(`Source directory ${n} does not exist`),process.exit(1)),t.existsSync(s)||(t.mkdirSync(s),console.log(`Created destination directory ${s}`)),t.readdir(n,(e,g)=>{e&&(console.error(e),process.exit(1)),g.forEach(r=>{if(a.includes(r)){let c=i.join(n,r),l=i.join(s,r);j.copy(c,l,f=>{f&&(console.error(f),process.exit(1)),console.log(`Copied ${c}.`)})}})})}C();
