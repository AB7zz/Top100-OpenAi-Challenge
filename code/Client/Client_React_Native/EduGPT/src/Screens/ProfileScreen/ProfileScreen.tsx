import { View, Text } from 'react-native'
import React from 'react'
import CustomWebView from '../../Components/WebView/CustomWebView'

const ProfileScreen = () => {
  return (
    <CustomWebView webviewUrl={"https://reactnavigation.org/docs/headers/"}/>
  )
}

export default ProfileScreen