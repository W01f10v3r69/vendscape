import React, { useState, useEffect, useContext, useRef } from "react";
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    Platform,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    Dimensions,
    ImageBackground,
} from "react-native";
// import RadioForm from "react-native-simple-radio-button";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import { BoltLightText, BoltSemiBoldText } from "../components/CustomText";
import AppSeparator from "../components/AppSeparator";

import tw from "tailwind-react-native-classnames";

import AppActivityIndicator from "../components/AppActivityIndicator";
import CustomAlert from "../components/CustomAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "./Profile";
import styles from "../config/styles";
import Upload from "./Upload";
import Catalog from "./Catalog";
import EditProduct from "./EditProduct";

const { width, height } = Dimensions.get("window");

function Category({ cat }) {
    const [navigate, setNavigate] = useState(0);
    const [id, setId] = useState(0);
    const [foods, setFood] = useState([]);
    const [pro, setPro] = useState("");
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [vegan, setvegan] = useState("");
    const [bannerInp, setbannerInp] = useState("");
    const [foodId, setfoodId] = useState("");

    // name={item.name} description={item.description} price={item.price} vegan={item.vegan} category={cat}
    const setVariables = (name, description, price, vegan,banner,food) => {
        setname(name)
        setdescription(description)
        setprice(price)
        setvegan(vegan)
        setbannerInp(banner)
        setfoodId(food)
        setNavigate(3)
    }
    useEffect(() => {
        getData();
        console.log(cat)
    }, []);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("@login_key");
            const jsonvalue = JSON.parse(value);

            // console.log(jsonvalue);
            setId(jsonvalue.id);
            getFoods(jsonvalue.id)
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
                // console.log("else: "+message,status);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getFoods = (id) => {
        const url = `https://floating-wildwood-95983.herokuapp.com/food/veiwFood/${id}`;
        axios
            .get(url)
            .then((response) => {
                const result = response.data;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].cartegory != cat) {
                        setPro("No Product Here")
                    }
                    else {
                        setPro("")
                        break
                    }
                }
                setFood(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    {
        return navigate == 0 ? (
            <ScrollView style={sty.container}>
                <TouchableOpacity
                    onPress={() => setNavigate(1)}
                    style={{ marginLeft: "5%" }}
                >
                    <MaterialCommunityIcons
                        name="keyboard-backspace"
                        color={colors.primary}
                        size={60 * 0.5}
                    ></MaterialCommunityIcons>
                </TouchableOpacity>
                <View style={sty.head}>
                    <BoltSemiBoldText style={sty.headText}>My {cat} Category</BoltSemiBoldText>
                </View>
                {
                    foods.map((item) => {
                        return (
                            item.cartegory == cat ?
                                <TouchableOpacity style={sty.biggrid} onPress={() => setVariables(item.name, item.description, item.price, item.vegan,item.image,item._id)}>
                                    <View style={sty.grid1}>
                                        <BoltSemiBoldText style={sty.catText}>{item.name}</BoltSemiBoldText>
                                        <BoltLightText style={sty.catText1}>{item.description}</BoltLightText>
                                        <BoltLightText style={sty.catText2}>₦{item.price}</BoltLightText>
                                        <BoltSemiBoldText style={sty.catText2}>{item.vegan == "Yes" ? "This Is Vegan" : "This Is Not Vegan"}</BoltSemiBoldText>

                                    </View>

                                    <ImageBackground
                                        source={{ uri: item.image }}
                                        resizeMode="cover"
                                        style={sty.grid}
                                        imageStyle={{ width: "100%", borderRadius: 10 }}
                                    ></ImageBackground>
                                </TouchableOpacity> : console.log("hh")

                        )
                    })
                }
                <BoltSemiBoldText style={sty.catTextPro}>{pro}</BoltSemiBoldText>
            </ScrollView>
        ) : navigate == 1 ? (
            <Catalog />
        ) : navigate == 2 ? (
            <Upload />
        ) : (
            <EditProduct nameInp={name} descriptionInp={description} priceInp={price} veganInp={vegan} cat={cat} bannerInp={bannerInp} foodId={foodId} />
        );
    }
}

const sty = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: colors.dark,
    },

    biggrid: {
        width: "90%",
        height: (40 * width) / 100,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "5%",
        marginBottom: "5%",
        borderRadius: 10,
        flexDirection: "row",
        // backgroundColor: "blue",
        justifyContent: "space-around",
        borderBottomColor: "gray",
        borderBottomWidth: 1,

    },
    grid: {
        width: "30%",
        height: "80%",
        borderRadius: 10,
    },
    grid1: {
        width: "60%",
        height: "80%",
        // backgroundColor: "red",
        justifyContent: "space-around"
    },
    head: {
        width: "100%",
        height: (15 * width) / 100,
        justifyContent: "center",
        paddingLeft: "5%",
    },
    headText: {
        fontSize: (7 * width) / 100,
    },
    catText: {
        fontSize: (5 * width) / 100,
        // fontWeight: "700",
        // fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
    catTextPro: {
        fontSize: (5 * width) / 100,
        marginLeft: "5%",
        color: "gray"
    },
    catText1: {
        fontSize: (4 * width) / 100,
    },
    catText2: {
        fontSize: (4 * width) / 100,
    },
});

export default Category;
