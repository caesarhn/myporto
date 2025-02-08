import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 100, // Jumlah virtual users
    duration: '12s', // Durasi pengujian
};

export default function () {
    http.get('https://engineeringsampel.com/creator/read/b0aa10d2-bc54-4c21-95d2-c8f6f53a8ed1'); // Ganti PORT dengan port aplikasi Anda
    sleep(10);
}