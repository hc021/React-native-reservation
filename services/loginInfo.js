import axios from 'axios';
export function SendLogin(tokenemail, tokenpassword) {
    return axios.post(`https://t4rms.azurewebsites.net/api/reservations/Login?email=${tokenemail}&password=${tokenpassword}`)
}

