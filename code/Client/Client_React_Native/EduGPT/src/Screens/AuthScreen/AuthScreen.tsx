import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import CustomWebView from '../../Components/WebView/CustomWebView';
import { useSelector } from 'react-redux';


const AuthScreen = () => {
    const navigation = useNavigation();
    const data = useSelector(state => state.app);
    const [loggedIn, setLoggedIn] = useState(false);
    const [ref, setRef]=useState(null)



    useEffect(() => {
        loggedIn ||data.loggedIn  && navigation.dispatch(
            StackActions.replace('botnavcontroller', {
            })
        );
    }, [])

    return (
        <CustomWebView webviewUrl={"https://65572e38447a837804abf719--stalwart-naiad-fbb5b1.netlify.app/"}/>
    )
}

export default AuthScreen