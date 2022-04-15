import React, { useEffect,useState,useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/Profile";
import Payment from "../screens/Payment";

const Stack = createNativeStackNavigator();

function ProfileNavigator() {
 

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          cardShadowEnabled: false,
          headerTitle: "",
          headerTintColor: "white",
        }}
        initialRouteName="Profile"
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />

        <Stack.Screen
          options={{
            headerTransparent: true,
            headerShadowVisible: false,
          }}
          name="Payment"
          component={Payment}
        />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ProfileNavigator;
