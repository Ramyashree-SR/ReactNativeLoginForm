import React, { useState } from "react";
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../component/AuthContext";
import GoogleAuth from "./GoogleAuth";
// import CheckBox from '@react-native-community/checkbox';

function LoginForm({ navigation }) {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  let updateChange = (val, input) => {
    setUserData({
      ...userData,
      [input]: val,
    });
  };

  const [userNameerror, setUserNameerror] = useState("");
  const [passworderror, setPassworderror] = useState("");

  let userNameValidation = () => {
    if (userData.userName) {
      let regex = /^[a-zA-Z ]{2,30}$/;
      if (regex.test(userData.userName)) {
        setUserNameerror("");
        return true;
      } else {
        setUserNameerror("*Enter valid userName");
      }
    } else {
      setUserNameerror("Username required");
      return false;
    }
  };

  let passwordValidation = () => {
    if (userData.password) {
      let regex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;
      if (regex.test(userData.password)) {
        setPassworderror("");
        return true;
      } else {
        setPassworderror("*Enter valid password");
      }
    } else {
      setPassworderror("password required");
      return false;
    }
  };

  let submit = () => {
    userNameValidation();
    passwordValidation();
    if (userNameValidation() && passwordValidation()) {
      let data = [userData.userName, userData.password];
      navigation.navigate("DrawerScreen", data);
      setUserData({
        userName: "",
        password: "",
      });
      // Alert.alert("Logged in Successfully");
    }
  };

  let saveData = () => {
    navigation.navigate("Register");
  };

  const { Login } = React.useContext(AuthContext);

  const LoginHandle = () => {
    Login(userName, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image
          source={require("../assets/hubird.jpg")}
          style={styles.logo}
          height="70"
        />
        <Text style={styles.texts}>Login Form</Text>
      </View>

      <StatusBar style="auto" />
      <View style={styles.contentView}>
        <View style={styles.inputView}>
          <Text> Enter UserName</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Username."
            placeholderTextColor="#003f5c"
            value={userData.userName}
            onChangeText={(val) => updateChange(val, "userName")}
          />
          {userNameerror && (
            <Text style={styles.errormsg}>{userNameerror}</Text>
          )}
        </View>

        <View style={styles.inputView}>
          <Text> Enter Password</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={userData.password}
            onChangeText={(val) => updateChange(val, "password")}
          />
          {passworderror && (
            <Text style={styles.errormsg}>{passworderror}</Text>
          )}
        </View>
      </View>

      <View style={styles.btncontent}>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() => {
            submit();
            LoginHandle(userData.userName, userData.password);
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnText} onPress={saveData}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>

      <View>
        <GoogleAuth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btncontent: {
    flexDirection: "row",
  },
  buttonstyle: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    width: 100,
    height: 50,
    backgroundColor: "#1A9415",
    justifyContent: "center",
    color: "white",
  },
  btnText: {
    // borderColor: "#1A9415",
    backgroundColor: "#1A9415",
    color: "white",
    borderRadius: 5,
    borderWidth: 1,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 40,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 150,
  },
  contentView: {
    marginBottom: 10,
  },
  errormsg: {
    color: "red",
  },
  logo: {
    marginTop: 15,
    width: 100,
    height: 100,
    borderRadius: 10,
    backfaceVisibility: "hidden",
  },
  inputView: {
    width: 300,
    height: 60,
    borderRadius: "10px",
    marginBottom: 40,
  },
  main: {
    alignItems: "center",
    marginBottom: 30,
  },
  texts: {
    fontSize: 30,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    justifyContent: "center",
  },
});
export default LoginForm;
