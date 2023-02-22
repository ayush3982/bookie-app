import React, {useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { useFocusEffect } from "@react-navigation/native"
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BookButton from '../Components/BookButton';
import axios from 'axios'

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#F7F8FB',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingLeft: 30,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
    },
    day: {
        fontSize: 17,
        color: '#4f6c92',
        marginRight: 20,
        fontWeight: 'bold',
    },
    duration: {
        fontSize: 17,
        color: '#A4B8D3',
        marginRight: 20,
    },
    BookedShiftContainer: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        height: 85,
        padding: 30,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    timeContainer: {
        justifyContent: 'center',
    },
    time: {
        fontSize: 18,
        color: '#4f6c92',
    },
    place: {
        fontSize: 18,
        color: '#A4B8D3',
    }
})

const MyShifts = () => {

    const data = [
        
           { "Today" : [
                {
                    "startTime": "14:00",
                    "endTime": "16:00",
                    "place": "Helsinki",
                    "status": "booked",
                    "cancel": "disabled"
                },
                {
                    "startTime": "14:00",
                    "endTime": "16:00",
                    "place": "Helsinki",
                    "status": "booked",
                    "cancel": "cancel"
                }
            ]},
            {"Tomorrow" : [
                {
                    "startTime": "12:00",
                    "endTime": "16:00",
                    "place": "Tampere",
                    "status": "booked",
                    "cancel": "cancel"
                }
            ]},
            {"September22" : [
                {
                    "startTime": "9:00",
                    "endTime": "11:00",
                    "place": "Turku",
                    "status": "booked",
                    "cancel": "cancel"
                },
                {
                    "startTime": "14:00",
                    "endTime": "16:00",
                    "place": "Turku",
                    "status": "booked",
                    "cancel": "cancel"
                }
            ]}
        
    ]

    // const [cities, setCities] = useState();
    // const [areaCountArray, setAreaCountArray] = useState();

    // useFocusEffect(
    //     useCallback(() => {
    //         axios.get('http://192.168.1.40:8080/shifts')
    //             .then(response => {
    //                 setCities(response.data);
    //                 setAreaCountArray(getAreaCountArray(response.data));
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             })
    //         return () => {
    //             setCities();
    //             setAreaCountArray();
    //         }
    //     }, [])
    // )

    // const getAreaCountArray = (myArray) => {
    //     const areaCountArray = myArray.reduce((acc, obj) => {
    //       const index = acc.findIndex((item) => item.area === obj.area);
    //       if (index !== -1) {
    //         acc[index].count += 1;
    //       } else {
    //         acc.push({ area: obj.area, count: 1 });
    //       }
    //       return acc;
    //     }, []);
    //     return areaCountArray;
    // }

    const BookedItem = (props) => {
        return (
            <View style = {styles.BookedShiftContainer}>
                <View style = {styles.timeContainer}>
                    <Text style = {styles.time}>{`${props.startTime}-${props.endTime}`}</Text>
                    <Text style = {styles.place}>{props.place}</Text>
                </View>
                <BookButton text = "Cancel" type = {props.status}/>
            </View>
        )
    }

    const BookedShift = (props) => {

        console.log(props.data.length)

        const duration = `${props.data.length} shifts, 4 h`

        return (
            <View>
               <View style = {styles.header}>
                    <Text style = {styles.day}>{props.header}</Text>
                    <Text style = {styles.duration}>{duration}</Text>
               </View>
                {props.data.map((item, index) => {
                    return <BookedItem key = {index} startTime = {item.startTime} endTime = {item.endTime} place = {item.place} status = {item.cancel}/>
                })}
            </View>
        )
    }
    

    return (

        <SafeAreaView>
            <ScrollView>
                <BookedShift header = "Today" data = {data[0].Today}/>
                <BookedShift header = "Tomorrow" data = {data[1].Tomorrow}/>
                <BookedShift header = "September 22" data = {data[2].September22}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyShifts;