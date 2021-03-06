import React from "react";

import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

const StartScreen = () => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.borderlessHeader,
      headerTitle: "",
    });
  });

  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ alignItems: "center", marginTop: 250, marginBottom: 250 }}>
        <Text style={{ fontSize: 25 }}>Reddit Clone</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.signUpButton}
        >
          <Text style={{ fontSize: 15, color: "white" }}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginButton}
        >
          <Text style={{ fontSize: 15 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpButton: {
    height: 35,
    width: 240,
    borderRadius: 20,
    backgroundColor: "#4AA8FF",
    alignItems: "center",
    marginTop: 50,
    justifyContent: "center",
  },
  loginButton: {
    height: 35,
    width: 240,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    marginTop: 25,
    justifyContent: "center",
  },
  borderlessHeader: {
    backgroundColor: "white",
    borderBottomColor: "white",
    borderBottomWidth: 0,
    shadowColor: "transparent",
  },
});

export default StartScreen;
