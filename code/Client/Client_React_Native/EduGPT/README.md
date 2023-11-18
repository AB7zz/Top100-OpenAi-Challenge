missingDimensionStrategy 'react-native-camera', 'general'
add this here
   defaultConfig {
        missingDimensionStrategy 'react-native-camera', 'general'
        applicationId "com.edugpt"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
 android/app/build.gradle in android
 error: Could not resolve project :react-native-camera. on Android