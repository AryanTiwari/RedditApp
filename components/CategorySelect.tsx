import React, { useState } from "react";

import {
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "General",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Tech",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Music",
  },
  {
    id: "4",
    title: "Art",
  },
];

//@ts-ignore
const CategorySelect = () => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "" });
  });

  const navigation = useNavigation();
  let category = "";

  const select = () => {
    navigation.navigate("PostText", { data: category });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              category = item.title;
              select();
            }}
          >
            <Text style={{ color: "white" }}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: 80,
    height: 20,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#42A2FB",
    marginBottom: 8,
    marginLeft: 20,
    alignItems: "center",
  },
});

export default CategorySelect;
