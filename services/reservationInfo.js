import axios from 'axios';

export function sendReservationInfo(reservationObject) {
    return axios.post('https://t4rms.azurewebsites.net/api/reservations/booking', reservationObject);
    debugger;
}