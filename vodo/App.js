import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import React, { useState, useEffect, useContext } from "react";

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
    z: 0, //neni treba
  });
  const [subscription, setSubscription] = useState(null);
  const [back, setBack] = useState("crimson");

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(20);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      }),
      Accelerometer.setUpdateInterval(30)
    );
  };
  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    let newPosition = position;

    if ((Math.abs(data.x) >= 0.01 || Math.abs(data.y) >= 0.01)) {
      if(newPosition.x>=100){
        newPosition.x = 99.99
      }
      else if(newPosition.y<=0){
        newPosition.y = 0.0001
      }
      else if(newPosition.x<=0){
        newPosition.x = 0.0001
      }
      else if(newPosition.y>=100){
        newPosition.y = 99.99
      }
      else{
        newPosition.x += data.x*2;
        newPosition.y += data.y*2;
      }
      setBack("crimson");
    }
    else{
      newPosition.x=50;
      newPosition.y=50;
      setBack("green");
    }
    
    setPosition(newPosition);
    return () => _unsubscribe();
  }, [data.x]);

  const { x, y, z } = data;

  return (
    <View style={styles.container}>
      <View style={{
           position: "relative",
           width: "100%",
           height: "70%",
           margin: 0,
           padding: 0,
           backgroundColor: back,
          }}>
        <View
          style={{
            width: 32,
            height: 32,
            position: "absolute",
            borderRadius: "50%",
            bottom: position.y + "%",
            left: position.x + "%",
            backgroundColor: "darkgray",
            boxShadow: "0px 0px 1px 2px dimgray",
            transform: [
              { translateX: "" },
              {translateY:""}
              
        
            ],
          }}
        ></View>
      </View>
      <View style={styles.buttonContainer}>
        <Text>
          {position.x}
        </Text>

        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "On" : "Off"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contik: {
    position: "relative",
    width: "100%",
    height: "70%",
    margin: 0,
    padding: 0,
    backgroundColor: "crimson",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
