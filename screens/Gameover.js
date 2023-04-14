import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";

const Gameover = ({ navigation, route }) => {
  const onPress = () => {
    navigation.navigate("Menu");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.score}>{route.params.score} puan!</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <View>
            <Text style={styles.buttonText}>Play Word Challange Again!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  score: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#576CBC",
    marginTop: 40,
  },

  buttonContainer: {
    backgroundColor: "#bbb",
    padding: 20,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Gameover;
