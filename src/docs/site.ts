export const site = {
  name: 'Vue Magic UI',
  framework: 'Vue',
  npmPackage: '@yousefkadah/vue-magic-ui',
  repository: 'https://github.com/yousefkadah/vue-animation-libarary',
  registryUrl: 'https://yousefkadah.github.io/vue-animation-libarary/r',
  cli: 'shadcn-vue@latest',
  sibling: { name: 'React Magic UI', url: 'https://yousefkadah.github.io/react-animation-library/' },
}

export const packageManagers = ['pnpm', 'npm', 'yarn', 'bun'] as const
export type PackageManager = (typeof packageManagers)[number]

export function runCommand(manager: PackageManager, command: string): string {
  const runner = { pnpm: 'pnpm dlx', npm: 'npx', yarn: 'npx', bun: 'bunx --bun' }[manager]
  return `${runner} ${command}`
}

export function installCommand(manager: PackageManager, packages: string[]): string {
  const verb = { pnpm: 'pnpm add', npm: 'npm install', yarn: 'yarn add', bun: 'bun add' }[manager]
  return `${verb} ${packages.join(' ')}`
}
