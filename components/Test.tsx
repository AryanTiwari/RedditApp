import React, { Component } from "react";

import { View, Text, ScrollView } from "react-native";

class Test extends Component {
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
        </ScrollView>
      </View>
    );
  }
}

export default Test;
