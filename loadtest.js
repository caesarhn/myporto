import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1000, // Jumlah virtual users
    duration: '30s', // Durasi pengujian
};

export default function () {
    http.get('http://localhost/creator/read/3081a1af-1ca5-434b-8bf1-f78c3275c2a2'); // Ganti PORT dengan port aplikasi Anda
    sleep(1);
}