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
    backgroundColor: "#576CBC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default Score;
