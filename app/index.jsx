import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { CameraType } from "expo-camera/build/Camera.types"
import React, { useState, useContext } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { Button, StyleSheet, Text, TouchableOpacity, View, Pressable, SafeAreaView } from 'react-native';
import { ThemeContext } from "@/context/ThemeContext";

export default function App() {
  
  const [permission, requestPermission] = useCameraPermissions();
  const [barcodeData, setBarcodeData] = useState('');
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const router = useRouter();
  
  useFocusEffect(
    React.useCallback(() => {
      setBarcodeData(null);
    },[])
  );

  const handleSacnnedBarcode = ({ data }) => {
    if(!barcodeData){
      setBarcodeData(data);
      router.push({
        pathname: "/ScannedResult",
        params: {barcode: data}
      });
    }
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Pressable onPress={requestPermission}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
        </Pressable>
      </View>
    );
  }
  
  const styles = createStyles(theme, colorScheme);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <CameraView 
          style={styles.camera}
          onBarcodeScanned={barcodeData ? undefined : handleSacnnedBarcode}
        >
        </CameraView>
      </View>
      
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>ID: {barcodeData}</Text>
      </View>
    </SafeAreaView>
    
    
    
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    wrapper:{
      flex: 1,
      width: '100%',
      backgroundColor: theme.background,
      
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: 300,
      height: 400,
      marginTop: 50,
      marginHorizontal: 'auto',
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 7,
    },
    camera: {
      flex: 1,
      borderRadius: 5,
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    text: {
      flex: 1,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      color: 'white',
    },
  });
}