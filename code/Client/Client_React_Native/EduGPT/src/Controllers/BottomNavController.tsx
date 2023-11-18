import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import StatsScreen from '../Screens/StatsScreen/StatsScreen';
import { BottomNavBar } from '../Components/Navigation/BottomNavBar';
import AddScreen from '../Screens/AddScreen/AddScreen';
import StudyScreen from '../Screens/StudyScreen/StudyScreen';
import { useSelector } from 'react-redux';
import { AsyncGet } from '../AsyncStorage/AsyncStorage';
import { Text, View } from 'react-native';
import MainScreen from '../Screens/MainScreen/MainScreen';
import { primaryColor } from '../Constants/constants';
import TabBtn from '../Components/TabBtn/TabBtn';

const BottomNavController = () => {
  const Tab = createBottomTabNavigator();
  const data = useSelector(state => state.app);
  const [userType, setUserType]=useState(null);


  console.log(data.userType)
  return (

    <Tab.Navigator tabBar={props => <BottomNavBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      {
        data.userType=="teacher"&&<Tab.Screen name="Add" component={AddScreen} options={{ headerShown: false }} />
      }
      {
        data.userType!="teacher"&&<Tab.Screen name="Study" component={StudyScreen} options={{ headerShown: false }} />
      }

      <Tab.Screen name="Stats" component={StatsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}



export default BottomNavController