import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
const Matrix = () => {
  const [matrix, setMatrix] = useState(Array(8).fill(Array(10).fill('')));
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    // 8. satır için rastgele harfler oluştur
    let row8 = getRandomLetters(10);
    // 7. satır için rastgele harfler oluştur
    let row7 = getRandomLetters(10);
    // 6. satır için rastgele harfler oluştur
    let row6 = getRandomLetters(10);
    // matrisi güncelle
    setMatrix([
      ...matrix.slice(0, 5),
      row6,
      row7,
      row8,
    ]);
  }, []);

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
          newMatrix[j][newMatrix[j].indexOf(word[i])] = '';
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
          if (newMatrix[i][j] === '') {
            newMatrix[i][j] = newMatrix[i - 1][j];
            newMatrix[i - 1][j] = ''; // üstte kalan değerler için kontrol gerekecek. şimdilik böyle
          }
        }
      }
      setMatrix(newMatrix);
      setInputValue('');
    }
  };


  // rastgele harfler üreten bir fonksiyon
  const getRandomLetters = (count) => {
    const vowels = ['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'];
    const consonants = [
      'b', 'c', 'ç', 'd', 'f', 'g', 'ğ', 'h', 'j', 'k', 'l', 'm',
      'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z',
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



  return (
    <View style={styles.container}>
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter, columnIndex) => (
            <Text key={columnIndex} style={styles.cell}>
              {letter}
            </Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 320
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    fontSize: 20,
    maxWidth: 30,
    minWidth: 30,
    maxHeight: 50,
    color: 'white',
    marginHorizontal: 'auto'
  },
  buttonContainer: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginVertical: 10,
    fontSize: 20,
    minWidth: 250,
    maxWidth: 250,
    borderRadius: 5,
  },
});

export default Matrix;
