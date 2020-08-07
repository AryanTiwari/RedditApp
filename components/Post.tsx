import React from "react";

import * as firebase from "firebase";
import "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

//@ts-ignore
const Post = (props) => {
  const navigation = useNavigation();
  var db = firebase.firestore();

  const navigate = () => {
    navigation.navigate("PostScreen", {
      title: props.title,
      likes: props.likes,
      comments: props.comments,
      poster: props.poster,
      category: props.category,
      post: props.post,
      id: props.id,
      currentUser: props.currentUser,
    });
  };

  const post = () => {
    console.log(props.id);
    navigate();
  };

  const like = () => {
    console.log(props);
    // db.collection("users")
    //   .where("Email", "==", firebase.auth().currentUser?.email)
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log("Error getting documents: ", error);
    //   });
    db.collection("posts")
      .doc(props.id)
      .update({ Likes: firebase.firestore.FieldValue.increment(1) });
  };

  const comment = () => {
    console.log(props.comments);
    navigate();
  };

  const category = () => {
    console.log(props.category);
    navigation.navigate("CategoryScreen", { category: props.category });
  };

  const user = () => {
    console.log("the poster is " + props.poster);
    navigation.navigate("Profile", { user: props.poster });
  };

  return (
    <View style={{ width: Dimensions.get("window").width }}>
      <TouchableWithoutFeedback
        onPress={() => post()}
        style={{
          marginTop: 10,
        }}
      >
        <View>
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() => category()}
              style={styles.category}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                {props.category}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={{ marginTop: 2 }} onPress={() => user()}>
                <Text style={{ color: "gray" }}> {props.poster} </Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", marginTop: 2 }}> · 1hr </Text>
            </View>
          </View>
          <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 8 }}>
            {props.title}
          </Text>
          <Text style={{ marginLeft: 15, marginTop: 8, marginRight: 15 }}>
            {props.post}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => like()}>
          <Image
            style={styles.likeButton}
            source={require("./icons/thumbs-up-regular.png")}
          />
        </TouchableOpacity>
        <Text style={styles.likeNumber}>{props.likes}</Text>
        <TouchableOpacity onPress={() => comment()}>
          <Image
            style={styles.commentButton}
            source={require("./icons/comment-regular.png")}
          />
        </TouchableOpacity>
        <Text style={styles.commentNumber}>{props.comments}</Text>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 10,
  },
  category: {
    width: 80,
    height: 20,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#42A2FB",
  },
  likeButton: {
    height: 20,
    width: 20,
    marginLeft: 15,
    marginTop: 10,
    tintColor: "gray",
  },
  likeNumber: {
    marginTop: 13,
    fontSize: 13,
    color: "gray",
    marginLeft: 8,
  },
  commentButton: {
    height: 20,
    width: 20,
    marginTop: 10,
    marginLeft: 15,
    tintColor: "gray",
  },
  commentNumber: {
    marginTop: 13,
    fontSize: 13,
    color: "gray",
    marginLeft: 8,
  },
});

export default Post;
