import React, { useState, useEffect, useContext, useRef } from "react";
import { View, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BoltSemiBoldText } from "../CustomText";
import { restaurants } from "../../constants";
import RestaurantCard from "./RestaurantCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RestaurantList({ navigation }) {
	const [foods, setFood] = useState([]);
	const [foods1, setFood1] = useState([]);

	const [random, setradom] = useState([]);
	const [display, setDisplay] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	const onScroll = () => {
		const url = `https://floating-wildwood-95983.herokuapp.com/food/getAllFoods`;
		axios
			.get(url)
			.then((response) => {
				const result = response.data;
				let currentRandomLength = random.length
				for (let i = 0; i < 10; i++) {
					let ran = randomIntFromInterval(0, result.length - 1);
					if (random.length != currentRandomLength+4) {
						if (!random.includes(ran)) {
							foods.push(result[ran])
							random.push(ran)
						}
					}
					else{
						break;
					}
				}
				//  console.log(foods,random);
				setFood(foods);
				setDisplay(true);
			})
			.catch((error) => {
				console.log(error);
			});
	}


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
		const url = `https://floating-wildwood-95983.herokuapp.com/food/getAllFoods`;
		axios
			.get(url)
			.then((response) => {
				const result = response.data;

				for (let i = 0; i < 10; i++) {
					let ran = randomIntFromInterval(0, result.length - 1);
					if (random.length != 4) {
						if (!random.includes(ran)) {
							foods.push(result[ran])
							random.push(ran)
						}
					}
					else{
						break;
					}
				}

				//  console.log(foods,random);
				setFood(foods);
				setDisplay(true);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return (
		<View style={tw`flex mt-4 mx-5`}>
			<View style={tw`flex flex-row items-center justify-between`}>
				<BoltSemiBoldText style={tw`text-xl`}>
					Scrumptious Meals Now
				</BoltSemiBoldText>
			</View>

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
