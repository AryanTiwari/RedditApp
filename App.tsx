import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Image } from "react-native";

import Home from "./components/Home";
import Test from "./components/Test";
import Messages from "./components/Messages";
import Profile from "./components/Profile";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: () => (
              <TouchableOpacity
                style={{ margin: 20 }}
                onPress={() => alert("hre")}
              >
                <Image
                  style={{ height: 25, width: 25 }}
                  source={require("./components/user-regular.png")}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Messages" component={Messages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
