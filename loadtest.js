import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10, // Jumlah virtual users
    duration: '10s', // Durasi pengujian
};

export default function () {
    http.get('https://engineeringsampel.com/beranda'); // Ganti PORT dengan port aplikasi Anda
    sleep(10);
}