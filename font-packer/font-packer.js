var fonts = require('./zpl-fonts');
var fs = require('fs');
var base64 = require('./base64');

var output = {};

for (var f_id in fonts) {
  var font = fonts[f_id];

  var firstCharacter = font.characters[0];

  var width = firstCharacter[0].length;
  var height = firstCharacter.length;

  output[f_id] = {
    name: font.name,
    spacing: font.spacing,
    size: {
      width: width,
      height: height
    },
    base64: {},
  };

  for (var c_id in font.characters) {
    var character = font.characters[c_id];

    var blocks = [];

    for (var y = 0; y < height; y++) {
      var row = character[y];
      for (var x = 0; x < width; x++) {
        blocks.push(row[x]);
      }
    }
    var value = base64.encode(blocks);
    output[f_id].base64[c_id] = value;
  }
}

var output = JSON.stringify(output, null, 2);
output = output.substring(1, output.length - 2);

var outputJson = `
var base64 = require('./base64');

function initialize() {
  for (var f_id in self) {
    var character = self[f_id];
    if (character.spacing == undefined)
    {
      continue;
    }

    character.characters = {};
    for (var c_id in character.base64) {
      var blocks = base64.decode(character.base64[c_id]);
      character.characters[c_id] = [];

      for (var y = 0; y < character.size.height; y++) {
        character.characters[c_id][y] = [];
        for (var x = 0; x < character.size.width; x++) {
          var index = (y * character.size.width) + x;
          character.characters[c_id][y].push(blocks[index]);
        }
      }
    }
  }
}

var self = module.exports = {
  initialize: initialize,
` + output + `
}`;

fs.writeFile("b64-fonts.js", outputJson, function(err, data) {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});