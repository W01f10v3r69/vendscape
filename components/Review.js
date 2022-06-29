import React from 'react';
import { Text, View, StyleSheet,Dimensions,ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import AppActivityIndicator from './AppActivityIndicator';

const { width, height } = Dimensions.get("window");

function Review({pro_pic,reviewer,rant}) {
    
    return (
    //    <View style={[styles.button, {backgroundColor: colors[color]}]} onPress={onPress}>
       <View style={styles.R} >
        <View style={styles.Sub_R}>
        <ImageBackground
              source={{uri:pro_pic}}
              resizeMode="cover"
              style={styles.pic}
              imageStyle={{ width: (5 * width) / 100,height:(5 * width) / 100, borderRadius: 800 }}
            ></ImageBackground>
          <Text style={styles.R_Head}>{reviewer}</Text>
        </View>
          <Text style={styles.R_para}>{rant}</Text>
       </View>
    );
}

const styles = StyleSheet.create({
    R: {
        width: '100%',
        marginBottom:"5%"
        // height:(40 * width) / 100
    },
    Sub_R: {
        width: '100%',
        // backgroundColor:"red",
        flexDirection:"row",
        alignItems: 'center',
    },
    pic: {
        height:(5 * width) / 100,
        width:(5 * width) / 100,
        backgroundColor:"black",
        borderRadius:800,
        marginRight:"2%"
    },
    R_Head: {
       fontWeight:"700",
       fontSize:(5 * width) / 100,
        color:"#0261aa"

    },
    R_para: {
        marginLeft:"8.5%",
        color:"#00213b"


    },

   

})

export default Review;