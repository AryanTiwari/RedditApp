import React from "react";

import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import * as firebase from "firebase";

//@ts-ignore
const Messages = (props) => {
  var db = firebase.firestore();

  const reply = () => {
    console.log("reply");
  };

  const like = () => {
    console.log("like");
    db.collection("posts")
      .doc(props.postId)
      .collection("comments")
      .doc(props.id)
      .update({ Likes: firebase.firestore.FieldValue.increment(1) });
  };

  const profile = () => {
    console.log("profile");
  };

  return (
    <View style={{ marginLeft: 15 }}>
      <TouchableWithoutFeedback onPress={() => profile()}>
        <Text>Gang Member • 2h</Text>
      </TouchableWithoutFeedback>
      <Text style={{ marginTop: 8 }}>{props.passedComment}</Text>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TouchableOpacity onPress={() => like()}>
          <Image
            source={require("./icons/thumbs-up-regular.png")}
            style={{ height: 20, width: 20 }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 5, marginRight: 5, marginTop: 3 }}>
          {props.likes}
        </Text>
        <TouchableWithoutFeedback onPress={() => reply()}>
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <Image
              source={require("./icons/reply-solid.png")}
              style={{ height: 20, width: 20, marginLeft: 8 }}
            />
            <Text style={{ marginLeft: 10, marginTop: 2 }}>Reply</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Messages;
