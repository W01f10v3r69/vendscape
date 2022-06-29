import React, { useState, useEffect, useContext, useRef } from "react";
import { View, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BoltSemiBoldText } from "../CustomText";
import { restaurants } from "../../constants";
import RestaurantCard from "./RestaurantCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RestaurantList2({ navigation,_id }) {
	const [foods, setFood] = useState([]);

	useEffect(() => {
		getData();
	}, []);


	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem("@login_key");
			const jsonvalue = JSON.parse(value);

			// console.log(jsonvalue);
			getFoods()
		} catch (e) {
			console.log(e);
		}
	};

	function randomIntFromInterval(min, max) { // min and max included 
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const getFoods = () => {
        const url = `https://floating-wildwood-95983.herokuapp.com/food/getFoodsByVendor/${_id}`;
        http: axios
          .get(url)
          .then((response) => {
            const result = response.data;

             console.log(result);
            setFood(result);
          })
          .catch((error) => {
            console.log(error);
          });
	}
	return (
		<View style={tw`flex mt-4 mx-5`}>

			<View>
				{foods.map((item) => ( 
					<RestaurantCard
						// key={index}
						data={item}
						navigation={navigation}
					/>
				))}
			</View>

			{/* <FlatList
				style={tw``}
				data={restaurants}
				renderItem={({ item }) => }
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
			/> */}
		</View>
	);
}
