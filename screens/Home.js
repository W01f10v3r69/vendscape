import React, { useEffect, useState,useCallback } from "react";
import { StyleSheet, Text, View,ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BoltLightText } from "../components/CustomText";
import DiscountList from "../components/Discount/DiscountList";
import RestaurantList from "../components/Restaurant/RestaurantList";
import { ScrollView,RefreshControl } from "react-native-gesture-handler";
import Constants from "expo-constants";
import SkeletonLoader from "expo-skeleton-loader";

const Home = ({ navigation }) => {
	const [refreshing, setRefreshing] = useState(false);
	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	  };
	const onRefresh = useCallback(() => {
	  setRefreshing(true);
	  wait(2000).then(() => setRefreshing(false));
	}, []);
	return (
		<ScrollView
			style={{
				...tw`flex pt-2`,
				marginTop: Constants.statusBarHeight,
			}}
			// refreshControl={()=>onRefresh()}
		> 
		{/* <RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh()} /> */}
			<StatusBar style="auto" />
			<View style={tw`flex flex-row items-center mx-5`}>
				{/* <IonIcons name="ios-location-outline" size={25} color="black" /> */}
				<BoltLightText style={tw`text-lg ml-2`}>
					Vendscape
				</BoltLightText>
			</View>

			<View>
				<DiscountList navigation = {navigation} />
			</View>

			<View style={tw`pb-5`}>
				<RestaurantList navigation={navigation} />
			</View>
		</ScrollView>
	);
};

export default Home;
