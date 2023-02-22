import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import BookButton from '../Components/BookButton';
import LoaderButton from '../Components/LoaderButton';
import axios from 'axios';
import baseURL from '../baseURL';

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#F7F8FB',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingLeft: 20,
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
        height: 60,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    timeContainer: {
        justifyContent: 'center',
        width: 100,
    },
    time: {
        fontSize: 18,
        color: '#4f6c92',
    },
    statusContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 120,
        height: "100%",
    },
})

const CitySlots = (props) => {

    const route = useRoute();

    const name = route.name;

    const extractedString = name.substring(0, name.indexOf("(")).trim();

    const [cityData, setCityData] = useState();

    const getCitySlots = (data) => {
        const jsonData = data;
        const filteredData = jsonData.filter(item => item.area === extractedString);
        const groupedData = {}
        filteredData.forEach(item => {
            const unixTimestamp = item.startTime; // example timestamp
            const date = new Date(unixTimestamp);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString();
            const key = `${day}/${month}/${year}`;
            if (!groupedData[key]) {
                groupedData[key] = []
            }
            groupedData[key].push(item)
        })
        groupedData[Object.keys(groupedData)[0]].sort((a, b) => a.startTime - b.startTime);
        setCityData(groupedData)
    }

    useFocusEffect (
        useCallback(() => {
            axios.get(`${baseURL}`)
            .then((response) => {
                getCitySlots(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }, [])
    )

    const AvailableItem = (props) => {

        const {startTime, endTime, booked} = props;
        const [loading, setLoading] = useState(false);



        const handleLoading = async () => {
            if(status === "disabled") {
                return;
            }
            setLoading(true);
            console.log(props.id)
            try {
                const response = await axios.post(`http://192.168.1.40:8080/${props.id}/book`);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        let status = "Available";

        const convertTime = (time) => {
            const date = new Date(time); // Unix timestamp is in seconds, so convert to milliseconds
            const hours = date.getHours() ; // Convert to IST hours (+5:30)
            const minutes = date.getMinutes();
            const formattedHours = hours < 10 ? "0" + hours : hours; // Add leading zero if needed
            const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if needed
            const timeInIST = formattedHours + ":" + formattedMinutes; // Concatenate hours and minutes with colon
            return timeInIST; 
        }

        const isCurrentTimeInRange = (startTime, endTime) => {
            const now = Date.now();
            if(now >= endTime) {
                return false;
            } else if( now < startTime) {
                return true;
            } else {
                return false;
            }
        }

        const setStatus = (startTime, endTime) => {
            if(isCurrentTimeInRange(startTime, endTime)) {
                status = "book";
            } 
            
            else if(booked === true) {
                status = "Booked";
            }

            else {
                status = "disabled";
            }
        }

        setStatus(startTime, endTime);
        const start = convertTime(startTime);
        const end = convertTime(endTime);

        return (
            <View style = {styles.BookedShiftContainer}>
                <View style = {styles.timeContainer}>
                    <Text style = {styles.time}>{`${start}-${end}`}</Text>
                </View>
                <View style = {styles.statusContainer}>
                    <Text style = {{
                        fontSize: 18,
                        color: props.status === "Booked" ? '#4f6c92' : props.status === "Overlapping" ? '#E2006A' : '#A4B8D3',
                        textAlign: 'right'
                    }}>
                       
                    </Text>
                </View>

               {!loading  ? (
                <TouchableOpacity onPress = {handleLoading}>
                    <BookButton text = "Book" type = {status}/>
                </TouchableOpacity>
               ) : (
                    <LoaderButton type = {status}/>
               )}
            </View>
        )
    }

    const SlotAvailable = (props) => {

        const {date} = props;

        const displayDate = (date) => {
            const today = new Date();
            const day = today.getDate().toString().padStart(2, '0');
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const year = today.getFullYear().toString();
            const todayDate = `${day}/${month}/${year}`;

            if(date === todayDate) {
                return "Today"
            } else {
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const first = props.data[0].startTime;
                const date = new Date(first);
                const nowDay = date.getDate().toString().padStart(2, '0');
                const nowMonth = months[date.getMonth()];
                return `${nowDay} ${nowMonth}`
            }
        }

        const display = displayDate(date);

        return (
            <View>
                <View style = {styles.header}>
                    <Text style = {styles.day}>{display}</Text>
                </View>
                {props.data.map((item) => {
                    return (
                        <AvailableItem startTime = {item.startTime} endTime = {item.endTime} status = "Booked" id = {item.id}/>
                    )
                })}
            </View>
        )
    }

    return (
        <ScrollView>
            {cityData && Object.keys(cityData).map((key) => {
                return (
                    <SlotAvailable data = {cityData[key]} key = {key} date = {key}/>
                )
            })}
        </ScrollView>
    )
}

export default CitySlots;