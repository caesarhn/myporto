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
			fontFamily: {
				'lato': ['Lato', 'sans-serif'],
			}
		},
	},
	plugins: [
		require('flowbite/plugin'),
		require("@tailwindcss/typography"),
		function ({ addUtilities }) {
			addUtilities({
				'.no-scrollbar': {
					/* Sembunyikan scrollbar untuk browser WebKit seperti Chrome, Safari, dan Opera */
					'-webkit-overflow-scrolling': 'touch',
					'scrollbar-width': 'none', /* Firefox */
					'&::-webkit-scrollbar': {
						display: 'none', /* WebKit */
					},
				},
			});
		},
	],
}
  
