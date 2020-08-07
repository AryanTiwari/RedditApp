import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./components/Home";
import Comment from "./components/Comment";
import Profile from "./components/Profile";
import PostText from "./components/PostText";
import PostImage from "./components/PostImage";
import PostScreen from "./components/PostScreen";
import CategorySelect from "./components/CategorySelect";
import StartScreen from "./components/StartScreen";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Messaging from "./components/Messaging";
import CategoryScreen from "./components/CategoryScreen";
import LoadingScreen from "./components/LoadingScreen";

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
  const [userSignedIn, setUserSignedIn] = React.useState<boolean | null>(null);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      setUserSignedIn(true);
    } else {
      // No user is signed in.
      setUserSignedIn(false);
    }
  });

  return (
    <MainStack.Navigator>
      {userSignedIn === null ? (
        <MainStack.Screen name="LoadingScreen" component={LoadingScreen} />
      ) : userSignedIn === true ? (
        // User is signed in
        <>
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              animationEnabled: false,
            }}
          />
          <MainStack.Screen name="Profile" component={Profile} />
          <MainStack.Screen name="Commment" component={Comment} />
          <MainStack.Screen name="PostText" component={PostText} />
          <MainStack.Screen name="PostImage" component={PostImage} />
          <MainStack.Screen name="PostScreen" component={PostScreen} />
          <MainStack.Screen name="Messaging" component={Messaging} />
          <MainStack.Screen name="CategoryScreen" component={CategoryScreen} />
        </>
      ) : (
        // No token found, user isn't signed in
        <>
          <MainStack.Screen name="StartScreen" component={StartScreen} />
          <MainStack.Screen name="Login" component={Login} />
          <MainStack.Screen name="SignUp" component={SignUp} />
        </>
      )}
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
