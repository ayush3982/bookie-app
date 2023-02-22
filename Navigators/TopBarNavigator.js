import React, {useCallback, useState, useEffect, useLayoutEffect  } from 'react';
import { useFocusEffect } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import AvailableShifts from '../Screens/AvailableShifts';
import CitySlots from '../Screens/CitySlots';
import axios from 'axios';
import baseURL from '../baseURL';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {

  const [cities, setCities] = useState();
  const [areaCountArray, setAreaCountArray] = useState();

  useFocusEffect(
      useCallback(() => {
          axios.get(`${baseURL}`)
              .then(response => {
                  setCities(response.data);
                  setAreaCountArray(getAreaCountArray(response.data));
              })
              .catch(error => {
                  console.error(error);
              })
          return () => {
              setCities();
              setAreaCountArray();
          }
      }, [])
  )

    const getAreaCountArray = (myArray) => {
        const areaCountArray = myArray.reduce((acc, obj) => {
          const index = acc.findIndex((item) => item.area === obj.area);
          if (index !== -1) {
            acc[index].count += 1;
          } else {
            acc.push({ area: obj.area, count: 1 });
          }
          return acc;
        }, []);
        return areaCountArray;
    }

    return (
        
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelPosition: 'below-icon',
                    tabBarLabelStyle: { fontSize: 18, textTransform: 'capitalize'},
                    tabBarStyle: { height: 65, display: 'flex', justifyContent: 'center' },
                    tabBarActiveTintColor: '#004fb4',
                    tabBarInactiveTintColor: '#A4B8D3',
                    tabBarIndicatorStyle: { backgroundColor: 'null', height: 3 },
                }}
            >
                {!areaCountArray && (
                  <Tab.Screen name="Loading..." component={AvailableShifts} />
                )}
                {areaCountArray && (
                  <Tab.Screen name= {`${areaCountArray[0].area} (${areaCountArray[0].count})`} component={AvailableShifts} />
                )}
                {areaCountArray && areaCountArray.map((item, index) => {
                  if (index !== 0) {
                    return (
                      <Tab.Screen name= {`${item.area} (${item.count})`} component={CitySlots} />
                    )
                  }
                })}
            </Tab.Navigator>

    );

}

const TopTabNavigator = () => {

      

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopTab />
        </SafeAreaView>
    );
}

export default TopTabNavigator;