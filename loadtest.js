import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 100, // Jumlah virtual users
    duration: '120s', // Durasi pengujian
};

export default function () {
    http.get('https://pengaduan-mpp.lampungselatankab.go.id/'); // Ganti PORT dengan port aplikasi Anda
    sleep(1);
}