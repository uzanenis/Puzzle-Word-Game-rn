import { View, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import Score from "../components/Score";
import Grid from "../components/Grid";

const Game = () => {
  const [score, setScore] = useState(0);
  return (
    <View>
      <View style={styles.container}>
        <Score score={score} />
      </View>
      <Grid />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Game;
