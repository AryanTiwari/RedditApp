import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

const Login = () => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.borderlessHeader,
      headerTitle: "",
    });
  });

  const navigation = useNavigation();

  // CHANGE THIS, DELETE
  var email = "powerdrgn@gmail.com";
  var password = "Password1";

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <View style={styles.topView}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, marginTop: 200 }}>
          Login to Reddit Clone
        </Text>
        <TextInput
          onChangeText={(input) => (email = input)}
          placeholder="Email"
          style={styles.emailBox}
          //CHANGE THIS, DELETE
          value="powerdrgn@gmail.com"
        />
      </View>
      <TextInput
        onChangeText={(input) => (password = input)}
        placeholder="Password"
        style={styles.passwordBox}
        // CHANGE THIS, DELETE
        value="Password1"
      />
      <TouchableOpacity style={styles.loginButton} onPress={() => signIn()}>
        <Text style={{ textAlign: "center", color: "white" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

var styles = StyleSheet.create({
  topView: { flex: 1, backgroundColor: "white", alignItems: "center" },
  emailBox: {
    height: 30,
    width: 260,
    textAlign: "center",
    marginTop: 50,
    borderRadius: 20,
    fontSize: 15,
    backgroundColor: "#F4F4F4",
  },
  passwordBox: {
    height: 30,
    width: 260,
    textAlign: "center",
    marginTop: 50,
    borderRadius: 20,
    fontSize: 15,
    backgroundColor: "#F4F4F4",
  },
  loginButton: {
    height: 30,
    width: 260,
    backgroundColor: "lightblue",
    marginTop: 200,
    borderRadius: 20,
    justifyContent: "center",
  },
  borderlessHeader: {
    backgroundColor: "white",
    borderBottomColor: "white",
    borderBottomWidth: 0,
    shadowColor: "transparent",
  },
});

export default Login;
