import React, { useState, useEffect } from "react";

import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Messages from "./Messages";

//@ts-ignore
const PostScreen = ({ route }) => {
  var db = firebase.firestore();
  const navigation = useNavigation();
  const [data, setData] = useState([{}]);

  var comment = "";
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

  const like = () => {
    console.log(route.params.likes);
    return db
      .collection("posts")
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
    db.collection("posts").doc(route.params.id).collection("Comments").add({
      Comment: comment,
      Likes: 0,
    });
    getData();
  };

  const DATA = [{}];

  const getData = () => {
    db.collection("posts")
      .doc(route.params.id)
      .collection("Comments")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //@ts-ignore
          if (!DATA.some((comment) => comment.id === doc.id)) {
            DATA.push({
              id: doc.id,
              comment: (
                <Messages
                  passedComment={doc.data().Comment}
                  likes={doc.data().Likes}
                  id={doc.id}
                  postId={route.params.id}
                />
              ),
            });
          }
        });
      });
    setData(DATA);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
        renderItem={({ item }) => item.comment}
        //@ts-ignore
        keyExtractor={(item) => item.id}
      />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          onChangeText={(text) => (comment = text)}
          placeholder="Comment"
          style={styles.commentBox}
        />
        <TouchableOpacity onPress={() => postComment()}>
          <Image
            style={{ height: 20, width: 20, marginTop: 5 }}
            source={require("./icons/paper-plane-solid.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  commentBox: {
    height: 30,
    width: 350,
    alignSelf: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 9,
    marginLeft: 15,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default PostScreen;
