import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import * as firebase from "firebase";
import Post from "./Post";
import { useNavigation } from "@react-navigation/native";

//@ts-ignore
const CategoryScreen = ({ route }) => {
  const db = firebase.firestore();
  const [Data, setData] = useState([{}]);
  const DATA = [{}];
  const navigation = useNavigation();
  var isFetching = false;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.borderlessHeader,
      headerTitle: route.params.category,
    });
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.collection("posts")
      .where("Category", "==", route.params.category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //@ts-ignore
          if (!DATA.some((post) => post.id === doc.id)) {
            DATA.push({
              id: doc.id,
              post: (
                <Post
                  title={doc.data().Title}
                  category={doc.data().Category}
                  poster={doc.data().Poster}
                  likes={doc.data().Likes}
                  comments={doc.data().Comments}
                  post={doc.data().Post}
                  id={doc.id}
                />
              ),
            });
            setData(DATA);
          }
        });
      });
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        //@ts-ignore
        data={Data}
        //@ts-ignore
        renderItem={({ item }) => item.post}
        onRefresh={() => getData()}
        refreshing={isFetching}
        //@ts-ignore
        keyExtractor={(item) => item.id}
      />
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
});

export default CategoryScreen;
