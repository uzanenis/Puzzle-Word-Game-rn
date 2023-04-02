import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";

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
      </View>

      <View style={styles.row}>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
        <View style={styles.cell}></View>
      </View>
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
    flexDirection: "row",
    alignSelf: "stretch",
  },

  cell: {
    backgroundColor: "green",
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "black",
    margin: 2,
    //maxWidth: 50,
  },
});
