import {db} from "../utils/mysql/index"
import {content} from "../models/mysql/schema"

export async function GET({ site }) {
    // Ambil semua dynamic routes
    const contents = await db.select().from(content)
    //console.log("test sitemap")

  
    const staticRoutes = [
      '/',
      '/about',
      '/beranda',
    ];
  
    // Gabungkan semua routes (statis + dinamis)
    const allRoutes = [
      ...staticRoutes,
      ...contents.map(route => `/creator/read/${route.id}`),
    ];
  
    // Buat format XML untuk sitemap
    const sitemap = 
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allRoutes.map((url) => `
    <url>
        <loc>https://caesarnuari.online${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
    </url>`
    ).join('')}
</urlset>`

    return new Response(sitemap, {
        status: 200,
        headers: { "Content-Type": "text/xml;charset=UTF-8" },
    })
  }