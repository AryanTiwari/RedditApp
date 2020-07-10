import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const navigation = useNavigation();

  var email = "";
  var username = "";
  var password = "";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16, marginTop: 100 }}>
        Sign up for Reddit Clone
      </Text>
      <TextInput
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
        onChangeText={(input) => (password = input)}
        placeholder="Password"
        style={styles.textInputs}
      />
      <TextInput placeholder="Re-enter Password" style={styles.textInputs} />
      <TouchableOpacity
        onPress={() => {
          console.log(email);
          console.log(username);
          console.log(password);
        }}
        style={{
          height: 30,
          width: 260,
          marginTop: 30,
          borderRadius: 20,
          backgroundColor: "#81D1FF",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

var styles = StyleSheet.create({
  textInputs: {
    height: 30,
    width: 260,
    textAlign: "center",
    marginTop: 30,
    borderRadius: 20,
    fontSize: 15,
    backgroundColor: "#F4F4F4",
  },
});

export default SignUp;
