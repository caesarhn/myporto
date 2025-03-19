import { defineConfig} from 'astro/config'
import vue from '@astrojs/vue'
// import node from '@astrojs/node'
import tailwind from "@astrojs/tailwind"
// import { defineCollection, z } from 'astro:content'

// const blogCollection = defineCollection({
//   schema: z.object({
//     title: z.string(),
//     date: z.date(),
//     description: z.string(),
//     layout: z.string().optional(),
//   }),
// })

export default defineConfig({
  output: 'static',
  // output: 'server',
  // adapter: node({
  //   mode: 'middleware'
  // }),
  trailingSlash: 'never',
  redirects: {
    "/content-test": "/portofolio/test",
    "/apalah": "/artic/test"
  },
  // content: {
  //   collections: {
  //     blog: blogCollection,
  //   },
  // },
  integrations: [
    vue(),
    tailwind(),]
});