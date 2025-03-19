---
title: "Pengalaman Load Testing Website dengan k6: Analisis Performa di Server Minim"
date: "2025-01-31"
creator: "Caesar Nuari"
description: "Artikel pertama saya di Astro"
category: "Technology"
layout: "../../layouts/BlogLayoutV2.astro"
---
Pada artikel ini saya akan membagikan pengalaman saya pertama kali mencoba menggunakan tools load testing k6. saya melakukan test ke web yang saya bangun yaitu web ini, dan saya menggunakan data real yang saya uji sendiri tapi untuk kontent dibawah ini selanjutnya akan ditulis oleh AI yaitu deepseek dengan model deepseek-R1 selamat membaca
Mengapa Load Testing Penting?

![gambar terminal k6 saat load test](https://engineeringsampel.com/test-with-k6.png)

Sebagai developer yang membangun website sendiri, saya menyadari pentingnya memastikan aplikasi bisa menangani trafik yang diharapkan. Meski website ini masih dalam pengembangan, saya memutuskan melakukan load testing menggunakan k6 untuk mengukur sejauh mana server VPS 1 CPU dan 2GB RAM bisa bertahan. Tools k6 dipilih karena kemudahan integrasinya dengan script JavaScript dan laporannya yang detail.

Spesifikasi Website dan Lingkungan Testing

Server : VPS 1vCPU, 2GB RAM
Tech Stack : AstroJS (Mode Middleware + Node Adapter)
Metode Testing: 3 Skenario: 10, 100, dan 1000 Virtual User (VU) Durasi: Setiap skenario dijalankan selama 30 detik.

Hasil Load Testing & Analisis

### 1. 10 Virtual Users: Performa Optimal
Rata-rata Durasi Request: 126.54 ms, Request per Detik (RPS): 8.62/sError Rate: 0%, Analisis: Dengan 10 VU, server merespons dengan sangat baik. Nilai p95 (percentile 95) di 225 ms menunjukkan mayoritas request selesai di bawah 225 ms. indikator yang bagus untuk server low-end. Tidak ada failed request, dan latency masih stabil. Catatan Teknis:Waktu TLS handshake cukup rendah (rata-rata 4.61 ms), menandakan koneksi HTTPS tidak membebani server.Idle time server masih tinggi, artinya resource (CPU/RAM) belum terpakai maksimal.

### 2. 100 Virtual Users: Lonjakan Latency yang Signifikan
Rata-rata Durasi Request: 2.19 detik, RPS: 30.36/sError Rate: 0% Analisis: Begitu VU dinaikkan ke 100, performa server turun drastis. Rata-rata durasi request melambat 17x lipat, dengan p95 mencapai 2.79 detik. Ini menunjukkan server mulai kelebihan beban. Penyebab Potensial: Bottleneck Database: Karena MySQL di-host terpisah, latency jaringan mungkin berkontribusi pada peningkatan durasi request. Limitasi CPU: Dengan 1vCPU, server kesulitan menangani 30+ request/sec secara parallel. AstroJS Middleware Overhead: Mode Node Adapter pada AstroJS mungkin kurang optimal untuk concurrent requests tinggi.


### 3. 1000 Virtual Users: Server Hampir Kolaps
Rata-rata Durasi Request: 6 detik RPS: 96.26/s Error Rate: 0% Analisis: Di skenario ekstrem ini, server masih bisa menangani semua request tanpa error, tapi respons sangat lambat. Beberapa temuan mencolok: TLS Handshaking: Rata-rata 2.64 detik. indikasi server kewalahan melakukan negosiasi SSL/TLS untuk koneksi baru. HTTP Req Blocked: p90 mencapai 12.13 detik, artinya 10% request menunggu lebih dari 12 detik sebelum diproses. Iteration Duration: Beberapa request memakan waktu hingga 25 detik! Mengapa Tidak Ada Error? Kemungkinan besar karena k6 hanya mengukur timeout default (biasanya 60 detik). Jika durasi request melebihi 30 detik, mungkin sudah dianggap gagal. Namun, dalam kasus ini, semua request selesai sebelum timeout. Rekomendasi Optimisasi Berdasarkan hasil testing, berikut rekomendasi untuk meningkatkan performa: Optimisasi Database: Pindahkan MySQL ke server yang sama dengan aplikasi untuk mengurangi latency jaringan. Gunakan connection pooling untuk mengurangi overhead koneksi ke DB. Scale-Up Server: Upgrade ke VPS dengan minimal 2vCPU dan 4GB RAM. AstroJS Configuration: Pertimbangkan menggunakan static site generation jika memungkinkan, atau optimisasi middleware dengan caching. Reverse Proxy & TLS Termination: Gunakan Nginx sebagai reverse proxy untuk menangani TLS handshake, mengurangi beban di aplikasi Node.js. Load Balancing:Jika trafik tinggi diharapkan, distribusi beban ke beberapa instance server bisa jadi solusi.

Load testing dengan k6 memberikan gambaran jelas tentang batas server saat ini. Meski server low-end mampu menangani 10-100 VU dengan acceptable latency, lonjakan ke 1000 VU menunjukkan perlunya optimisasi infrastruktur. Skalabilitas bukan hanya tentang hardware, tapi juga arsitektur aplikasi dan konfigurasi. Bagi developer pemula, tools seperti k6 sangat direkomendasikan untuk memahami perilaku aplikasi di bawah tekanan. Jangan ragu bereksperimen dan happy coding!

Referensi :

* Dokumentasi K6
* Astrojs Development Guide
* Deepseek AI