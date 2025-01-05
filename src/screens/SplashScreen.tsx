import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { screenHeight, screenWidth } from "../utils/Constants";
import splashImage from "../assets/images/g.png"
import { resetAndNavigate } from "../utils/NavigationUtils";
const SplashScreen = () => {

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      resetAndNavigate("HomeScreen")
    }, 1000);
    return () => clearTimeout(splashTimer)
  }, [])

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.7,
    resizeMode: "center"
  }
})


export default SplashScreen;
