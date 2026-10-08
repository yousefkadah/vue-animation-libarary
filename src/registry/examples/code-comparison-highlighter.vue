<script setup lang="ts">
import { CodeComparison, type CodeComparisonHighlighter } from '@/components/ui/code-comparison'

const beforeCode = `function greet(name) {
  // Say hello
  return 'Hello, ' + name + '!'
}`

const afterCode = `const greet = (name: string) => {
  // Say hello
  return \`Hello, \${name}!\`
}`

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Any highlighter that returns Shiki-shaped HTML works — e.g. Shiki's own `codeToHtml`.
 * This tiny one colours comments, strings and keywords.
 */
const highlighter: CodeComparisonHighlighter = (code) => {
  const token = /(\/\/.*$)|('[^']*'|`[^`]*`)|\b(const|function|return|string)\b/gm
  const lines = escapeHtml(code)
    .replace(token, (match, comment, text) => {
      const color = comment ? 'text-muted-foreground italic' : text ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
      return `<span class="${color}">${match}</span>`
    })
    .split('\n')
    .map((line) => `<span class="line">${line}</span>`)
  return `<pre><code>${lines.join('\n')}</code></pre>`
}
</script>

<template>
  <CodeComparison
    :before-code="beforeCode"
    :after-code="afterCode"
    language="typescript"
    filename="greet.ts"
    :highlighter="highlighter"
  />
</template>
