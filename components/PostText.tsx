import React, { useState } from "react";

import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

//@ts-ignore
const PostText = ({ route }) => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  var category = "Choose Category";
  try {
    console.log(route.params.data);
    category = route.params.data;
  } catch (err) {
    console.log(err);
  }

  const navigation = useNavigation();
  var db = firebase.firestore();

  const submitPost = () => {
    if (category !== "Choose Category" && title !== "" && post !== "") {
      db.collection("posts").doc().set({
        Category: category,
        Comments: 0,
        Likes: 0,
        Post: post,
        Title: title,
      });
      navigation.navigate("Home");
    } else {
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => submitPost()}
        >
          <Image
            style={{ height: 25, width: 25, tintColor: "#2395FF" }}
            source={require("./icons/check-solid.png")}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={{
              height: 20,
              width: 20,
              tintColor: "#646464",
              marginLeft: 20,
            }}
            source={require("./icons/chevron-left-solid.png")}
          />
        </TouchableOpacity>
      ),
    });
  });

  const selectCategory = () => {
    navigation.navigate("CategorySelect");
  };

  return (
    <View style={{ alignItems: "center", flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity
        onPress={() => selectCategory()}
        style={styles.categorySelector}
      >
        <Text style={{ textAlign: "center", color: "gray" }}>{category}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.titleInput}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title"
      ></TextInput>
      <TextInput
        multiline
        onChangeText={(text) => setPost(text)}
        style={styles.postInput}
        placeholder="Your text here (optional)"
      ></TextInput>
    </View>
  );
};

var styles = StyleSheet.create({
  titleInput: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    width: 300,
    textAlign: "center",
    marginTop: 30,
    borderRadius: 10,
    fontSize: 15,
  },
  postInput: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    width: 300,
    textAlign: "center",
    marginTop: 30,
    borderRadius: 10,
    paddingTop: 10,
    fontSize: 15,
  },
  categorySelector: {
    height: 30,
    borderWidth: 1,
    width: 300,
    marginTop: 30,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "gray",
  },
});

export default PostText;
