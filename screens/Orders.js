import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	StyleSheet,
	Dimensions,
	View,
	TextInput,
	FlatList,
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
import { popularFoods } from "../constants";
import OrderList from "../components/Order/OrderList";
import OrderList2 from "../components/Order/OrderList2";
const { width, height } = Dimensions.get("window");

export default function Orders() {
	const [changeTabs, setchangeTabs] = useState(1);
	const [colorChange, setcolorChange] = useState("black");
	const [colorChange1, setcolorChange1] = useState("gray");

	const tabs = (a)=>{
		setchangeTabs(a)
		if (a==1) {
			setcolorChange("black")
			setcolorChange1("gray")
		} else {
			setcolorChange("gray")
			setcolorChange1("black")
		}
	}
	return (
    <View
      style={{
        ...tw`flex pt-2`,
        marginTop: Constants.statusBarHeight,
      }}
    >
      <StatusBar style="auto" />
      <View
        style={[
          tw`flex flex-col mx-5 mt-5`,
          { flexDirection: "row", justifyContent: "space-around" },
        ]}
      >
        <TouchableOpacity onPress={() => tabs(1)}>
          <BoltSemiBoldText
            style={{ color: colorChange, fontSize: (7 * width) / 100 }}
          >
            My Orders
          </BoltSemiBoldText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => tabs(2)}>
          <BoltSemiBoldText
            style={{ color: colorChange1, fontSize: (7 * width) / 100 }}
          >
            My Requests
          </BoltSemiBoldText>
        </TouchableOpacity>
      </View>

      <View style={tw``}>
        { changeTabs == 1 ?  <OrderList /> : <OrderList2 />}
       {/* <OrderList /> */}
      </View>
    </View>
  );
}
