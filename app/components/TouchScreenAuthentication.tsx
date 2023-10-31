import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

function TouchScreenAuthentication() {
  const checkAndAuthenticate = async () => {
    
    const authenticateAsync = await LocalAuthentication.authenticateAsync();
    const methodsOfAuthentication = await LocalAuthentication.getEnrolledLevelAsync();
    const hasHardwareAsync = await LocalAuthentication.hasHardwareAsync();
    const supportedAuthenticationTypesAsync = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log("🚀 ~ file: TouchScreenAuthentication.tsx:12 ~ checkAndAuthenticate ~ supportedAuthenticationTypesAsync:", supportedAuthenticationTypesAsync)
    console.log("🚀 ~ file: TouchScreenAuthentication.tsx:11 ~ checkAndAuthenticate ~ hasHardwareAsync:", hasHardwareAsync)
    console.log("🚀 ~ file: TouchScreenAuthentication.tsx:10 ~ checkAndAuthenticate ~ methodsOfAuthentication:", methodsOfAuthentication)
    
    if(authenticateAsync.success === true) {
        console.log("🚀 ~ file: TouchScreenAuthentication.tsx:8 ~ checkAndAuthenticate ~ availableMethods:", authenticateAsync)
    }
    
    // if (availableMethods.includes('faceID') || availableMethods.includes('fingerprint')) {
    //   const result = await LocalAuthentication.authenticateAsync({
    //     promptMessage: 'Authenticate to access your app',
    //     cancelLabel: 'Cancel',
    //     fallbackLabel: 'Use Passcode',
    //   });

    //   if (result.success) {
    //     // Authentication successful
    //     console.log('Authentication successful');
    //   } else {
    //     // Authentication failed
    //     console.log('Authentication failed');
    //   }
    // }
  };

  return (
    <View>
      <Text>Touch Screen Authentication</Text>
      <Button title="Authenticate" onPress={checkAndAuthenticate} />
    </View>
  );
}

export default TouchScreenAuthentication;
