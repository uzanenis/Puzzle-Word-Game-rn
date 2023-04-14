import { View, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import Grid from "../components/Grid";

const Game = ({ navigation }) => {
  return (
    <View>
      <Grid navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Game;
