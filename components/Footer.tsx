import React, { Component } from "react";

import { View, TouchableOpacity, Image } from "react-native";

interface Props {
  navigation: any;
}

class Footer extends Component<Props> {
  render() {
    return (
      <View
        style={{
          margin: 20,
          borderTopColor: "#DDDDDD",
          borderTopWidth: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: 415,
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Image
            style={{ height: 25, width: 25 }}
            source={require("./icons/home-solid.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ margin: 10, marginRight: 80, marginLeft: 80 }}
          onPress={() => this.props.navigation.navigate("Test")}
        >
          <Image
            style={{ height: 25, width: 30 }}
            source={require("./icons/edit-solid.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Messages")}
        >
          <Image
            style={{ height: 25, width: 25 }}
            source={require("./icons/envelope-solid.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Footer;
