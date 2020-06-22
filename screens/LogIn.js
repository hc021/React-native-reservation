import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { SendLogin } from '../services/loginInfo';
// import { TokenStore } from '../services/token';
import AsyncStorage from '@react-native-community/async-storage';
function LogIn({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const handlePress = () => {
        SendLogin(email, password)
            .then(res => {
                if (!res.data.token) {
                    setError("The e-mail address and/or password you specified are not correct.")
                }
                else {
                    // TokenStore.token = res.data.token;
                    console.log("login:", res.data.token)
                    const storeData = async (value) => {
                        try {
                            await AsyncStorage.setItem('token', value)
                        } catch (e) {
                            // saving error
                        }
                    }
                    storeData(res.data.token);
                    setToken(res.data.token);
                    setLogin(true);
                }
            })
            .catch(rej => {
                setError("Network error");
            })
    }
    login ? navigation.navigate("Root") : null;
    return (
        <View style={styles.container}>

            <Text style={styles.text}>Your Email Address</Text>
            <Input
                style={styles.input}
                placeholder="email@address.com"
                leftIcon={
                    <Icon
                        name='user'
                        size={24}
                        color='black'
                    />
                }
                value={email}
                onChangeText={e => setEmail(e)}
            />


            <Text style={styles.text}>Password</Text>
            <Input
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                leftIcon={
                    <FontAwesome name="lock" size={24} color="black" />
                }
                value={password}
                onChangeText={e => setPassword(e)}
            />
            <Text style={styles.error}>{error}</Text>
            <View style={styles.button}>
                <Button title="LOGIN" onPress={handlePress} raised type="solid" />
            </View>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'

    },
    button: {
        width: '90%',
        borderRadius: 5,
        margin: 5,
        backgroundColor: 'red',

    },
    text: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left'
    },
    input: {
        width: "80%"
    },
    error: {
        color: 'red'
    }

}

export default LogIn
