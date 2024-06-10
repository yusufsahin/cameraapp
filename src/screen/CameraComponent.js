import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  let cameraRef = null;

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const recordVideo = async () => {
    if (cameraRef && !isRecording) {
      setIsRecording(true);
      const options = { maxDuration: 60 };
      const data = await cameraRef.recordAsync(options);
      console.log(data.uri);
      setIsRecording(false);
    } else if (cameraRef && isRecording) {
      cameraRef.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={(ref) => {
          cameraRef = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={true}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== 'READY') return <Text>Waiting</Text>;
          return (
            <View style={styles.captureContainer}>
              <TouchableOpacity onPress={takePicture} style={styles.capture}>
                <Text style={styles.captureText}> SNAP </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={recordVideo} style={styles.capture}>
                <Text style={styles.captureText}>
                  {isRecording ? 'STOP' : 'RECORD'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    fontSize: 14,
  },
});

export default CameraComponent;
