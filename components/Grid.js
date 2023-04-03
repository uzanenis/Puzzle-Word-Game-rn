import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";

export default function Grid() {
  const [matrix, setMatrix] = useState(Array(8).fill(Array(10).fill("")));
  const [position, setPosition] = useState({ top: 0, left: 50 });
  useEffect(() => {
    // 8. satır için rastgele harfler oluştur
    let row8 = getRandomLetters(10);
    // 7. satır için rastgele harfler oluştur
    let row7 = getRandomLetters(10);
    // 6. satır için rastgele harfler oluştur
    let row6 = getRandomLetters(10);
    // matrisi güncelle
    setMatrix([...matrix.slice(0, 5), row6, row7, row8]);
  }, []);

  // rastgele harfler üreten bir fonksiyon
  const getRandomLetters = (count) => {
    const vowels = ["a", "e", "ı", "i", "o", "ö", "u", "ü"];
    const consonants = [
      "b",
      "c",
      "ç",
      "d",
      "f",
      "g",
      "ğ",
      "h",
      "j",
      "k",
      "l",
      "m",
      "n",
      "p",
      "r",
      "s",
      "ş",
      "t",
      "v",
      "y",
      "z",
    ];
    let letters = [];

    // Başlangıçta bir sessiz harf ekle
    letters.push(consonants[Math.floor(Math.random() * consonants.length)]);

    for (let i = 1; i < count; i++) {
      // rastgele bir harf seç
      let letter;
      if (vowels.includes(letters[i - 1])) {
        // Önceki harf bir sesli ise, sessiz bir harf seç
        letter = consonants[Math.floor(Math.random() * consonants.length)];
      } else {
        // Önceki harf bir sessiz ise, sesli bir harf seç
        letter = vowels[Math.floor(Math.random() * vowels.length)];
      }

      // Kontrol et, eğer aynı türdeki harfler yan yana veya alt alta gelirse, farklı bir harf seç
      if (vowels.includes(letter)) {
        let prevLetter = letters[i - 1];
        // Eğer önceki harf de sesli ise, farklı bir sesli harf seç
        while (vowels.includes(prevLetter) || letter === prevLetter) {
          letter = vowels[Math.floor(Math.random() * vowels.length)];
          prevLetter = letters[i - 1];
        }
      } else {
        let prevLetter = letters[i - 1];
        // Eğer önceki harf de sessiz ise, farklı bir sessiz harf seç
        while (consonants.includes(prevLetter) || letter === prevLetter) {
          letter = consonants[Math.floor(Math.random() * consonants.length)];
          prevLetter = letters[i - 1];
        }
      }

      letters.push(letter);
    }

    // harfleri karıştır
    letters.sort(() => Math.random() - 0.5);

    return letters;
  };

  const addPositions = () => {
    const newPositions = matrix.map((row, rowIndex) => {
      return row.map((letter, columnIndex) => {
        return {
          top: rowIndex * 50,
          left: columnIndex * 50,
        };
      });
    });
    setPosition(newPositions);
  };

  setInterval(() => {
    //addPositions();
    const newPositions = { top: position.top + 50, left: position.left };
    setPosition(newPositions);

    if (position.top > 200) {
      setPosition({ top: 0, left: 50 });
      return clearInterval();
    }
  }, 100);

  const checkWord = () => {
    let word = inputValue.trim().toLowerCase();
    let newMatrix = [...matrix];
    let isValid = true;

    // kelimeyi oluşturan harfler matriste yoksa, isValid değişkenini false yap
    for (let i = 0; i < word.length; i++) {
      let found = false;
      for (let j = 0; j < newMatrix.length; j++) {
        if (newMatrix[j].includes(word[i])) {
          found = true;
          newMatrix[j][newMatrix[j].indexOf(word[i])] = "";
          break;
        }
      }
      if (!found) {
        isValid = false;
        break;
      }
    }

    // matrisi güncelle
    if (isValid) {
      for (let i = 1; i < newMatrix.length; i++) {
        for (let j = 0; j < newMatrix[i].length; j++) {
          if (newMatrix[i][j] === "") {
            newMatrix[i][j] = newMatrix[i - 1][j];
            newMatrix[i - 1][j] = ""; // üstte kalan değerler için kontrol gerekecek. şimdilik böyle
          }
        }
      }
      setMatrix(newMatrix);
      setInputValue("");
    }
  };

  return (
    <View style={styles.map}>
      <View style={[styles.box, position]}>
        <Text>A</Text>
      </View>
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter, columnIndex) => (
            <View key={columnIndex} style={styles.cell}>
              <Text style={styles.letter}>{letter}</Text>
            </View>
          ))}
        </View>
      ))}
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
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "black",
    margin: 2,

    //maxWidth: 50,
  },

  letter: {
    color: "white",
    fontSize: 20,
  },

  box: {
    position: "absolute",
    backgroundColor: "red",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
