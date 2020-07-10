import React from "react";

import {
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const PostImage = () => {
  const navigation = useNavigation();

  const test = () => {
    console.log("test");
  };

  const selectCategory = () => {
    navigation.navigate("CategorySelect");
  };

  return (
    <View style={{ alignItems: "center", flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity
        onPress={() => selectCategory()}
        style={{
          height: 30,
          borderWidth: 1,
          width: 300,
          marginTop: 30,
          justifyContent: "center",
          borderRadius: 10,
          borderColor: "gray",
        }}
      >
        <Text style={{ textAlign: "center", color: "gray" }}>Choose Topic</Text>
      </TouchableOpacity>
      <TextInput style={styles.titleInput} placeholder="Title"></TextInput>
      <TouchableOpacity onPress={() => test()} style={styles.imageUploadBox}>
        <Image
          style={styles.uploadIcon}
          source={require("./icons/upload-solid.png")}
        />
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

var styles = StyleSheet.create({
  titleInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 300,
    textAlign: "center",
    marginTop: 30,
    borderRadius: 10,
  },
  imageUploadBox: {
    height: 140,
    borderWidth: 1,
    width: 300,
    borderRadius: 10,
    marginTop: 30,
    borderColor: "gray",
    justifyContent: "center",
  },
  uploadIcon: {
    height: 40,
    width: 40,
    alignSelf: "center",
    tintColor: "gray",
  },
  uploadText: {
    marginTop: 10,
    alignSelf: "center",
    color: "gray",
  },
});

export default PostImage;
