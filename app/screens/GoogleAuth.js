import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "422244294098-ulkiervqlqe2m3u4gi201e4tlvv1taiq.apps.googleusercontent.com",
  });

  useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "Sucessfull") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userInfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      <View style={styles.userInfo}>
        <Image source={{ uri: userInfo.picture }} style={styles.profile} />
        <Text>Welcome {userInfo.name}</Text>
        <Text>{userInfo.email}</Text>
      </View>;
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Image
        source={require("../assets/googleimage.jpg")}
        style={styles.googleicon}
      />

      <Button
        title={accessToken ? "Get user data" : "Sign in with Google"}
        onPress={
          accessToken
            ? getUserData
            : () => {
                promptAsync({ showInRecents: true });
              }
        }
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 70,
    flexDirection: "row",
  },
  googleicon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
