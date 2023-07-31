import { StatusBar } from "expo-status-bar";
import { Camera, CameraType } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "./Button";

export default function CameraPage() {
  
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = useState(false);

  // const to store image uri (used to display image)
  const [image, setImage] = useState(null);

  // camera
  const cameraRef = useRef(null);

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
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // save image to local phone
  const saveImage = async ()  => {
    if (image){
      try{
        await MediaLibrary.createAssetAsync(image);
        alert('Picture saved!🐻🎉')
        setImage(null)
      } catch(e) {
        console.log(e)
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
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <Text>Hello</Text>
          </Camera>
        ) : (
          <Image source={{uri: image}} style ={styles.camera}/>
        )}

      <View>
        {image ?
          <View style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            paddingHorizontal: 50
          }}>
            <Button title={"Retake"} icon = "retweet" onPress={() => setImage(null)}/>
            <Button title = {"Save"} icon = "check" onPress={saveImage}/>
          </View>

          : <Button title={"Take a picture"} icon="camera" onPress={takePicture} />     
        }
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",

    paddingBottom: 40,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
});
