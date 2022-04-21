import React, { useState, useRef, useEffect } from "react";
import {
	Button,
	Text,
	View,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Animated,
	Platform,
	Dimensions,
	SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "tailwind-react-native-classnames";
import { BoltLightText, BoltSemiBoldText } from "../components/CustomText";
import { useValue } from "react-native-reanimated";
// import { interpolate, Extrapolate } from "react-native-reanimated";
// import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import CustomAlert from "../components/CustomAlert";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from 'react-native'
import Constants from "expo-constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import intl from "intl";
import 'intl/locale-data/jsonp/en';

const IMAGE_WIDTH = 290;

const RestaurantInfo = ({ navigation, route }) => {
	const { banner, name, description, vegan, price, vendorsId } = route.params;
	const scrollY = useRef(new Animated.Value(0.01)).current;
	const [toggleBar, setToggleBar] = useState(false);
	const [ownersid, setId] = useState("");
	const [vendorsName, setVendorsName] = useState("");
	const [phoneNumber, setphoneNumber] = useState("");
	const [alerttext, setalerttext] = useState("");
	const [stats, setstats] = useState("");

	useEffect(() => {
		getData();
		getVendorsName(vendorsId);

	}, []);

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
				setId(result[0]._id);
				setphoneNumber(result[0].phone)
				// console.log(result[0]._id);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getVendorsName = (vId) => {
		const url = `https://floating-wildwood-95983.herokuapp.com/user/getdatabyid/${vendorsId}`;
		axios
			.get(url)
			.then((response) => {
				const result = response.data;
				setVendorsName(result.name);

			})
			.catch((error) => {
				console.log(error);
			});
	};


	const orderNow = () => {
		console.log({ foodname: name, vendorsName, price, vendorsId, ownersId: ownersid,image:banner.uri });
		const url = `https://floating-wildwood-95983.herokuapp.com/order/`;
		axios
			.post(url, { foodname: name, vendorsName, price, vendorsId, ownersId: ownersid,image:banner.uri }, {
				hedaers: {
					Accept: "application/json",
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				const result = response.data;
				const { message, status, data } = result;
				console.log(result);

				if (status !== "SUCCESS") {
					console.log(data);
					setalerttext("Order Failed");
					setstats("bad");
					fadeIn();
					setTimeout(() => {
						fadeOut();
					}, 3000);
				} else {
					console.log("if: " + message, status);
					setalerttext("Order Successfully");
					setstats("");
					fadeIn();
					setTimeout(() => {
						fadeOut();
					}, 3000);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	const searchBarAnim = useRef(
		new Animated.Value(
			Platform.OS === "android"
				? 0 - Constants.statusBarHeight * 6
				: 0 - Constants.statusBarHeight * 3
		)
	).current;

	const formatter = new intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'NGN',
	});
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const fadeIn = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1500,
			useNativeDriver: true, // Add This line
		}).start();
	};

	const fadeOut = () => {
		// Will change fadeAnim value to 0 in 3 seconds
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true, // Add This line
		}).start();
	};
	useEffect(() => {
		if (toggleBar) {
			Animated.timing(searchBarAnim, {
				toValue: 0,
				duration: 150,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(searchBarAnim, {
				toValue:
					Platform.OS === "android"
						? 0 - Constants.statusBarHeight * 6
						: 0 - Constants.statusBarHeight * 3,
				duration: 150,
				useNativeDriver: true,
			}).start();
		}
	}, [toggleBar]);

	return (
		<View style={tw`flex relative bg-white`}>
			<Animated.View
				style={tw.style(
					"bg-white w-full absolute flex items-center px-5 shadow-lg",
					{
						transform: [{ translateY: searchBarAnim }],
						zIndex: 100,
						elevation: 10000,
						paddingTop: Constants.statusBarHeight,
					}
				)}
			>
				<View
					style={tw.style(
						"flex flex-col w-full justify-between h-full pt-5",
						{
							zIndex: 100,
							elevation: 100,
						}
					)}
				>
					<View
						style={tw.style(
							"w-full flex pt-1 flex-row justify-between pb-2.5",
							{
								// "items-center": Platform.OS === "android",
								// "justify-between flex-row": Platform.OS === "ios",
							}
						)}
					>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Ionicons
								name="ios-arrow-back-outline"
								size={24}
								color="black"
							/>
						</TouchableOpacity>

						<BoltSemiBoldText
							style={tw.style(
								"my-auto text-black my-auto mx-auto",
								{
									fontSize:
										Platform.OS === "ios"
											? 20
											: Dimensions.get("window").width /
											25,
								}
							)}
						>
							{name}
						</BoltSemiBoldText>

						<Ionicons
							name="ios-arrow-back-outline"
							size={24}
							color="white"
						/>
					</View>
				</View>


			</Animated.View>
			
			<View style={tw.style("flex bg-white h-full")}>
				<View
					style={tw.style("w-full relative", {
						zIndex: 400,
						elevation: 400,
					})}
				>
					<View
						style={{
							...tw`w-full absolute items-center`,
							zIndex: 400,
							elevation: 10000,
							marginTop: Constants.statusBarHeight,

							// paddingTop:
							// 	Platform.OS === "android"
							// 		? Constants.statusBarHeight
							// 		: 0,
						}}
					>
						<View
							style={tw.style(
								"flex px-5 flex-row w-full absolute justify-between",
								{
									zIndex: 100,
									elevation: 100,
								}
							)}
						>
							<TouchableOpacity
								onPress={() => navigation.goBack()}
							>
								<Ionicons
									name="ios-arrow-back-outline"
									size={24}
									color="black"
								/>
							</TouchableOpacity>
						</View>
					</View>
					<Animated.Image
						style={{
							...tw`w-full top-0`,
							...StyleSheet.absoluteFillObject,
							height: IMAGE_WIDTH / 1.6,
							transform: [
								{
									translateY: scrollY.interpolate({
										inputRange: [0, IMAGE_WIDTH],
										outputRange: [0, -IMAGE_WIDTH],
										extrapolate: "clamp",
									}),
								},
								{
									scale: scrollY.interpolate({
										inputRange: [-IMAGE_WIDTH * 2, 0],
										outputRange: [5, 1],
										extrapolate: "clamp",
									}),
								},
							],
						}}
						source={banner}
					/>
				</View>

				<Animated.ScrollView
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{
							useNativeDriver: true,
							listener: (event) => {
								const offsetY =
									event.nativeEvent.contentOffset.y;
								console.log(offsetY);
								if (offsetY > 60) {
									setToggleBar(true);
								} else {
									setToggleBar(false);
								}
							},
						}
					)}
					contentContainerStyle={{ flexGrow: 1 }}
					scrollEventThrottle={16}
					style={tw`px-5 pt-5`}
				>
					<View
						style={tw.style({
							marginTop: IMAGE_WIDTH / 1.6,
						})}
					>
						<View
							style={tw`w-full flex flex-row justify-between items-start`}
						>
							<BoltSemiBoldText
								style={tw.style("text-lg flex w-2/3", {
									flexWrap: "wrap",
								})}
							>
								{name}
							</BoltSemiBoldText>
						</View>

						<View
							style={tw`w-full mt-1 flex flex-row justify-between`}
						>
							<BoltLightText style={tw`text-gray-800`}>
								{formatter.format(price).replace("NGN", "₦")}
							</BoltLightText>
						</View>
						
						<View style={tw`w-full mt-5 flex flex-col`}>
							{/* my alert */}
			<Animated.View
				style={{

					opacity: fadeAnim,
					width: "100%",
				}}
			>
				<CustomAlert text={alerttext} status={stats} />
			</Animated.View>
			{/* en of my alert */}
							<TouchableOpacity
								style={tw`rounded-full border border-gray-200 flex flex-row items-center flex-row py-3.5`}
								onPress={() => orderNow()}
								activeOpacity={0.6}
							>
								<BoltSemiBoldText
									style={tw`text-black mx-auto`}
								>
									Order Now
								</BoltSemiBoldText>
							</TouchableOpacity>
							
							<TouchableOpacity
								style={tw`rounded-full border border-gray-200 flex flex-row items-center flex-row py-3.5 mt-4`}
								onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
								activeOpacity={0.6}
							>
								<BoltSemiBoldText
									style={tw`text-black mx-auto`}
								>
									Call Vendor
								</BoltSemiBoldText>
							</TouchableOpacity>
						</View>
					</View>

					<View style={tw.style("mt-10 w-4/5", {})}>
						<View style={tw`w-full flex flex-col`}>
							<BoltSemiBoldText
								style={tw.style("text-lg", {
									flexWrap: "wrap",
								})}
							>
								Vegan?
							</BoltSemiBoldText>
							<BoltLightText
								style={tw.style("text-gray-700 mt-1.5", {
									flexWrap: "wrap",
									fontSize: 16,
								})}
							>
								{vegan}
							</BoltLightText>
						</View>
					</View>

					<View style={tw.style("mt-10 w-4/5", {})}>
						<View style={tw`w-full flex flex-col`}>
							<BoltSemiBoldText
								style={tw.style("text-lg", {
									flexWrap: "wrap",
								})}
							>
								Description
							</BoltSemiBoldText>
							<BoltLightText
								style={tw.style("text-gray-700 mt-1.5", {
									flexWrap: "wrap",
									fontSize: 16,
								})}
							>
								{description}
							</BoltLightText>
						</View>
					</View>

					
				</Animated.ScrollView>
			</View>
		</View>
	);
};

export default RestaurantInfo;
