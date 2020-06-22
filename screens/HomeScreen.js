import React from 'react'
import { View, Text, Button, Image } from 'react-native'
import cafe from '../assets/images/cafe.jpg'

function Home({ navigation, route }) {
  const handlePress = () => {
    navigation.navigate("Reservation")
  }
  const handlePressBook = () => {
    navigation.navigate("Profile")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to BeanSean Restaurant!</Text>
      <Image source={cafe} style={styles.image} />
      <View style={styles.button}>
        <Button
          title="Make Reservation" onPress={handlePress} />
      </View>
      <View style={styles.button}>
        <Button
          title="Check Bookings" onPress={handlePressBook} />
      </View>
    </View>
  )
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  header: {
    fontSize: 20,
    margin: 3,
    fontWeight: 'bold',
    marginTop: 50
  },
  image: {
    width: 400,
    height: 300,
    margin: 20,
    borderRadius: 10
  },
  button: {
    borderRadius: 5,
    width: 200,
    margin: 10
  }

}

export default Home
