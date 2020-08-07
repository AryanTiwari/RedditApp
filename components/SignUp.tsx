import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

const SignUp = () => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.borderlessHeader,
      headerTitle: "",
    });
  });

  const navigation = useNavigation();

  var email = "";
  var username = "";
  var password = "";
  var checkPassword = "";

  return (
    <View style={styles.topView}>
      <Text style={{ fontSize: 16, marginTop: 100 }}>
        Sign up for Reddit Clone
      </Text>
      <TextInput
        textContentType="emailAddress"
        onChangeText={(input) => (email = input)}
        placeholder="Email"
        style={styles.textInputs}
      />
      <TextInput
        onChangeText={(input) => (username = input)}
        placeholder="Username"
        style={styles.textInputs}
      />
      <TextInput
        textContentType="password"
        onChangeText={(input) => (password = input)}
        placeholder="Password"
        style={styles.textInputs}
      />
      <TextInput
        onChangeText={(input) => (checkPassword = input)}
        placeholder="Re-enter Password"
        style={styles.textInputs}
      />
      <TouchableOpacity
        onPress={() => {
          if (checkPassword === password) {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
              });
            firebase
              .firestore()
              .collection("users")
              .doc()
              .set({ Email: email.toLowerCase(), Username: username });

            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
              });
            navigation.navigate("Home");
          } else {
            console.log("passwords dont match");
          }
        }}
        style={styles.createAccountButton}
      >
        <Text style={{ textAlign: "center", color: "white" }}>
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

var styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
  },
  textInputs: {
    height: 30,
    width: 260,
    textAlign: "center",
    marginTop: 30,
    borderRadius: 20,
    fontSize: 15,
    backgroundColor: "#F4F4F4",
  },
  createAccountButton: {
    height: 30,
    width: 260,
    marginTop: 30,
    borderRadius: 20,
    backgroundColor: "#81D1FF",
    justifyContent: "center",
  },
  borderlessHeader: {
    backgroundColor: "white",
    borderBottomColor: "white",
    borderBottomWidth: 0,
    shadowColor: "transparent",
  },
});

export default SignUp;
