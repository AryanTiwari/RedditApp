import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  Keyboard,
  Animated,
} from "react-native";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Comment from "./Comment";

//@ts-ignore
const PostScreen = ({ route }) => {
  var db = firebase.firestore();
  const navigation = useNavigation();
  const [data, setData] = useState<Array<any>>([]);
  const [commentData, setCommentData] = useState("");
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [commenting, setCommenting] = useState(route.params.title);

  var isFetching = false;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ margin: 20 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            style={{ height: 15, width: 15, tintColor: "#646464" }}
            source={require("./icons/chevron-left-solid.png")}
          />
        </TouchableOpacity>
      ),
      headerTitle: "",
    });
  });

  const DATA: any = [];

  const like = () => {
    console.log(route.params.likes);
    db.collection("posts")
      .doc(route.params.id)
      .update({ Likes: firebase.firestore.FieldValue.increment(1) });
  };

  const commentIcon = () => {
    console.log(route.params.comments);
  };

  const category = () => {
    console.log(route.params.category);
  };

  const user = () => {
    console.log(route.params.poster);
  };

  const postComment = () => {
    db.collection("comments").doc().set({
      Comment: commentData,
      Likes: 0,
      Poster: route.params.currentUser,
      Post: route.params.id,
    });
    setCommentData("");
    getData();
  };

  const getData = () => {
    db.collection("comments")
      .where("Post", "==", route.params.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //@ts-ignore
          if (!DATA.some((comment) => comment.id === doc.id)) {
            DATA.push({
              data: doc.data(),
              id: doc.id,
            });
          }
        });
        setData(DATA);
      });
  };

  //@ts-ignore
  const changeReplyingTo = () => {
    console.log("asdasdasd");
  };

  useEffect(() => {
    getData();
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  //@ts-ignore
  const _keyboardDidShow = (event) => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
    ]).start();
  };

  //@ts-ignore
  const _keyboardDidHide = (event) => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
  };

  var commentingOn = <Text>Commenting on {commenting}</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ width: Dimensions.get("window").width }}>
        <View>
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() => category()}
              style={styles.category}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                {route.params.category}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={{ marginTop: 2 }} onPress={() => user()}>
                <Text style={{ color: "gray" }}> {route.params.poster} </Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", marginTop: 2 }}> · 1hr </Text>
            </View>
          </View>
          <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 8 }}>
            {route.params.title}
          </Text>
          <Text style={{ marginLeft: 15, marginTop: 8, marginRight: 15 }}>
            {route.params.post}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <TouchableOpacity onPress={() => like()}>
            <Image
              style={styles.likeButton}
              source={require("./icons/thumbs-up-regular.png")}
            />
          </TouchableOpacity>
          <Text style={styles.likeNumber}>{route.params.likes}</Text>
          <TouchableOpacity onPress={() => commentIcon()}>
            <Image
              style={styles.commentButton}
              source={require("./icons/comment-regular.png")}
            />
          </TouchableOpacity>
          <Text style={styles.commentNumber}>{route.params.comments}</Text>
        </View>
      </View>
      <FlatList
        data={data}
        onRefresh={() => getData()}
        refreshing={isFetching}
        //@ts-ignore
        renderItem={({ item }) => (
          <Comment
            passedComment={item.data.Comment}
            likes={item.data.Likes}
            id={item.id}
            postId={route.params.id}
            poster={item.data.Poster}
            replyingTo={commenting}
            changeReplyingTo={changeReplyingTo}
          />
        )}
        //@ts-ignore
        keyExtractor={(item) => item.id}
      />

      <Text>{commentingOn}</Text>
      <Animated.View
        style={[styles.commentBox, { paddingBottom: keyboardHeight }]}
      >
        <TextInput
          onChangeText={(text) => setCommentData(text)}
          value={commentData}
          placeholder="Comment"
          style={styles.inputBox}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableOpacity onPress={() => postComment()}>
          <Image
            style={{ height: 25, width: 25, marginTop: 5 }}
            source={require("./icons/paper-plane-solid.png")}
          />
        </TouchableOpacity>
      </Animated.View>
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
  inputBox: {
    height: 35,
    width: 340,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    marginBottom: 10,
    fontSize: 15,
  },
  commentBox: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default PostScreen;
