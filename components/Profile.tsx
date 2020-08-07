import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Post from "./Post";
import Comment from "./Comment";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//@ts-ignore
const Profile = ({ route }) => {
  const [selected, setSelected] = useState(true);
  const [Data, setData] = useState<Array<any>>([]);
  const [postData, setPostData] = useState([{}]);
  const [commentData, setCommentData] = useState([{}]);

  const db = firebase.firestore();
  var isFetching = false;
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.borderlessHeader,
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity
          style={{ margin: 20 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            style={{ height: 20, width: 20, tintColor: "#646464" }}
            source={require("./icons/chevron-left-solid.png")}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ margin: 20 }}
          onPress={() => firebase.auth().signOut()}
        >
          <Image
            style={{ height: 25, width: 25 }}
            source={require("./icons/sign-out-alt-solid.png")}
          />
        </TouchableOpacity>
      ),
    });
  });

  const getPosts = () => {
    var DATA: any = [];
    db.collection("posts")
      .where("Poster", "==", route.params.user)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //@ts-ignore
          if (!DATA.some((post) => post.id === doc.id)) {
            DATA.push({
              data: doc.data(),
            });
          }
        });
      });
    setPostData(DATA);
  };

  const getComments = () => {
    var DATA: any = [];
    db.collection("comments")
      .where("Poster", "==", route.params.user)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          //@ts-ignore
          if (!DATA.some((post) => post.id === doc.id)) {
            DATA.push({
              data: doc.data(),
            });
          }
        });
      });
    setCommentData(DATA);
  };

  var postComments =
    selected === true ? (
      <FlatList
        data={Data}
        //@ts-ignore
        renderItem={({ item }) => (
          <Post
            title={item.data.Title}
            category={item.data.Category}
            poster={item.data.Poster}
            likes={item.data.Likes}
            comments={item.data.Comments}
            post={item.data.Post}
            id={item.data.id}
          />
        )}
        //@ts-ignore
        keyExtractor={(item) => item.id}
      />
    ) : (
      <FlatList
        data={Data}
        //@ts-ignore
        renderItem={({ item }) => (
          <Comment
            passedComment={item.data.Comment}
            likes={item.data.Likes}
            id={item.data.id}
            postId={route.params.id}
            poster={item.data.Poster}
          />
        )}
        //@ts-ignore
        keyExtractor={(item) => item.id}
      />
    );

  const showPosts = () => {
    setSelected(true);
    setData(postData);
  };

  const showComments = () => {
    setSelected(false);
    setData(commentData);
  };

  useEffect(() => {
    getPosts();
    getComments();
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("./icons/user-solid.png")}
          style={styles.profilePicture}
        />
        <View>
          <Text style={styles.username}>{route.params.user}</Text>
          <Text style={styles.dateJoined}>Joined Oct 24 2003</Text>
        </View>
      </View>
      <View style={styles.postCommentBox}>
        <TouchableOpacity onPress={() => showPosts()}>
          <View style={styles.postCommentButton}>
            <Text style={{ textAlign: "center", fontSize: 15 }}>Posts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showComments()}>
          <View style={styles.postCommentButton}>
            <Text style={{ textAlign: "center", fontSize: 15 }}>Comments</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBorder}></View>
      {postComments}
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    height: 65,
    width: 55,
    marginTop: 30,
    marginLeft: 40,
    borderRadius: 30,
  },
  username: { marginTop: 35, marginLeft: 19, color: "#646464" },
  dateJoined: { marginLeft: 20, fontSize: 12, marginTop: 7, color: "#8C8C8C" },
  postCommentBox: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  postCommentButton: {
    borderRadius: 10,
    borderWidth: 1,
    width: 140,
    marginRight: 10,
    marginLeft: 10,
    height: 22,
  },
  bottomBorder: {
    height: 1,
    width: 500,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderTopColor: "#DDDDDD",
    borderBottomColor: "#DDDDDD",
  },
  borderlessHeader: {
    backgroundColor: "white",
    borderBottomColor: "white",
    borderBottomWidth: 0,
    shadowColor: "transparent",
  },
});

export default Profile;
