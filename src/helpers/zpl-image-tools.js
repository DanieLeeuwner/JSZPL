module.exports = {
  generateHexAscii: (width, height, imageData) => {
    let index = 0;
    let bitIndex = 0;
    let output = '';

    let currentValue = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {

        let value = imageData[index];
        currentValue += (value << (7 - bitIndex));

        if (bitIndex == 7 || x == width - 1) {
          let valueString = currentValue.toString(16).toUpperCase();
          if (currentValue < 16) {
            valueString = '0' + valueString;
          }
          output += valueString;
          currentValue = 0;
          bitIndex = -1;
        }

        index++;
        bitIndex++;
      }
      output += '\n';
    }

    return output;
  },

  encodeHexAscii: (data) => {
    const mapCode = { 1: "G", 2: "H", 3: "I", 4: "J", 5: "K", 6: "L", 7: "M", 8: "N", 9: "O", 10: "P", 11: "Q", 12: "R", 13: "S", 14: "T", 15: "U", 16: "V", 17: "W", 18: "X", 19: "Y", 20: "g", 40: "h", 60: "i", 80: "j", 100: "k", 120: "l", 140: "m", 160: "n", 180: "o", 200: "p", 220: "q", 240: "r", 260: "s", 280: "t", 300: "u", 320: "v", 340: "w", 360: "x", 380: "y", 400: "z" }

    let outputCode = '';
    let currentLine = '';
    let previousLine = '';

    let newSection = true;
    let currentChar = undefined;
    let counter = 1;

    for (let i = 0; i < data.length; i++) {
      if (newSection) {
        currentChar = data[i];
        counter = 1;
        newSection = false;
        continue;
      }

      if (data[i] == '\n') {
        if (currentChar == '0') {
          currentLine += ',';
        } else if (currentChar == 'F') {
          currentLine += '!';
        } else if (counter > 20) {
          const value = Math.floor(counter / 20) * 20;
          currentLine += mapCode[value];

          const counterMod = counter % 20;
          if (counterMod != 0) {
            currentLine += mapCode[counterMod];
          }

          currentLine += currentChar;
        }

        newSection = true;
        if (currentLine == previousLine) {
          outputCode += ':';
        } else {
          outputCode += currentLine;
          previousLine = currentLine;
        }
        currentLine = '';
        continue;
      }

      if (currentChar == data[i]) {
        counter++;
      } else {
        if (counter > 20) {
          const value = Math.floor(counter / 20) * 20;
          currentLine += mapCode[value];

          const counterMod = counter % 20;
          if (counterMod != 0) {
            currentLine += mapCode[counterMod];
          }
        } else {
          currentLine += mapCode[counter];
        }
        currentLine += currentChar;
        currentChar = data[i];
        counter = 1;
      }
    }
    return outputCode;
  }
};