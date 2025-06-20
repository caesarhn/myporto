---
title: "My First Astro Project"
date: "2025-01-26"
creator: "Caesar Nuari"
profile_img: "/caesar-profile.webp"
description: "this is my first project with AstroJs, also the project was evolve and adapt to this website"
category: "Technology"
preview_image: "/content/landingpage.webp"
link: "/content/caesar-nuari/ai-berpihak-pada-orang-kaya"
layout: "../../../layouts/BlogLayoutV2.astro"
---
I want to share my story about building a content-driven website. I named it ENGINEERING SAMPLE. I also made some TikTok videos with the same account name. This is my first web project that I have written by myself. stack i used :

![astrojs image](https://cdn.buttercms.com/xrVbfdR5TBy4iTaY4xl7 "heyaa")
### 1. AstroJs
I learned about this JavaScript framework from my friend, and he was excited to talk about it, especially the island architecture, which is one of the key advantages offered by this framework. Astro is designed for content-driven websites, as stated on Astro's official website. By default, Astro generates all content as a static site during the build process, and I think that might be why Astro is quite lightweight for my small server. Astro is a full-stack JavaScript framework, so I can use any front-end JavaScript framework like VueJS or ReactJS in specific parts that require more front-end processing. During the integration process between Astro and the front-end framework in this case, I used VueJS. I was really excited and happy, even though I encountered many problems. But those challenges helped me understand more about web development. (Sorry, this is my first Astro project!)

### 2. VueJS
I used this framework because it was the first front-end JavaScript framework I learned, so I'm familiar with it. In my project, I used VueJS for the content writing feature because VueJS made this feature easier to write than using raw JavaScript.

### 3. Golang
Time and again, the reason I use Golang is because it's lightweight, simple, and fast, requiring minimal resources from my server. I created some API endpoints to upload data to my database. In fact, Astro can directly read from and write to the database, but since I used VueJS to upload content via API, I needed Golang to handle it. Additionally, I use Golang to manage file uploads, such as photos, to the server.

### 4. Tailwind

There is no specific reason why I used Tailwind for my project. I had never used a CSS framework before, and Tailwind sounded fast and simple, even though I didn't know its actual performance. So far, I have no complaints about this CSS framework.

### 5. Sqlite

At first, I used SQLite because it is a lightweight yet powerful database for my small project. Since I wanted to deploy my project on a VPS server, budget was the main reason I chose SQLite it's serverless, so no large resources are needed.
Astro has a built-in database called AstroDB, but it requires the Astro Studio service and has limited access. When I tried to set up AstroDB to use a local file-based database, I failed and couldn't figure out the issue. So, I went back to using SQLite and Drizzle to handle query operations. Next is my summary of building this project from the ground up to where it is now. This project is unfinished and still far from being complete. Consider it as being in the alpha version.

### 1. setup and choosing stack

I skipped this process because I didn't choose a stack for my project; instead, I chose the project for my stack. This means I just wanted to create a project with AstroJS and learn it.

### 2. exploring astrojs

The first thing I did was explore the flow of this framework, including the directory structure, components, page routing, etc. Before I chose the stack I use now, I tried various frameworks like React, PureCSS, and Sass. Astro can be built to a few outputs: static for a fully static site, server for server-side rendering, and hybrid for using both. In the server output, we can choose an adapter like Node, Vercel, or Netlify to run Astro's SSR (Server-Side Rendering) feature. I also tried running Astro on Bun, but I'm not sure if Astro was truly running on the Bun runtime because... (it's very difficult for me to describe it).

### 3. security

I used a built-in feature called Astro Middleware, which works similarly to middleware in other backend technologies to check and create login sessions. By default, Astro Middleware is executed when we create a file named middleware.js in the root directory of the Astro project. By utilizing Astro Middleware, I added authentication to handle user accounts, a login feature, set session cookies, and edit routing or redirect requests. However, I am now facing an issue: how to set public and non-public endpoints, because the content endpoints are dynamic. It's impossible to manually write all the paths in Astro Middleware.

### 4. database problem

Initially, I used SQLite with Better-SQLite3 and Drizzle because I found an article referring to it as a 'tiny stack' (Astro, Drizzle, SQLite). However, since I was using cPanel hosting, which didn't allow me to modify the OS environment, I encountered problems with SQLite; it didn't work. I then tried AstroDB, but faced new issues. I couldn't get AstroDB to work with a local file-based database, and when I attempted to use Astro Studio, I didn't have access and it had limited functionality. Eventually, I upgraded to a VPS server and returned to using SQLite. Before switching back, I tried using PostgreSQL, but since my VPS server only has 2GB of RAM, I thought that might not be sufficient. So, that's the current progress of my project. You can check out my project at http://engineeringsampel.com. I will update you on the next developments in the following post. Thank You.