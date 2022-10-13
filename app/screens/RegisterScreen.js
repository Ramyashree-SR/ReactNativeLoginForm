import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { interpolate } from "react-native-reanimated";

export default function RegisterScreen({ navigation }) {
  const [registerData, setRegisterData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  let updateChange = (val, input) => {
    setRegisterData({
      ...registerData,
      [input]: val,
    });
  };

  const [FirstNameError, setFirstNameError] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");

  let FirstNameValidation = () => {
    if (registerData.FirstName) {
      let regex = /^[a-zA-Z ]{2,30}$/;
      if (regex.test(registerData.FirstName)) {
        setFirstNameError("");
        return true;
      } else {
        setFirstNameError("*Enter valid FirstName");
      }
    } else {
      setFirstNameError("Firstname required");
      return false;
    }
  };
  let LastNameValidation = () => {
    if (registerData.LastName) {
      let regex = /^[a-zA-Z ]{2,30}$/;
      if (regex.test(registerData.LastName)) {
        setLastNameError("");
        return true;
      } else {
        setLastNameError("*Enter valid LastName");
      }
    } else {
      setLastNameError("Lastname required");
      return false;
    }
  };

  let EmailValidation = () => {
    if (registerData.Email) {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regex.test(registerData.Email)) {
        setEmailError("");
        return true;
      } else {
        setEmailError("*Enter valid Email");
      }
    } else {
      setEmailError("Email required");
      return false;
    }
  };

  let PasswordValidation = () => {
    if (registerData.Password) {
      let regex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;
      if (regex.test(registerData.Password)) {
        setPasswordError("");
        return true;
      } else {
        setPasswordError("*Enter valid Password");
      }
    } else {
      setPasswordError("Password required");
      return false;
    }
  };

  let saveData = () => {
    FirstNameValidation();
    LastNameValidation();
    EmailValidation();
    PasswordValidation();
    if (
      FirstNameValidation() &&
      LastNameValidation() &&
      EmailValidation() &&
      PasswordValidation()
    ) {
      navigation.navigate("Login");

      setRegisterData({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
      });
      alert("Registered Successfully");
    }
  };

  return (
    <View style={styles.container}>
      <View>
      <Image
          source={require("../assets/hubird.jpg")}
          style={styles.logo}
          height="70"
        />
        <Text style={styles.texts}>Register</Text>
      </View>

      <View style={styles.contentView}>
        <View style={styles.inputView}>
          <Text> Enter FirstName</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Firstname."
            placeholderTextColor="#003f5c"
            value={registerData.FirstName}
            onChangeText={(val) => updateChange(val, "FirstName")}
          />
          {FirstNameError && (
            <Text style={styles.errormsg}>{FirstNameError}</Text>
          )}
        </View>

        <View style={styles.inputView}>
          <Text> Enter LastName</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Lastname."
            placeholderTextColor="#003f5c"
            value={registerData.LastName}
            onChangeText={(val) => updateChange(val, "LastName")}
          />
          {LastNameError && (
            <Text style={styles.errormsg}>{LastNameError}</Text>
          )}
        </View>

        <View style={styles.inputView}>
          <Text> Enter Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email."
            placeholderTextColor="#003f5c"
            value={registerData.Email}
            onChangeText={(val) => updateChange(val, "Email")}
          />
          {EmailError && <Text style={styles.errormsg}>{EmailError}</Text>}
        </View>

        <View style={styles.inputView}>
          <Text> Enter Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            value={registerData.Password}
            onChangeText={(val) => updateChange(val, "Password")}
          />
          {PasswordError && (
            <Text style={styles.errormsg}>{PasswordError}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.btnText} onPress={saveData}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    backgroundColor: "#1A9415",
    // borderColor: "#1A9415",
    color: "white",
    borderRadius: 5,
    borderWidth: 1,
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:150
  },
  errormsg: {
    color: "red",
  },
  inputView: {
    width: 300,
    height: 60,
    borderRadius: "10px",
    marginBottom: 20,
  },
   logo: {
    marginTop: 15,
    width: 100,
    height: 100,
    borderRadius: 10,
    backfaceVisibility: "hidden",
  },
  texts: {
    fontSize: 30,
    marginBottom: 40,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    justifyContent: "center",
  },
});
