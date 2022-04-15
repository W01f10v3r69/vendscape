import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
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

export default function Search() {
	const [search, setSearch] = useState("");
	const [searchedFood, setSearchedFood] = useState([]);

	// on type it serches inside the array and get the vendor tat macthes
	const getVendors = (typed)=>{
		setSearch(typed)
		var el =[]
		// compare all the items in the array with the text typed
		if (typed == "" || typed == " ") {
			el =["78^%&^5&%89"]
			setSearchedFood(el)
		} else {
			popularFoods.forEach(items => {
				if (items.toLowerCase().includes(typed.toLowerCase())) { 
					el.push(items)
				} 
				
				setSearchedFood(el)
			});
		}
		
		// log the out
		// searchedFood.forEach(items => { 
		// 	console.log(items)
		// });
	}

	return (
		<ScrollView
			style={{
				...tw`flex pt-2 h-full pb-40`,
				marginTop: Constants.statusBarHeight,
			}}
		>
			<StatusBar style="auto" />
			<View style={tw`flex flex-col mx-5 mt-5`}>
				<BoltSemiBoldText style={tw`text-2xl`}>Search</BoltSemiBoldText>

				<View style={tw`bg-gray-200 p-4 rounded-md flex flex-row mt-3`}>
					<Ionicons
						name="ios-search"
						size={18}
						color="black"
						style={tw`my-auto`}
					/>
					<TextInput
						style={tw`ml-3`}
						placeholder="Restaurants and Cuisines"
						onChangeText={(e) => getVendors(e)}
						// onChangeText={(e) => setSearch(e)}
						value={search}
					/>
				</View>
			</View>

			<View style={tw`mx-5 mt-8 pb-3`}>
				<BoltSemiBoldText style={tw`text-sm`}>
					Popular Categories
				</BoltSemiBoldText>
			</View>

			<View style={tw`pb-20`}>
				{
					searchedFood.map(items => {
						return	items == "78^%&^5&%89" ? 
						<TouchableOpacity key={0} style={{marginLeft:"5%"}} delayPressIn={150}>
							<BoltLightText
								style={tw`text-sm my-4 text-gray-700 mt-7`}
							>
								<Text>No Vendors Found</Text>
							</BoltLightText>
						</TouchableOpacity>
						
						:
						<TouchableOpacity key={items} style={{marginLeft:"5%"}} delayPressIn={50}>
							<BoltLightText
								style={tw`text-sm my-4 text-gray-700 mt-7`}
							>
								{items}
							</BoltLightText>
						</TouchableOpacity>
					})
				}
				
			</View>
		</ScrollView>
	);
}
