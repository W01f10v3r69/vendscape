import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import defaultStyles from '../config/styles';
import colors from '../config/colors';


function AppTextInput({icon, style, ...otherProps}) {
    return (
        <View style={[styles.container, style]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.mildGray} style={styles.icon} />}
            <TextInput
            placeholderTextColor={colors.mildGray}
            style={[defaultStyles.text, styles.inputField]} {...otherProps} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightGray,
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center'
    },

    inputField: {
        width: '100%'
    },    

    icon: {
        marginRight: 10
    }
})

export default AppTextInput;