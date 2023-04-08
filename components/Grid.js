import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import words from "../words.json";
import Score from "./Score";

export default function Grid() {
  const [matrix, setMatrix] = useState(
    Array(10).fill(
      Array(8).fill({
        letter: "",
        isSelected: false,
      })
    )
  );
  const [inputValue, setInputValue] = useState("");
  const [lettersIndex, setLettersIndex] = useState([]);
  const [score, setScore] = useState(0);
  const [intervalTime, setIntervalTime] = useState(5000);
  const [wrongWordCount, setWrongWordCount] = useState(0);

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
    const letters = [
      "a",
      "e",
      "ı",
      "i",
      "o",
      "ö",
      "u",
      "ü",
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
            if (
              newMatrix[i][j].letter === "" &&
              newMatrix[i + 1][j].letter !== "" &&
              !filled
            ) {
              const randomLetter = getRandomLetter();
              newMatrix[i][j] = { isSelected: false, letter: randomLetter };
              filled = true; // hücre dolduruldu
              if (i == 0) counter++;
              counter === matrix[matrix.length - 1].length
                ? console.log("Kaybettin")
                : console.log("Devam");
            }
          }
        }
        return newMatrix;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  // 3 kere yanlış girildiğinde bir satırlık kelime ekliyor
  const addLetterRow = () => {
    let counter = 0;

    const newMatrix = matrix.map((row) => [...row]); // matrix kopyasını oluştur
    for (let j = 0; j < newMatrix[0].length; j++) {
      let filled = false; // hücre dolduruldu mu kontrolü
      for (let i = newMatrix.length - 1; i >= 0; i--) {
        if (
          newMatrix[i][j].letter === "" &&
          newMatrix[i + 1][j].letter !== "" &&
          !filled
        ) {
          const randomLetter = getRandomLetter();
          newMatrix[i][j] = { isSelected: false, letter: randomLetter };
          filled = true; // hücre dolduruldu
          if (i == 0) counter++;
          counter === matrix[matrix.length - 1].length
            ? console.log("Kaybettin")
            : console.log("Letter row");
        }
      }
    }
    return newMatrix;
  };
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
    letters.push({
      isSelected: false,
      letter: consonants[Math.floor(Math.random() * consonants.length)],
    });

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

      letters.push({
        isSelected: false,
        letter,
      });
    }

    // harfleri karıştır
    letters.sort(() => Math.random() - 0.5);

    return letters;
  };

  const calculatePoint = (word) => {
    const letterPoints = {
      a: 1,
      b: 3,
      c: 4,
      ç: 4,
      d: 3,
      e: 1,
      f: 7,
      g: 5,
      ğ: 8,
      h: 5,
      ı: 2,
      i: 2,
      j: 10,
      k: 1,
      l: 1,
      m: 2,
      n: 1,
      o: 2,
      ö: 7,
      p: 5,
      r: 1,
      s: 2,
      ş: 4,
      t: 1,
      u: 3,
      ü: 7,
      v: 7,
      y: 3,
      z: 4,
    };

    let point = 0;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      point += letterPoints[letter];
    }

    return point;
  };

  const letterClick = (letter, rowIndex, columnIndex) => {
    //TODO: Harf tekrar basıldığında inputtan silinmeli
    if (letter.isSelected) {
      setInputValue(inputValue.slice(0, -1));
      setLettersIndex(lettersIndex.slice(0, -1));
      matrix[rowIndex][columnIndex].isSelected = false;
    } else {
      setInputValue(inputValue + letter.letter);
      setLettersIndex([...lettersIndex, [rowIndex, columnIndex]]);
      matrix[rowIndex][columnIndex].isSelected = true;
    }

    // Seçilenin isSelected değerini değiştir
  };

  const checkWord = () => {
    let word = inputValue.trim().toLowerCase();
    setMatrix(
      matrix.map((row) =>
        row.map((letter) => ({ ...letter, isSelected: false }))
      )
    ); // harflerin isSelected değerlerini sıfırla
    let newMatrix = [...matrix];
    let isValid = true;
    let lettersIndexes = [...lettersIndex];

    if (isValid) {
      if (words.includes(word)) {
        // kelime listede varsa
        // matrix'i güncelle
        for (let i = 0; i < lettersIndexes.length; i++) {
          let [rowIndex, columnIndex] = lettersIndexes[i];
          for (let j = rowIndex; j > 0; j--) {
            newMatrix[j][columnIndex] = newMatrix[j - 1][columnIndex];
          }
        }
        setMatrix(newMatrix);
        setInputValue("");
        setLettersIndex([]);
        let totalPoint = calculatePoint(word);
        setScore(score + totalPoint);
        // Hız arttırma isteri
        if ((score) => 100) {
          setIntervalTime(4000);
        } else if ((score) => 200) {
          setIntervalTime(3000);
        } else if ((score) => 300) {
          setIntervalTime(2000);
        } else if ((score) => 400) {
          setIntervalTime(1000);
        }
      } else {
        console.log(`${word} is not a valid word!`);
        setInputValue("");
        setWrongWordCount(wrongWordCount + 1);
        console.log("Yanlış kelime sayısı", wrongWordCount);
        if (wrongWordCount === 2) {
          // Yeni harfleri getir
          console.log("Yeni harfler getiriliyor", wrongWordCount);
          let newMatrix = addLetterRow();
          setMatrix(newMatrix);
          setWrongWordCount(0);
        }
      }
    }
  };

  return (
    <>
      <View style={styles.scoreContainer}>
        <Score score={score} />
      </View>
      <View style={styles.map}>
        {matrix.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((letter, columnIndex) => (
              <TouchableOpacity
                key={columnIndex}
                style={letter.isSelected ? styles.selectedCell : styles.cell}
                onPress={() => letterClick(letter, rowIndex, columnIndex)}
              >
                <Text style={styles.letter}>{letter.letter}</Text>
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
    </>
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
  selectedCell: {
    backgroundColor: "gray",
    borderRadius: 5,
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
    borderColor: "white",
    padding: 10,
    marginVertical: 10,
    marginLeft: 70,
    fontSize: 20,
    minWidth: 250,
    maxWidth: 250,
    borderRadius: 5,
  },

  scoreContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
