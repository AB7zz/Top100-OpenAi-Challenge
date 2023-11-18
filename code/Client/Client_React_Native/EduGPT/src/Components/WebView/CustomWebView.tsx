import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Linking,
    NativeModules,
    PermissionsAndroid,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import { WebViewMessage } from 'react-native-webview/lib/WebViewTypes';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setUserType } from '../../Redux/App/appSlice';
import { AsyncSet } from '../../AsyncStorage/AsyncStorage';


const CustomWebView = ({ webviewUrl }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.app);

    const [webViewUrl, setWebViewUrl] = useState(webviewUrl);

    var webviewRef: WebView<{
        ref: unknown;
        onError: unknown;
        onShouldStartLoadWithRequest: unknown;
        onMessage: unknown;
        allowsProtectedMedia: true;
        originWhitelist: string[];
        allowUniversalAccessFromFileURLs: true;
        allowFileAccess: true;
        onLoad: () => void;
        javaScriptEnabled: true;
        domStorageEnabled: true;
        onNavigationStateChange: unknown;
        onHttpError: () => void;
        mixedContentMode: 'always';
        source: { uri: any };
        injectedJavaScript: '\n        chatAcceptAction();\n        window.addEventListener(\n          "message",\n          (event) => {\n            window.ReactNativeWebView.postMessage(JSON.stringify(event.data));\n          },\n          false\n        );\n        ';
        incognito: boolean;
    }> | null;

    console.log(data)
    
    const navigation = useNavigation();

    // useEffect(() => {
    //     setWebViewUrl(webviewUrl);
    // }, [webviewUrl]);



    const handleNavigationStateChange = async (e: WebViewNavigation) => {

    };

    const handleWebViewLoad = () => {
    };

    const onMessage = async (event: WebViewMessage) => {
        try {
            const postMessage = JSON.parse(event.data);
            console.log('Post Message: '+ postMessage);
            dispatch(setLoggedIn(true))
            dispatch(setUserType(postMessage.userType))
  

        } catch { }
    };
    return (
        <WebView
            ref={ref => (webviewRef = ref)}

            startInLoadingState={true}
            onMessage={e => onMessage(e.nativeEvent)}
            allowsProtectedMedia
            originWhitelist={['http://*', 'https://*']}
            allowUniversalAccessFromFileURLs={true}
            allowFileAccess={true}
            onLoad={handleWebViewLoad}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onNavigationStateChange={e => handleNavigationStateChange(e)}

            mixedContentMode={'always'}
            source={{ uri: webviewUrl }}
            injectedJavaScript={`
        window.getSelection().removeAllRanges();
        document.body.style.userSelect = 'none';
        const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    document.getElementsByTagName('head')[0].appendChild(meta);

      window.addEventListener(
        "message",
        (event) => {
          window.ReactNativeWebView.postMessage(JSON.stringify(event.data));
        },
        false
      );
      `}
        />
    )

};

export default CustomWebView;

const styles = StyleSheet.create({
    cont: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    pageError: {
        width: "100%",
        height: "100%",
    },
});
