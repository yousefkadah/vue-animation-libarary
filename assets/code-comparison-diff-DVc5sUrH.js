import{L as e,d as t,ut as n,y as r}from"./runtime-core.esm-bundler-De2lc3Ib.js";import{t as i}from"./CodeComparison-CDhXaKl4.js";var a=`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
  }
}`,o=`@tailwind base; /* [!code --] */
@tailwind components; /* [!code --] */
@tailwind utilities; /* [!code --] */
@import "tailwindcss"; /* [!code ++] */

@theme inline { /* [!code ++] */
  --color-background: var(--background); /* [!code ++] */
  --color-foreground: var(--foreground); /* [!code ++] */
} /* [!code ++] */

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
}`,s=r({__name:`code-comparison-diff`,setup(r){return(r,s)=>(e(),t(n(i),{"before-code":a,"after-code":o,language:`css`,filename:`globals.css`}))}});export{s as default};