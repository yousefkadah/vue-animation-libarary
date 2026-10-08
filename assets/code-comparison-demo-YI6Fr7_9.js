import{L as e,d as t,ut as n,y as r}from"./runtime-core.esm-bundler-De2lc3Ib.js";import{t as i}from"./CodeComparison-CDhXaKl4.js";var a=`<script>
export default {
  data() {
    return { count: 0 } // [!code highlight]
  },
  computed: {
    double() { // [!code highlight]
      return this.count * 2 // [!code highlight]
    }, // [!code highlight]
  },
  methods: {
    increment() {
      this.count++
    },
  },
  mounted() {
    console.log(\`count is \${this.count}\`)
  },
}
<\/script>

<template>
  <button @click="increment">{{ count }} × 2 = {{ double }}</button>
</template>`,o=`<script setup>
import { computed, onMounted, ref } from 'vue' // [!code ++]
import { useCounter } from './useCounter' // [!code --]

const count = ref(0) // [!code focus]
const double = computed(() => count.value * 2) // [!code focus]
const increment = () => count.value++

onMounted(() => {
  console.log(\`count is \${count.value}\`)
})
<\/script>

<template>
  <button @click="increment">{{ count }} × 2 = {{ double }}</button>
</template>`,s=r({__name:`code-comparison-demo`,setup(r){return(r,s)=>(e(),t(n(i),{"before-code":a,"after-code":o,language:`vue`,filename:`Counter.vue`,"light-theme":`github-light`,"dark-theme":`github-dark`,"highlight-color":`rgba(101, 117, 133, 0.16)`}))}});export{s as default};