import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";

export default function Grid() {
  const [matrix, setMatrix] = useState(Array(10).fill(Array(8).fill("")));
  const [inputValue, setInputValue] = useState("");
  const [lettersIndex, setLettersIndex] = useState([]);
  useEffect(() => {
    // 8. satır için rastgele harfler oluştur
    let row10 = getRandomLetters(8);
    // 7. satır için rastgele harfler oluştur
    let row9 = getRandomLetters(8);
    // 6. satır için rastgele harfler oluştur
    let row8 = getRandomLetters(8);
    // matrisi güncelle
    setMatrix([...matrix.slice(0, 7), row8, row9, row10]);
  }, []);

  const getRandomLetter = () => {
    const letters = ["a", "e", "ı", "i", "o", "ö", "u", "ü", "b", "c", "ç", "d", "f", "g", "ğ", "h", "j", "k", "l", "m", "n", "p", "r", "s", "ş", "t", "v", "y", "z"];
    return letters[Math.floor(Math.random() * letters.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let counter = 0;
      setMatrix((prevMatrix) => {
        const newMatrix = prevMatrix.map((row) => [...row]); // matrix kopyasını oluştur
        for (let j = 0; j < newMatrix[0].length; j++) {
          let filled = false; // hücre dolduruldu mu kontrolü
          for (let i = newMatrix.length - 1; i >= 0; i--) {
            if (newMatrix[i][j] === "" && newMatrix[i + 1][j] !== "" && !filled) {
              const randomLetter = getRandomLetter();
              newMatrix[i][j] = randomLetter;
              filled = true; // hücre dolduruldu
              if (i == 0)
                counter++;
                counter === matrix[matrix.length - 1].length ? console.log("Kaybettin") : console.log("Devam")
            }
          }
        }
        return newMatrix;
      });
    }, 1000);
    return () => clearInterval(interval);
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

  const letterClick = (letter, rowIndex, columnIndex) => {
    setInputValue(inputValue + letter);
    setLettersIndex([...lettersIndex, [rowIndex, columnIndex]]);
  };

  const checkWord = () => {
    let word = inputValue.trim().toLowerCase();
    let newMatrix = [...matrix];
    let isValid = true;
    let lettersIndexes = [...lettersIndex]
    if (isValid) {
      for (let i = 0; i < lettersIndexes.length; i++) {
        let [rowIndex, columnIndex] = lettersIndexes[i];
        for (let j = rowIndex; j > 0; j--) {
          newMatrix[j][columnIndex] = newMatrix[j - 1][columnIndex];
        }
      }
      setMatrix(newMatrix);
      setInputValue("");
      setLettersIndex([]);
    }
  };

  return (
    <View style={styles.map}>
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter, columnIndex) => (
            <TouchableOpacity
              key={columnIndex}
              style={styles.cell}
              onPress={() => letterClick(letter, rowIndex, columnIndex)}
            >
              <Text style={styles.letter}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Kelime girin"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <TouchableOpacity style={styles.button} onPress={checkWord}>
        <Text style={styles.buttonText}>Kelimeyi Kontrol Et</Text>
      </TouchableOpacity>
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
    fontSize: 21,
  },

  box: {
    position: "absolute",
    backgroundColor: "red",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginVertical: 10,
    fontSize: 20,
    minWidth: 250,
    maxWidth: 250,
    borderRadius: 5,
  },
});
