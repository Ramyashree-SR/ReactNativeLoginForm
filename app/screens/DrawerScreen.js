import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";

import CustomDrawer from "./CustomDrawer";
import HomePage from "./HomePage";
import Notification from "./Notification";
import TabNavigation from "./TabNavigation";

const Drawer = createDrawerNavigator();
function DrawerScreen(props) {
  console.log("drawerProps", props);
  let arrData = props.route.params;
  let setData = async () => {
    try{
    await AsyncStorage.setItem("userData", JSON.stringify(arrData));
    alert('Data successfully saved')
    }catch(err){
      alert('Failed to save the data to the storage')
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerstyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: "",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={HomePage} name="Home" />
      <Drawer.Screen component={Notification} name="Notification" />
      <Drawer.Screen component={TabNavigation} name="TabNavigation" />
    </Drawer.Navigator>
  );
}

export default DrawerScreen;
