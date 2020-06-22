import Axios from "axios";
// import { TokenStore } from '../services/token';
import AsyncStorage from '@react-native-community/async-storage';

//edit
export const GetBooking = async () => {

    const token = await AsyncStorage.getItem('token');
    console.log("getToken", token)
    return Axios.get(`https://localhost:44359/api/reservations/CustomerReservations`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })


}


