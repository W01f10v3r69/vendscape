import React from 'react';
import { Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import AppActivityIndicator from './AppActivityIndicator';

const { width, height } = Dimensions.get("window");

function AppButton({title, name, icon, onPress, color= 'primary', indicator }) {
    
    return (
       <TouchableOpacity style={[styles.button, {backgroundColor: colors[color]}]} onPress={onPress}>
           {icon && <MaterialCommunityIcons style={styles.icon} name={name} size={22} color={colors.primary} />}
           {indicator && <AppActivityIndicator color={colors.primary} size='small' />}
           <Text style={styles.text}>{title}</Text>
       </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "5%",
        // flexDirection: 'row'
        // width:(40 * width) / 100
    },

    text: {
        fontSize: 17,
        color: colors.white,
        fontWeight: 'bold',
        textAlign:"center"
    },

    icon: {
        color: colors.primary,
        marginRight: 20,
        fontWeight: 'bold'
    }

})

export default AppButton;