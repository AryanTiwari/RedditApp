import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./components/Home";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import PostText from "./components/PostText";
import PostImage from "./components/PostImage";
import PostScreen from "./components/PostScreen";
import CategorySelect from "./components/CategorySelect";
import StartScreen from "./components/StartScreen";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import { useNavigation } from "@react-navigation/native";

import * as firebase from "firebase";

import { decode, encode } from "base-64";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

var firebaseConfig = {
  apiKey: "AIzaSyDSJMRm8jTi1eGpfetlkEC-Kyo-yTWzL7o",
  authDomain: "redditapp-811a0.firebaseapp.com",
  databaseURL: "https://redditapp-811a0.firebaseio.com",
  projectId: "redditapp-811a0",
  storageBucket: "redditapp-811a0.appspot.com",
  messagingSenderId: "135696935824",
  appId: "1:135696935824:web:2ca9a59f4b07a5d8952115",
  measurementId: "G-22VQ5XLKYK",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const MainStackScreen = () => {
  const navigation = useNavigation();
  var db = firebase.firestore();
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="StartScreen" component={StartScreen} />
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen name="SignUp" component={SignUp} />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="Messages" component={Messages} />
      <MainStack.Screen name="PostText" component={PostText} />
      <MainStack.Screen name="PostImage" component={PostImage} />
      <MainStack.Screen name="PostScreen" component={PostScreen} />
    </MainStack.Navigator>
  );
};

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Profile" component={Profile} />
        <RootStack.Screen name="CategorySelect" component={CategorySelect} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
