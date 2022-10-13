import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import LoginForm from "./app/screens/LoginForm";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./app/screens/HomePage";
import DrawerScreen from "./app/screens/DrawerScreen";
import TabNavigation from "./app/screens/TabNavigation";
import RegisterScreen from "./app/screens/RegisterScreen";
import SplashScreen from "./app/screens/SplashScreen";
import { useEffect, useMemo, useReducer } from "react";
import { AuthContext } from "./component/AuthContext";

const Stack = createNativeStackNavigator();
export default function App() {
  // const [isLoading, setisLoading] = useState(true);
  // const [userToken, setuserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    useName: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "Retrieve_Token":
        return {
          ...prevState,
          isLoading: false,
        };
      case "Login":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "Logout":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "Register":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      Login: (userName, password) => {
        // setuserToken("asdfg");
        // setisLoading(false);
        let userToken;
        userName = null;
        if (userName == "Ramya" && password == "Silenc24") {
          userToken = "asdfg";
        }
        dispatch({ type: "Login", id: userName, token: userToken });
      },

      Logout: () => {
        // setuserToken(null);
        // setisLoading(false);
        dispatch({ type: "Login" });
      },

      Register: () => {
        // setuserToken("asdfg");
        // setisLoading(false);
        dispatch({type:"Register",id:userName,token:userToken})
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      // setisLoading(false);
      dispatch({ type: "Register", token: "asdfg" });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Stack.Navigator initialRouteName={SplashScreen}>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Login"
              component={LoginForm}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="DrawerScreen"
              component={DrawerScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: true,
              }}
            ></Stack.Screen>
            {/* <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen> */}
          </Stack.Navigator>
        ) : (
          <HomePage />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
