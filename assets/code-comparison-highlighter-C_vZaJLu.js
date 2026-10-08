import{L as e,d as t,ut as n,y as r}from"./runtime-core.esm-bundler-De2lc3Ib.js";import{t as i}from"./CodeComparison-L0SevWmH.js";var a=`function greet(name) {
  // Say hello
  return 'Hello, ' + name + '!'
}`,o=`const greet = (name: string) => {
  // Say hello
  return \`Hello, \${name}!\`
}`,s=r({__name:`code-comparison-highlighter`,setup(r){let s=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`),c=e=>`<pre><code>${s(e).replace(/(\/\/.*$)|('[^']*'|`[^`]*`)|\b(const|function|return|string)\b/gm,(e,t,n)=>`<span class="${t?`text-muted-foreground italic`:n?`text-emerald-600 dark:text-emerald-400`:`text-rose-600 dark:text-rose-400`}">${e}</span>`).split(`
`).map(e=>`<span class="line">${e}</span>`).join(`
`)}</code></pre>`;return(r,s)=>(e(),t(n(i),{"before-code":a,"after-code":o,language:`typescript`,filename:`greet.ts`,highlighter:c}))}});export{s as default};