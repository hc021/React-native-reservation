import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from "react-native-slider";
import { sendReservationInfo } from '../services/reservationInfo'

function ReservationScreen() {
    const [dateTime, setDateTime] = useState(new Date('2020-06-20T09:30:00'));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [guests, setGuests] = useState(1)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('');
    //Datepicker contoller
    const onHandleChange = (event, selectedDate) => {
        const currentDatfirstNamee = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDateTime(currentDatfirstNamee);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const onSubmitPress = () => {
        const reservationObject = {
            ReservationTime: dateTime,
            firstName,
            lastName,
            PhoneNumber,
            email,
            guests
        }
        sendReservationInfo(reservationObject)
            .then(res => {
                setMessage("Booking successfully");
                console.log(res);
            })
            .catch(reject => setMessage("Choose another time"))
    }
    return (
        <View style={styles.container}>
            <View style={styles.date}>
                <Button onPress={showDatepicker} title="Pick a Date" />
                <Text style={styles.text}>You choose Date: {dateTime.getFullYear()}.{dateTime.getMonth() + 1}.{dateTime.getDate()}</Text>
            </View>
            <View style={styles.time}>
                <Button onPress={showTimepicker} title="Pick a Time" />
                <Text style={styles.text}>You choose Time: {dateTime.toString().substring(16, 21)}</Text>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={dateTime}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onHandleChange}
                />)
            }
            <View style={styles.guests}>
                <Text style={styles.text}>Number of Guests : {guests} {guests > 1 ? "People" : "Person"}</Text>
                <Slider
                    value={guests}
                    onValueChange={value => setGuests(value)}
                    maximumValue={12}
                    minimumValue={1}
                    step={1}
                    minimumTrackTintColor="#0275d8"
                    maximumTrackTintColor="#808080"
                    thumbTintColor="#0275d8"
                />
            </View>
            <View>
                <View style={styles.inputView}>
                    <Text style={styles.label}>FirstName:</Text>
                    <TextInput style={styles.input} value={firstName} onChangeText={e => setFirstName(e)} placeholder="e.g John" />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.label}>LastName:</Text>
                    <TextInput style={styles.input} value={lastName} onChangeText={e => setLastName(e)} placeholder="e.g Smith" />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.label}>Phone:</Text>
                    <TextInput style={styles.input} value={PhoneNumber} onChangeText={e => setPhoneNumber(e)} placeholder="00-0000 0000" />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput style={styles.input} value={email} onChangeText={e => setEmail(e)} placeholder="example@gmail.com" />
                </View>
            </View>
            <View style={styles.button}>
                <Button title="Sumbit" onPress={onSubmitPress} />
            </View>
            <Text style={styles.success}>
                {message}
            </Text>
        </View>

    )
}
const styles = {
    container: {
        flex: 1,
        margin: 10
    },
    date: {
        marginTop: 20,
    },
    time: {
        marginTop: 20,
    },
    guests: {
        marginTop: 20,
    },
    inputView: {
        flexDirection: "row",
        marginTop: 15

    },
    text: {
        fontSize: 18,
    },
    label: {
        fontSize: 18,
        width: 120
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: 10,
        fontSize: 20,
        width: '100%'
    },
    button: {
        borderRadius: 5,
        marginTop: 30
    },
    success: {
        textAlign: 'center',
        fontSize: 18,
    }
}

export default ReservationScreen
