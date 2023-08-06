import { StatusBar } from "expo-status-bar";
import { Camera, CameraType } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from "react-native";
import Button from "./Button";
import {Link} from "expo-router";
import { navigationRef, isReadyRef, navigate } from "../rootNavigation";

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0",
    height: width,
    width: width,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#0f0',
    height: width,
    width: width,
  },
});

export default function CameraPage() {
  
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = useState(false);

  // const to store image uri (used to display image)
  const [image, setImage] = useState(null);

  // camera
  const cameraRef = useRef(null);

  // the camera must be loaded in order to 
  // access the supported ratios
  const setCameraReady = async() => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    };
  }, []);

  // ask permission and display camera
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      requestPermission(cameraStatus.status === "granted");
      
    })();
  }, []);

  // capture picture
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log("data: ", data);
        setImage(data.uri);
      } catch (e) {
        console.log("error taking picture: ", e);
      }
    }
  };

  // save image to local phone
  const saveImage = async ()  => {
    if (image){
      try{
        await MediaLibrary.createAssetAsync(image);
        setImage(null)
        alert('Picture saved!🐻🎉')
        await MediaLibrary.saveToLibraryAsync(image)
        console.log(image)
        navigate('Result', {image})
      } catch(e) {
        console.log("error saving image: ", e)
      }
    }
  }

  // if no persmission granted
  if (!permission) {
    return <Text>No access to camera</Text>;
  }

  // if image taken, show image, else show camera
  return (
    <View style={styles.container}>
        {!image ? (
          <Camera style={styles.camera} type={type} ref={cameraRef} ratio="1:1">
          </Camera>
        ) : (
          <Image source={{uri: image}} style ={styles.camera}/>
        )}

      <View>
        {image ?
          <View style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            height: width,
            width: width
          }}>
            <Button title={"Retake"} icon = "retweet" onPress={() => setImage(null)}/>
            <Button title={"Proceed"} icon = "camera" onPress={() => saveImage(image)}/>

          </View >

          : <Button title={"Take a picture"} icon="camera" onPress={takePicture} />     
        }
      </View>

    </View>
  );
}

