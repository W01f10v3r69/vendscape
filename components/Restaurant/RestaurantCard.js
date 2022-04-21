import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BoltLightText, BoltSemiBoldText } from "../CustomText";
import intl from "intl";
import 'intl/locale-data/jsonp/en';
export default function RestaurantCard({ data, navigation }) {
	const { name, price, image,description,vegan,vendorsId } = data;
	const [discount, setdiscount] = useState(true);
	const formatter = new intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'NGN',
	});

	return (
		<View style={tw`flex-col mr-4 justify-between w-full`}>
			<View style={tw`flex-row items-center mt-5 h-40 w-full relative`}>
				{discount && (
					<View
						style={{
							...tw`absolute bg-white rounded-full top-2 left-2 px-2.5 py-1`,
							zIndex: 100,
							elevation: 100,
						}}
					>
						<BoltSemiBoldText style={tw`text-xs text-red-500`}>
							-20%
						</BoltSemiBoldText>
					</View>
				)}

				<View
					style={{
						...tw`absolute bg-white rounded-full bottom-2 right-2 px-2.5 py-1`,
						zIndex: 100,
						elevation: 100,
					}}
				>
					<BoltSemiBoldText style={tw`text-xs text-black`}>
						70-75 min
					</BoltSemiBoldText>
				</View>
				<TouchableOpacity
					style={tw`w-full h-full`}
					delayPressIn={150}
					onPress={() =>
						// navigation.navigate("RestaurantInfo", {
						// 	screen: "RestaurantInfo",
						// 	params: {
						// 		name,
						// 		banner: { uri: image },
						// 		price,
						// 	},


						// })
						navigation.navigate("Restaurant", {
							screen: "RestaurantPage",
							params: {
								banner: {uri:image},
								name,
								description,vegan ,
								price,
								vendorsId,
							},
						})
					}
				>
					<Image
						source={{ uri: image }}
						style={tw`w-full h-full rounded-lg`}
					/>
				</TouchableOpacity>
			</View>
			<View style={tw`flex-col justify-between mt-1.5`}>
				<View style={tw`flex-row justify-between`}>
					<View style={tw`flex-col justify-between`}>
						<View style={tw`flex-row`}>
							<BoltSemiBoldText style={tw`text-lg`}>
								{name.length > 40
									? name.substring(0, 40 - 3) + "..."
									: name}
							</BoltSemiBoldText>
						</View>
					</View>
					<View style={tw`flex flex-row items-center`}>
						<IonIcons name="ios-star" size={13} color="#000" />
						<BoltSemiBoldText style={tw`text-lg ml-1`}>
							80
						</BoltSemiBoldText>
					</View>
				</View>
				<View style={tw`flex flex-row items-center`}>
					<BoltLightText style={tw`text-sm`}>
						{formatter.format(price).replace("NGN", "₦")}
					</BoltLightText>
				</View>
			</View>
		</View>
	);
}
