import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 5, // Jumlah virtual users
    duration: '120s', // Durasi pengujian
};

export default function () {
    http.get('http://caesarnuari.online'); // Ganti PORT dengan port aplikasi Anda
    sleep(10);
}