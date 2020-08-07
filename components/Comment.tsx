import React from "react";

import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

//@ts-ignore
const Comment = (props) => {
  var db = firebase.firestore();
  const navigation = useNavigation();

  const reply = () => {
    console.log(props);
  };

  const like = () => {
    props.changeReplyingTo();
    console.log(props);
    db.collection("comments")
      .doc(props.id)
      .update({ Likes: firebase.firestore.FieldValue.increment(1) });
  };

  const profile = () => {
    console.log(props.poster);
    navigation.navigate("Profile", { user: props.poster });
  };

  return (
    <View style={{ marginLeft: 15 }}>
      <TouchableWithoutFeedback onPress={() => profile()}>
        <Text>{props.poster} • 2h</Text>
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
        <TouchableOpacity onPress={() => reply()}>
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <Image
              source={require("./icons/reply-solid.png")}
              style={{ height: 20, width: 20, marginLeft: 8 }}
            />
            <Text style={{ marginLeft: 10, marginTop: 2 }}>Reply</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;
