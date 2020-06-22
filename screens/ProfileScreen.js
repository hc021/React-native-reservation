import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { GetBooking } from '../services/bookingList'
function ProfileScreen({ route, navigation }) {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        //need to change to token
        GetBooking()
            .then(res => {
                setBookings(res.data);
                console.log(res.data)
            })
            .catch(reject => console.log(reject))
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello, Member!</Text>
            {bookings.length > 0 ?
                <FlatList data={bookings}
                    renderItem={({ item }) =>
                        <View style={styles.lists}>
                            <Text style={styles.text}>OrderID: {item.id}</Text>
                            <Text style={styles.text}>Date: {new Date(item.dateTime).getFullYear()}-{new Date(item.dateTime).getMonth() + 1}-{new Date(item.dateTime).getDate()}</Text>
                            <Text style={styles.text}>Time: {new Date(item.dateTime).getHours()}:{new Date(item.dateTime).getMinutes() < 10 ? "0" + new Date(item.dateTime).getMinutes() : new Date(item.dateTime).getMinutes()}</Text>
                            <Text style={styles.text}>Guests: {item.guests}</Text>
                            <Text style={styles.text}>Status: {item.description}</Text>
                            <Text style={styles.text}>Type: {item.sittingType}</Text>
                        </View>
                    }
                    keyExtractor={item => item.id.toString()}
                />
                :
                <View style={styles.noList}>
                    <Text style={styles.text}>There is no reservaion!</Text>
                </View>
            }


        </View>
    )
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: "#fffff",
        margin: 10

    },
    title: {
        fontSize: 20,
    },
    lists: {
        flex: 1,
        borderWidth: 2,
        borderColor: "#0275d8",
        marginTop: 10,

    },
    noList: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "#0275d8",
        marginTop: 10,
        height: 200


    },
    text: {
        fontSize: 17
    },
}
export default ProfileScreen
