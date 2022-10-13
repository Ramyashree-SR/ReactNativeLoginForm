import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="go Back" onPress={() => navigation.goBack("Login")} />
      <Button title="go to Drawer" onPress={() => navigation.openDrawer()} />
      <Text>Welcome to Home page</Text>
      <Text>Custom Bottom Tab Navigation !</Text>
    </View>
  );
}

API_URL = "https://mocki.io/v1/ca8e4151-be13-4351-9a11-39ad7c362df5";

export const getCities = () => {
  try {
    async () => {
      const result = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-type": "applictaion/json",
        },
      });
      const json = await result.json();
      if (json) {
        json;
      } else {
        console.log("unable to fetch!");
      }
    };
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  getCities();
}, []);


return(

)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
