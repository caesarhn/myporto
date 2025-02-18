import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10, // Jumlah virtual users
    duration: '12s', // Durasi pengujian
};

export default function () {
    http.get('https://engineeringsampel.com'); // Ganti PORT dengan port aplikasi Anda
    sleep(10);
}