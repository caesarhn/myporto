import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 5, // Jumlah virtual users
    duration: '120s', // Durasi pengujian
};

export default function () {
    http.get('https://engineeringsampel.com/test'); // Ganti PORT dengan port aplikasi Anda
    sleep(1);
}