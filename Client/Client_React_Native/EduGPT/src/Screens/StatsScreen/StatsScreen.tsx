import { View, Text } from 'react-native'
import React from 'react'
import CustomWebView from '../../Components/WebView/CustomWebView'

const StatsScreen = () => {
  return (
    <CustomWebView webviewUrl={"https://www.npmjs.com/package/react-native-rename"}/>
  )
}

export default StatsScreen