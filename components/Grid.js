import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Matrix from "./Matrix";
export default function Grid() {
  return (
    <View style={styles.map}>
      <View style={styles.row}>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
      </View>
      <Matrix style={styles.matrix}></Matrix>
    </View>
    
  );
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: "blue",
    alignSelf: "stretch",
    height: "100%",
  },

  row: {
    backgroundColor: "red",
    flexDirection: "row",
    alignSelf: "stretch",
    height: 50,
  },

  cell: {
    backgroundColor: "green",
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
  },
});
