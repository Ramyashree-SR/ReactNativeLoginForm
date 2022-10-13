import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

export default function SplashScreen({ navigation }) {
  return (
    <Animatable.View style={styles.container} animation="flash">
      <View stye={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          // duration="1000"
          // delay="0"
          style={styles.logo}
          source={require("../assets/hubird.jpg")}
          resizeMode="stretch"
        />
      </View>

      <View>
        <Text style={styles.title}>Stay Connected with Everyone!</Text>
        <Text style={styles.text}>login to the account</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <LinearGradient
          style={styles.btns}
          colors={["#EF5410", "#2401C3", "#0BBBDE"]}
        >
          <Text style={styles.login}>Get Started</Text>
          <MaterialIcons name="navigate-next" color="#FFF" size={20} />
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  buttonview: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btns: {
    flexDirection: "row",
    width: 130,
    height: 50,
    marginLeft: 160,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#F8BDD4",
  },
  header: {
    width: 300,
  },
  logo: {
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  login: {
    color: "#FFF",
    marginLeft: 2,
    fontSize: 15,
  },
  title: {
    fontSize: 30,
    color: "#9A0303",
  },
  text: {
    color: "grey",
  },
});

//#EE911C,#9A0303,#F17514,#2401C3
