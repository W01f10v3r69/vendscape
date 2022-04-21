import React, { useState, useEffect, useContext, useRef } from "react";
import { View, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BoltSemiBoldText } from "../CustomText";
import OrderCard from "./OrderCard";
import { discounts, myOrders } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function OrderList2() {
	const [order, setOrder] = useState([]);

	useEffect(() => {
		getData();
	}, []);
	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem("@login_key");
			const jsonvalue = JSON.parse(value);

			// console.log(jsonvalue);
			getOrder(jsonvalue.id)
		} catch (e) {
			console.log(e);
		}
	};


	const getOrder = (id) => {
		const url = `https://floating-wildwood-95983.herokuapp.com/order/getMyOrderRequest/${id}`;
		axios
			.get(url)
			.then((response) => {
				const result = response.data;
				setOrder(result)
				// console.log(order);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return (
		<View style={tw`flex mt-4`}>
			{
				order.map((item) => {
					console.log(item.foodname);
				return 	<OrderCard data={item} />
				})
			}


			{/* <FlatList
				style={tw`mx-5 pb-96`}
				data={myOrders}
				renderItem={({ item }) => <OrderCard data={item} />}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
			/> */}
		</View>
	);
}
