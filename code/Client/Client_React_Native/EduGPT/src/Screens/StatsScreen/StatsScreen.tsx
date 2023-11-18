import { View, Text } from 'react-native'
import React from 'react'
import CustomWebView from '../../Components/WebView/CustomWebView'

const StatsScreen = () => {
  return (
    <CustomWebView webviewUrl={"https://65572e38447a837804abf719--stalwart-naiad-fbb5b1.netlify.app/progress/test1"}/>
  )
}

export default StatsScreen