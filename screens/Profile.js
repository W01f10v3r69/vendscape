import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BoltLightText, BoltSemiBoldText } from "../components/CustomText";
import DiscountList from "../components/Discount/DiscountList";
import RestaurantList from "../components/Restaurant/RestaurantList";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { popularFoods, profileTabs } from "../constants";
import OrderList from "../components/Order/OrderList";
import * as Linking from 'expo-linking';
import ConfirmLogout from "../components/ConfirmLogout";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Payment from "./Payment";
import Setting from "./Setting";
import Upload from "./Upload";
import Catalog from "./Catalog";
const { width, height } = Dimensions.get("window");

export default function Profile() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("...");
  const [Banner_Image, setBanner_Image] = useState("");
  const [phone, setPhone] = useState("...");
  const [navigate, setNavigate] = useState("0");
  const [logout, setlogout] = React.useState(false);

  const lougout = async (value) => {
    try {
      await AsyncStorage.setItem("@login_key", value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@login_key");
      const jsonvalue = JSON.parse(value);

      fecth(jsonvalue.email);
    } catch (e) {
      console.log(e);
    }
  };
  const fecth = (credentials) => {
    const url = `https://floating-wildwood-95983.herokuapp.com/user/getdata/${credentials}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;

        setName(result[0].name);
        setBanner_Image(result[0].Banner_Image);
        result[0].phone == 0
          ? setPhone("Set Your Phone Number in Settings")
          : setPhone(result[0].phone);
        // console.log("else: "+message,status);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getData();

  {
    return navigate == 0 ? (
      <ScrollView
        style={{
          ...tw`flex pt-2`,
          marginTop: Constants.statusBarHeight,
        }}
      >
        <StatusBar style="auto" />
        <View style={tw`flex flex-col mx-5 mt-5`}>
        <ImageBackground
              source={{uri:Banner_Image}}
              resizeMode="cover"
              style={sty.grid}
              imageStyle={{ width: (90 * width) / 100,height:(30 * width) / 100, borderRadius: 10 }}
            ></ImageBackground>
          <BoltSemiBoldText style={tw`text-2xl`}>{name}</BoltSemiBoldText>
          <BoltLightText style={tw`text-gray-500`}>{phone}</BoltLightText>
        </View>

        <View style={tw`mt-10`}>
          <View style={tw`mx-5 pb-96`}>
            <TouchableOpacity
              style={tw`w-full flex flex-row mb-7 items-center`}
			  onPress={()=>setNavigate(1)}
            >
              <AntDesign name={"creditcard"} size={24} color="black" />
              <BoltLightText style={tw`text-xl ml-5`}>Payment</BoltLightText>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-full flex flex-row mb-7 items-center`}
			  onPress={()=>setNavigate(2)}
            >
              <IonIcons name={"ios-settings-outline"} size={24} color="black" />
              <BoltLightText style={tw`text-xl ml-5`}>Edit Profile</BoltLightText>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-full flex flex-row mb-7 items-center`}
			  onPress={()=>setNavigate(3)}
            >
              <IonIcons name={"albums-outline"} size={24} color="black" />
              <BoltLightText style={tw`text-xl ml-5`}>
                My Catalog
              </BoltLightText>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-full flex flex-row mb-7 items-center`}
			  onPress = {() => Linking.openURL('https://Google.com')}
            >
              <IonIcons
                name={"information-circle-outline"}
                size={24}
                color="black"
              />
              <BoltLightText style={tw`text-xl ml-5`}>Contact Us</BoltLightText>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-full flex flex-row mb-7 items-center`}
              onPress={()=>lougout("")}
            >
              <AntDesign name={"logout"} size={24} color="black" />
              <BoltLightText style={tw`text-xl ml-5`}>Logout</BoltLightText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    ) : navigate == 1 ? (
      <Payment />
    ) : navigate == 2 ? (
      <Setting />
    ) : navigate == 3 ? (
      <Catalog />
    ) : (
      <Contact />
    );
  }
}
const sty = StyleSheet.create({

  grid: {
    width: (30 * width) / 100,
    height: (30 * width) / 100,
    borderRadius: 100,
    // backgroundColor: "blue",
  },

});