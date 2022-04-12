import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import road from "./assets/cars/road.png";

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [position, setPosition] = useState(0);
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };
  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    let newPosition = position;
    if ((Math.abs(data.x) > 0, 1)) {
      setPosition(newPosition + data.x * 7);
    }
    return () => _unsubscribe();
  }, [data.x]);

  const { x, y, z } = data;

  return (
    <View style={styles.container}>
      <View style={styles.contik}>
        <ImageBackground source={road} resizeMode="cover" style={styles.image}>
        </ImageBackground>

        <Image
          source={require("./assets/cars/red_car.png")}
          style={{
            width: 32,
            height: 54,
            position: "absolute",
            bottom: 50,
            left: position + "%",
          }}
        />
      </View>
      
      <View style={styles.buttonContainer}>
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
function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}
const styles = StyleSheet.create({
  contik:{
    position:"relative",
    width:"100%",
    height:"70%"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    maxWidth:720,
    margin:"auto"
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
