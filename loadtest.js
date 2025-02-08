import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10, // Jumlah virtual users
    duration: '12s', // Durasi pengujian
};

export default function () {
    http.get('https://engineeringsampel.com/Caesar%20Nuari/read/3081a1af-1ca5-434b-8bf1-f78c3275c2a2'); // Ganti PORT dengan port aplikasi Anda
    sleep(10);
}