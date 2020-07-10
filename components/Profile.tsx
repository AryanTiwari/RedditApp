import React from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

const Profile = () => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("./icons/user-solid.png")}
          style={{
            height: 65,
            width: 55,
            marginTop: 30,
            marginLeft: 40,
            borderRadius: 30,
          }}
        />
        <View>
          <Text style={{ marginTop: 35, marginLeft: 19, color: "#646464" }}>
            AgentAri123
          </Text>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 12,
              marginTop: 7,
              color: "#8C8C8C",
            }}
          >
            Joined Oct 24 2003
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              width: 140,
              marginRight: 10,
            }}
          >
            <Text style={{ textAlign: "center" }}>Posts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              width: 140,
              marginLeft: 10,
            }}
          >
            <Text style={{ textAlign: "center" }}>Comments</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          width: 500,
          borderColor: "black",
          borderWidth: 1,
          marginTop: 10,
          borderTopColor: "#DDDDDD",
          borderBottomColor: "#DDDDDD",
        }}
      ></View>
    </View>
  );
};

export default Profile;
