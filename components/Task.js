import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const Task  = (props) => {
    return (
        <View style={styles.item}>
            <Text style={[styles.itemText, props.completed ? styles.completedText : styles.uncompletedText]}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'left',
        flexWrap: 'wrap',
    },
    itemText:{
        maxWidth: '100%',
        fontSize: 24, 
        fontWeight: 'bold',
        justifyContent: "center",
        alignItems: 'center'
    },
    completedText:{
        textDecorationLine: 'line-through',
    },
    uncompletedText:{
        textDecorationLine: 'none',
    },
});

export default Task;