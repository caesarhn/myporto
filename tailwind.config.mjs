/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		screens: {
			sm: '300px',
			md: '1000px',
			lg: '1500px',
			xl: '2040px',
		},
		extend: {
			spacing: {
				'128': '36rem',
				'144': '40rem',
			},
			colors: {
				'no-hightlight': '#6b7280',
			},
		},
	},
	plugins: [
		require('flowbite/plugin'),
	],
}
