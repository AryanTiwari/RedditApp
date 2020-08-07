import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  FlatList,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import "firebase/firestore";
import Post from "./Post";

const Home = () => {
  const navigation = useNavigation();
  const [bounceValue] = useState(new Animated.Value(330));
  const [Data, setData] = useState<Array<any>>([]);
  const [currentUser, setCurrentUser] = useState("");

  var db = firebase.firestore();
  var isHidden = true;
  var isFetching = false;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ margin: 20 }}
          onPress={() =>
            navigation.navigate("Profile", {
              user: currentUser,
              retriveData: getData(),
            })
          }
        >
          <Image
            style={{ height: 25, width: 25 }}
            source={require("./icons/user-regular.png")}
          />
        </TouchableOpacity>
      ),
    });
  });

  //@ts-ignore
  const DATA: any = [];

  const getCurrentUser = () => {
    db.collection("users")
      .where("Email", "==", firebase.auth().currentUser?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          if (data !== undefined && doc !== undefined) {
            setCurrentUser(data.Username);
          } else {
            console.log("No such document!");
          }
        });
      });
  };

  const getData = () => {
    db.collection("posts").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //@ts-ignore
        if (!DATA.some((post) => post.id === doc.id)) {
          DATA.push({
            data: doc.data(),
            id: doc.id,
          });
        }
      });
      setData(DATA);
    });
  };

  useEffect(() => {
    getData();
    getCurrentUser();
  }, []);

  const _toggleSubview = () => {
    var toValue = 330;

    if (isHidden) {
      toValue = 0;
    }

    //@ts-ignore
    Animated.spring(bounceValue, {
      toValue: toValue,
      velocity: 1,
      tension: 2,
      friction: 8,
    }).start();

    isHidden = !isHidden;
  };

  return (
    <View style={styles.topView}>
      <FlatList
        //@ts-ignore
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
            id={item.id}
            currentUser={currentUser}
          />
        )}
        onRefresh={() => getData()}
        refreshing={isFetching}
        //@ts-ignore
        keyExtractor={(item) => item.id}
      />

      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.button}
            source={require("./icons/home-solid.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => _toggleSubview()}>
          <Image
            style={styles.button}
            source={require("./icons/edit-solid.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Messaging")}>
          <Image
            style={styles.button}
            source={require("./icons/envelope-solid.png")}
          />
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.subView,
            //@ts-ignore
            { transform: [{ translateY: bounceValue }] },
          ]}
        >
          <Text style={styles.postBoxTitle}>Post to RedditApp</Text>
          <View style={styles.postBox}>
            <TouchableOpacity
              onPress={() => {
                _toggleSubview();
                navigation.navigate("PostImage");
              }}
            >
              <Image
                style={styles.fileIcon}
                source={require("./icons/file-image-regular.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                _toggleSubview();
                navigation.navigate("PostText");
              }}
            >
              <Image
                style={styles.textIcon}
                source={require("./icons/font-solid.png")}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text style={styles.imageLabel}>Image</Text>
            <Text style={styles.imageLabel}>Text</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              _toggleSubview();
            }}
            style={styles.postDrawer}
          >
            <Image
              style={styles.closeIcon}
              source={require("./icons/times-solid.png")}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  subView: {
    position: "absolute",

    left: 0,
    right: 0,
    height: 220,
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    backgroundColor: "#5EB1FF",
  },
  button: {
    marginTop: 10,
    height: 25,
    width: 30,
    marginRight: 40,
    marginLeft: 40,
  },
  topView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  navigationBar: {
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 415,
    marginBottom: 40,
  },
  postDrawer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5EB1FF",
  },
  imageLabel: {
    marginRight: 25,
    marginLeft: 20,
    marginBottom: 10,
  },
  postBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 415,
  },
  fileIcon: {
    height: 40,
    width: 30,
    marginRight: 30,
    marginBottom: 10,
  },
  textIcon: {
    height: 40,
    width: 35,
    marginLeft: 25,
    marginBottom: 10,
  },
  postBoxTitle: {
    textAlign: "center",
    marginBottom: 20,
    marginTop: 8,
    color: "white",
    fontSize: 15,
  },
  closeIcon: {
    height: 20,
    width: 20,
    tintColor: "white",
  },
});

export default Home;
