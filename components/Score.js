import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Score = ({ score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Score;
