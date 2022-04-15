import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import "../css/animate.css";
import yellow_car from "../assets/cars/yellow_car.png";
import green_car from "../assets/cars/green_car.png";
import orange_car from "../assets/cars/orange_car.png";
import purple_car from "../assets/cars/purple_car.png";
import black_car from "../assets/cars/black_car.png";
import randomCarGenerator from "../helpers/randomCarGenerator";
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "../providers/GameProvider";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
export const OponentCar = () => {
  let auta = [
    { url: yellow_car, position: -12, left: getRandomInt(1, 89) + "%" },
    { url: green_car, position: -12, left: getRandomInt(1, 89) + "%" },
    { url: orange_car, position: -12, left: getRandomInt(1, 89) + "%" },
    { url: purple_car, position: -12, left: getRandomInt(1, 89) + "%" },
    { url: black_car, position: -12, left: getRandomInt(1, 89) + "%" },
  ];
  const [auticka, setAuticka] = useState(auta[0]);
  
  const _addValue = () => {
    let newAuticka = auticka;
    newAuticka.position=-12;
    newAuticka = auta[getRandomInt(0, 5)];
    setAuticka(newAuticka);
    
  };
  const _setValue = () => {
    let newAuticka = auticka;
    newAuticka.position += 0.0224;
    setAuticka(newAuticka); //0,0224
  };

  const MINUTE_MS = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      _addValue();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);
  /*const CHANGE_POSITION_MS = 1;
  useEffect(() => {
    const interval = setInterval(() => {
      _setValue();
    }, CHANGE_POSITION_MS);

    return () => clearInterval(interval);
  }, []);*/
  return (
    <Image
      source={auticka.url}
      className="oponent"
      style={{
        width: 32,
        height: 54,
        position: "absolute",
        top: auticka.position + "%",
        left: getRandomInt(1, 89) + "%",
      }}
    />
  );
};
let styles = StyleSheet.create({
  imageStart: {
    width: 32,
    height: 54,
    position: "absolute",
    top: -12 + "%",
    left: getRandomInt(1, 89) + "%",
  },
});
export default OponentCar;
