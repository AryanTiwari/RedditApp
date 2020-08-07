import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoadingScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.borderlessHeader,
      headerTitle: "",
    });
  });

  return (
    <View style={styles.viewBox}>
      <Text style={{ fontSize: 25 }}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  borderlessHeader: {
    backgroundColor: "white",
    borderBottomColor: "white",
    borderBottomWidth: 0,
    shadowColor: "transparent",
  },
  viewBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default LoadingScreen;
