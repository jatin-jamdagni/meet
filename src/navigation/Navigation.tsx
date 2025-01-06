import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "../utils/NavigationUtils";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import JoinMeetScreen from "../screens/JoinMeetScreen";
import PrepareMeetScreen from "../screens/PrepareMeetScreen";
import LiveMeetScreen from "../screens/LiveMeetScreen";
import { StatusBar } from "react-native";
import { WSProvider } from "@/service/api/WSProvider";
 
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="JoinMeetScreen" component={JoinMeetScreen} />
      <Stack.Screen name="PrepareMeetScreen" component={PrepareMeetScreen} />
      <Stack.Screen name="LiveMeetScreen" component={LiveMeetScreen} />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <WSProvider>
      <NavigationContainer ref={navigationRef}>
        {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
        <Navigation />
      </NavigationContainer>
    </WSProvider>
  );
};

export default AppNavigation;
