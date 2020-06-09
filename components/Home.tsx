import React, { Component } from "react";

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

var list = [<Text>Test</Text>, <Text>What</Text>];

interface Props {
  navigation: any;
}

import Footer from "./Footer";

class Home extends Component<Props> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        <ScrollView>
          <Text>Test 1 2 3</Text>
          <Text>{list}</Text>
        </ScrollView>
        <Footer />
      </View>
    );
  }
}

export default Home;
