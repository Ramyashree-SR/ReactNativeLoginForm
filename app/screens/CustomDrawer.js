import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../component/AuthContext";

export default function CustomDrawer(props) {
  const [value, setValue] = useState();

  let getData = async () => {
    try {
      let datas = await AsyncStorage.getItem("userData");
      let parsedData = JSON.parse(datas);
      console.log("parsedData", parsedData);
      if (value !== null) setValue(parsedData);
      console.log(datas);
      console.log(value);
    } catch (err) {
      alert("Failed to get Data");
    }
  };

  useEffect(() => {
    getData(), console.log(value);
  }, []);

  let backToLogin = async () => {
    try {
      await AsyncStorage.clear();
      props.navigation.navigate("Login");
    } catch (err) {
      alert("Storage not Cleared");
    }
  };

  const { Logout } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={styles.main}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1619296740635-5d0a8afcc221?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybCUyMGFsb25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
              }}
              style={styles.profile}
            />
            <View style={styles.data}>
              <Text>{value}</Text>
              <Text>ramyashee.sr@gmail.com</Text>
            </View>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        onPress={() => {
          backToLogin();
          Logout();
        }}
        style={styles.comeout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    postion: "fixed",
  },
  comeout: {
    backgroundColor: "#9BD6EF",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 10,
    fontSize: 30,
    alignItems: "center",
    height: 30,
    justifyContent: "center",
  },
  data: {
    marginTop: 40,
    marginLeft: -140,
    color: "#FFFFF",
    textShadowColor: "#FFFFFF",
  },
  main: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    padding: 40,
    backgroundColor: "#9BD6EF",
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 150,
  },
});
//E8AAF7, 65EFE1,9A0303 ,9BD6EF
