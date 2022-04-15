import { StatusBar } from "expo-status-bar";
import React,{ useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import RestaurantScreen from "./screens/Restaurant";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabs from "./navigation/Tabs";
import RestaurantStackScreen from "./navigation/Restaurant";
import LoginScreen from "./screens/LoginComp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    BoltRegular: require("./assets/fonts/EuclidCircularRegular.ttf"),
    BoltSemibold: require("./assets/fonts/EuclidCircularSemiBold.ttf"),
  });
  const [response, setResponse] = useState("");
  const [alertmebad, setalertmebad] = useState("");
  const [alertmegood, setalertmegood] = useState("");
  const [login, setLogin] = useState(0);

  // to check if someone is logged in already
  const checklogin = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@login_key");
      jsonValue != null ? setLogin(1) : setLogin(0);
    } catch (e) {
      console.log(e);
    }
    // storeData(null)
    // setLogin(0);
  };

  checklogin()
  if (!fontsLoaded) {
    return <AppLoading />;
  } else { 
      return login == 1 ? (
        <NavigationContainer>
      	{/* <StatusBar style="auto" /> */}
      	<Stack.Navigator>
      		<Stack.Screen
      			name="Home"
      			component={HomeTabs}
      			options={{ headerShown: false, tabBarShowLabel: false }}
      		/>
      		<Stack.Screen
      			name="Restaurant"
      			component={RestaurantStackScreen}
      			options={{ headerShown: false }}
      		/>
      	</Stack.Navigator>
      </NavigationContainer>
      ) : (
        <LoginScreen
        register={() => checklogin()}
        registerResponse={response}
        login={() => checklogin()}
        alertmeBad={alertmebad}
        alertmeGood={alertmegood}
      />
      );

  }
}
