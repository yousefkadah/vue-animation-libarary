var e=`<script setup lang="ts">
import { AvatarCircles } from '@/components/ui/avatar-circles'

const avatars = ['jack', 'jill', 'john', 'jane', 'jenny', 'james'].map((name) => ({
  imageUrl: \`https://avatar.vercel.sh/\${name}\`,
  profileUrl: '#',
}))
<\/script>

<template>
  <AvatarCircles :num-people="99" :avatar-urls="avatars" />
</template>
`;export{e as default};