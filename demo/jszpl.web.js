"use strict";

/* Base64 */

var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

var base64 = {
  encode: (blocks) => {
    var base64 = '';

    var zeroCount = (6 - (blocks.length % 6)) % 6;
    var paddingCount = (24 - ((blocks.length + zeroCount) % 24)) / 6;

    for (var i = 0; i < zeroCount; i++) {
      blocks.push(0);
    }

    for (var i = 0; i < blocks.length; i += 6) {
      var value = 0;
      for (var x = 0; x < 6; x++) {
        value += blocks[i + x] > 0 ? Math.pow(2, 5 - x) : 0;
      }
      base64 += base64chars[value];
    }

    for (var i = 0; i < paddingCount; i++) {
      base64 += '=';
    }
    return base64;
  },
  decode: (base64) => {
    var blocks = [];

    base64 = base64.replace(/=/g, '');

    for (var i = 0; i < base64.length; i++) {
      var index = base64chars.indexOf(base64[i]);
      var binaryString = '000000' + index.toString(2);
      binaryString = binaryString.substring(binaryString.length - 6);
      for (var c_id = 0; c_id < binaryString.length; c_id++) {
        blocks.push(binaryString[c_id] == '0' ? 0 : 1);
      }
    }

    return blocks;
  }
}

/* FontFamilyDefinition */

var FontFamilyDefinition = {
  initialize: () => {
    for (var f_id in FontFamilyDefinition) {
      var character = FontFamilyDefinition[f_id];
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
  },
  'A': {
    name: 'FONT_A',
    spacing: {
      right: 2,
      left: 0,
      top: 0,
      bottom: 0
    },
    size: {
      width: 7,
      height: 12
    },
    base64: {
      '0': 'efs379meGAAAAA==',
      '1': '4cGDBgw+AAAAAA==',
      '2': '+fgwwww/AAAAAA==',
      '3': '+fhzwcG+GAAAAA==',
      '4': 'GHHjz9+GAAAAAA==',
      '5': 'ePHDwMO+OAAAAA==',
      '6': 'ePPn7NmfGAAAAA==',
      '7': '/fhgwwYYAAAAAA==',
      '8': 'efszz9m/GAAAAA==',
      '9': 'efs358OeGAAAAA==',
      ' ': 'AAAAAAAAAAAAAA==',
      'A': 'MPHjz9+zAAAAAA==',
      'B': '+fs3zNm/AAAAAA==',
      'C': 'fPsGDByfDAAAAA==',
      'D': '+fM2bNu+AAAAAA==',
      'E': '+fIHyBA+AAAAAA==',
      'F': '+fMHzBgwAAAAAA==',
      'G': 'ffsG7d2fGAAAAA==',
      'H': 'zZs37NmzAAAAAA==',
      'I': '8eGDBgw8AAAAAA==',
      'J': 'ePBgwZM+MAAAAA==',
      'K': 'zbvnj5uzAAAAAA==',
      'L': 'gQIECBA+AAAAAA==',
      'M': 'zfv379mzAAAAAA==',
      'N': '7du379u3AAAAAA==',
      'O': 'efs2bNmeGAAAAA==',
      'P': '8fJnzxAgAAAAAA==',
      'Q': 'efs2bNmeHAgAAA==',
      'R': '+fs3z5mzAAAAAA==',
      'S': 'efMHwdG/GAAAAA==',
      'T': '/fjBgwYMAAAAAA==',
      'U': 'zZs2bNmeGAAAAA==',
      'V': 'zZszx48MAAAAAA==',
      'W': 'hZv379+fAAAAAA==',
      'X': 'zfnhh5+zAAAAAA==',
      'Y': 'zfnjwwYMAAAAAA==',
      'Z': '/fhhxww/AAAAAA==',
      'a': 'AAHj79u/EAAAAA==',
      'b': 'wYPnbN2+GAAAAA==',
      'c': 'AAPmSBk+GAAAAA==',
      'd': 'DBn27NufGAAAAA==',
      'e': 'AAHmb9gfGAAAAA==',
      'f': 'eMPjBgwYAAAAAA==',
      'g': 'AAH27NufDHgAAA==',
      'h': 'gQPGyZMmAAAAAA==',
      'i': 'MGHBgwY/AAAAAA==',
      'j': 'MGHBgwYMGPAAAA==',
      'k': 'wYPnjx42AAAAAA==',
      'l': '8GDBgwYOAAAAAA==',
      'm': 'AAP379+/AAAAAA==',
      'n': 'AAPGyZMmAAAAAA==',
      'o': 'AAHmbNmeGAAAAA==',
      'p': 'AAPnbN2+eMAAAA==',
      'q': 'AAH27NmfHgwAAA==',
      'r': 'AAPnDBgwAAAAAA==',
      's': 'AAPGDwY8MAAAAA==',
      't': 'IEPhAgQOAAAAAA==',
      'u': 'AAJkyZM+IAAAAA==',
      'v': 'AAM3548MAAAAAA==',
      'w': 'AAM379+eAAAAAA==',
      'x': 'AAPzww8/AAAAAA==',
      'y': 'AAMz548MGOAAAA==',
      'z': 'AAPhhhg+AAAAAA==',
      '`': 'wcGAAAAAAAAAAA==',
      '!': 'AYMGDBgwYAAAAA==',
      '@': 'AGH279Svfnh4AA==',
      '#': 'AHj355+/eAAAAA==',
      '$': 'AGHnx4+/fjBgAA==',
      '%': 'AMPHr9+NHgAAAA==',
      '&': 'APHjD1+3fjAAAA==',
      '(': 'AMMGDBgwYODAAA==',
      ')': 'AYGDBgwYMOGAAA==',
      '{': 'AOGDBhwYMHBgAA==',
      '}': 'AcGDBg4YMOGAAA==',
      '[': 'AcMGDBgwYOHAAA==',
      ']': 'AcGDBgwYMOHAAA==',
      '_': 'AAAAAAAAAAH78A==',
      '+': 'AADBj9+MGAAAAA==',
      '-': 'AAAAAB4AAAAAAA==',
      '*': 'AGPzx8YAAAAAAA==',
      '/': 'ABhgwwYYMMAAAA==',
      ':': 'AAAGDAAwYAAAAA==',
      ',': 'AAAAAAAwYMEAAA==',
      '.': 'AAAAAAAwYAAAAA==',
      '?': 'AePhhwwYMAAAAA==',
      ';': 'AAAGDAAwYMEAAA==',
      '\'': 'AYMGAAAAAAAAAA==',
      '"': 'AbNmwAAAAAAAAA=='
    }
  },
  'B': {
    name: 'FONT_B',
    spacing: {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0
    },
    size: {
      width: 10,
      height: 17
    },
    base64: {
      '0': 'OB8P4xjGP4/z+MYxjuHwOAAAAAAAA===',
      '1': 'AD4PgGAYBgGAYBgGB+H4AAAAAAAAA===',
      '2': 'MD8P4BgGA4HA8HgcD+P4AAAAAAAAA===',
      '3': 'MD8P4BgOH4fAOAYBj+P4eAAAAAAAA===',
      '4': 'AAOA4Hg+DYdjmP+/4GAYAAAAAAAAA===',
      '5': 'AD8PwwD4Pw/gGAYBj+PweAAAAAAAA===',
      '6': 'GB+P44D4P47jGMcxjuH4OAAAAAAAA===',
      '7': 'AD+P4DgMBwHAYDgMBwHAAAAAAAAAA===',
      '8': 'OD+O4xjGP4/juMcxzuP4OAAAAAAAA===',
      '9': 'HB+H8YzjGMdx/D8Ax/H4OAAAAAAAA===',
      ' ': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA===',
      'A': 'AAcBwPg2DYdx3H8/7jsGAAAAAAAAA===',
      'B': 'AD+P4xjGP4/jHMcxz/P4AAAAAAAAA===',
      'C': 'HB+P44DAMAwDAMA4D2H4HAAAAAAAA===',
      'D': 'AD8P4zjGMcxzHMYzj+PwAAAAAAAAA===',
      'E': 'AD+P4wDAP4/jAMAwD/P8AAAAAAAAA===',
      'F': 'AD/P84DgP4/jgOA4DgOAAAAAAAAAA===',
      'G': 'DA/H8YDgOA57nuOY5/j8DgAAAAAAA===',
      'H': 'ADGMYxjGP4/jGMYxjGMYAAAAAAAAA===',
      'I': 'AD+P4OA4DgOA4DgOD+P4AAAAAAAAA===',
      'J': 'AA+D4BgGAYBgGAYhjuP4OAAAAAAAA===',
      'K': 'ADHM43D4PA+DcNwzjHMcAAAAAAAAA===',
      'L': 'ADgOA4DgOA4DgOA4D/P8AAAAAAAAA===',
      'M': 'ADjve973t23bdsmwbBsGAAAAAAAAA===',
      'N': 'ADmOY5j2PY/jeN4zjOM4AAAAAAAAA===',
      'O': 'HA+H8YxjuO47jmOYx3D4HAAAAAAAA===',
      'P': 'AD+P8xzHMc/j8MAwDAMAAAAAAAAAA===',
      'Q': 'HA+H8YxjuO47jmOYx3D4HwHAAAAAA===',
      'R': 'AD8P4xjGM4/j8M4xjHMMAAAAAAAAA===',
      'S': 'OD+P4wDAPg/geAYBjuP4eAAAAAAAA===',
      'T': 'AD/v+HAcBwHAcBwHAcBwAAAAAAAAA===',
      'U': 'ADGMYxjGMYxjGMYxjuP4OAAAAAAAA===',
      'V': 'ADjuOYxjHcdw2DYPgcBwAAAAAAAAA===',
      'W': 'ADBsGwbdt2/7/ncdx3HcAAAAAAAAA===',
      'X': 'ADjnMdw+BwHA+D4dzjuOAAAAAAAAA===',
      'Y': 'ADjuOdw2D4HAcBwHAcBwAAAAAAAAA===',
      'Z': 'AD/P8DgOBwOA4HA4D/P8AAAAAAAAA===',
      'a': 'AAcBwPg2DYdx3H8/7jsGAAAAAAAAA===',
      'b': 'AD+P4xjGP4/jHMcxz/P4AAAAAAAAA===',
      'c': 'HB+P44DAMAwDAMA4D2H4HAAAAAAAA===',
      'd': 'AD8P4zjGMcxzHMYzj+PwAAAAAAAAA===',
      'e': 'AD+P4wDAP4/jAMAwD/P8AAAAAAAAA===',
      'f': 'AD/P84DgP4/jgOA4DgOAAAAAAAAAA===',
      'g': 'DA/H8YDgOA57nuOY5/j8DgAAAAAAA===',
      'h': 'ADGMYxjGP4/jGMYxjGMYAAAAAAAAA===',
      'i': 'AD+P4OA4DgOA4DgOD+P4AAAAAAAAA===',
      'j': 'AA+D4BgGAYBgGAYhjuP4OAAAAAAAA===',
      'k': 'ADHM43D4PA+DcNwzjHMcAAAAAAAAA===',
      'l': 'ADgOA4DgOA4DgOA4D/P8AAAAAAAAA===',
      'm': 'ADjve973t23bdsmwbBsGAAAAAAAAA===',
      'n': 'ADmOY5j2PY/jeN4zjOM4AAAAAAAAA===',
      'o': 'HA+H8YxjuO47jmOYx3D4HAAAAAAAA===',
      'p': 'AD+P8xzHMc/j8MAwDAMAAAAAAAAAA===',
      'q': 'HA+H8YxjuO47jmOYx3D4HwHAAAAAA===',
      'r': 'AD8P4xjGM4/j8M4xjHMMAAAAAAAAA===',
      's': 'OD+P4wDAPg/geAYBjuP4eAAAAAAAA===',
      't': 'AD/v+HAcBwHAcBwHAcBwAAAAAAAAA===',
      'u': 'ADGMYxjGMYxjGMYxjuP4OAAAAAAAA===',
      'v': 'ADjuOYxjHcdw2DYPgcBwAAAAAAAAA===',
      'w': 'ADBsGwbdt2/7/ncdx3HcAAAAAAAAA===',
      'x': 'ADjnMdw+BwHA+D4dzjuOAAAAAAAAA===',
      'y': 'ADjuOdw2D4HAcBwHAcBwAAAAAAAAA===',
      'z': 'AD/P8DgOBwOA4HA4D/P8AAAAAAAAA===',
      '`': '4BgHAAAAAAAAAAAAAAAAAAAAAAAAA===',
      '!': 'ADgOA4DgOA4DgOAADgOAAAAAAAAAA===',
      '@': 'AAOD8c7nt+37Ztm27fuYcA/A8AAAA===',
      '#': 'AAbBsGz/v+Nj/P+bBsGwAAAAAAAAA===',
      '$': 'GAYH4/jYPg/B+B8Hz+P4GAYBgAAAA===',
      '%': 'ABwPg2DYv+fz/O+DYNg+AAAAAAAAA===',
      '&': 'HA+HYcBwHgfb9s+x73n+HAAAAAAAA===',
      '(': 'MBwGA4DAMAwDAMAwDgOAYBwAAAAAA===',
      ')': 'wDgGAcAwDAMAwDAMBwHAYDgAAAAAA===',
      '{': 'DgeDgOA4DgeDwHgOA4DgOAeB4AAAA===',
      '}': '8DwDgOA4DgPAeDwOA4DgODwPAAAAA===',
      '[': '8DwMAwDAMAwDAMAwDAMA8DwAAAAAA===',
      ']': '8DwDAMAwDAMAwDAMAwDA8DwAAAAAA===',
      '_': 'AAAAAAAAAAAAAAAAAAAAAAAAA/4AA===',
      '+': 'AAAAAHAcBw/7/hwHAcBwAAAAAAAAA===',
      '-': 'AAAAAAAAAAAD4PgAAAAAAAAAAAAAA===',
      '*': 'EAQNY/h8P41gQAAAAAAAAAAAAAAAA===',
      '/': 'AADAcBgOAwHAYDgOBwHAYDgAAAAAA===',
      ':': 'AAAAAADgOA4AAAA4DgOAAAAAAAAAA===',
      ',': 'AAAAAAAAAAAAAAA4DgOA4DAIAAAAA===',
      '.': 'AAAAAAAAAAAAAAA4DgOAAAAAAAAAA===',
      '?': 'OD+P4BgOBwOA4DAMAwDAAAAAAAAAA===',
      ';': 'AAAAAADgOA4AAAA4DgOA4DAIAAAAA===',
      '\'': 'ADgOA4DgEAAAAAAAAAAAAAAAAAAAA===',
      '"': 'ADuO47juAAAAAAAAAAAAAAAAAAAAA==='
    }
  },
  'D': {
    name: 'FONT_D',
    spacing: {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0
    },
    size: {
      width: 13,
      height: 21
    },
    base64: {
      '0': 'HgP8H+Hjjhxw4/8f+O3HDjhx54f4H4B4AAAAAAAAAAAAAA==',
      '1': 'HAfgPwE4AcAOAHADgBwA4AcAOA/4f8AAAAAAAAAAAAAAAA==',
      '2': 'Pgf8P+EHgBwB4A4A4A8A8A8A8A/8f+AAAAAAAAAAAAAAAA==',
      '3': 'Pgf8P+ADgBwBwP4H8APADgBxA4/8f8D4AAAAAAAAAAAAAA==',
      '4': 'BwA8A+A/Afgdwc4OcOOH/z/4BwA4AcAAAAAAAAAAAAAAAA==',
      '5': 'f4P8H+DABgA/gf4M8AHADgBwB4/4f4DwAAAAAAAAAAAAAA==',
      '6': 'DwH8H+HgDgB/g/4eeOHHDjhxw4f8H8B4AAAAAAAAAAAAAA==',
      '7': '/8f+P/AHADgDgBwA4A4AcAcAOAPAHAAAAAAAAAAAAAAAAA==',
      '8': 'HgP8P/HDjhx54f4P8PPHDjhxw4/8P8B4AAAAAAAAAAAAAA==',
      '9': 'HgP8P+HDjhxw44ceeH/B/gBwBwf4P4DwAAAAAAAAAAAAAA==',
      ' ': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
      'A': 'DwB4A8A/AfgPwOcHODnD/x/44c4HcDgAAAAAAAAAAAAAAA==',
      'B': '/Af8P/HDjhxx4/4f8OHHBzg5w4/8f8AAAAAAAAAAAAAAAA==',
      'C': 'D4H+H/DgDgBwA4AcAOAHADgA4If8H+A8AAAAAAAAAAAAAA==',
      'D': '+Af4P+HHjhxw44ccOOHHDjhxx4/4f4AAAAAAAAAAAAAAAA==',
      'E': 'f8f+P/HADgBwA/8f+OAHADgBwA/8f+AAAAAAAAAAAAAAAA==',
      'F': '/4f8P+HADgBwA/4f8OAHADgBwA4AcAAAAAAAAAAAAAAAAA==',
      'G': 'DwH+H/HgjgBwA4Ac+OfHDjhx44f8H+A8AAAAAAAAAAAAAA==',
      'H': '4ccOOHHDjhxw4/8f+OHHDjhxw44ccOAAAAAAAAAAAAAAAA==',
      'I': '/wf8P+AwAYAMAGADABgAwAYAMA/4f8AAAAAAAAAAAAAAAA==',
      'J': 'P4H8D+AHADgBwA4AcAOAHADhBw/wf4DwAAAAAAAAAAAAAA==',
      'K': '4OcPOPHPDvB/A/AfwP8HODnhx44ecHAAAAAAAAAAAAAAAA==',
      'L': 'wAcAOAHADgBwA4AcAOAHADgBwA/8f+AAAAAAAAAAAAAAAA==',
      'M': 'cPeHvn3z759/+73d7u93M7gdwO4HcDgAAAAAAAAAAAAAAA==',
      'N': '4ceOPHHzj5x+4/cduO/HPjnxz448ceAAAAAAAAAAAAAAAA==',
      'O': 'HgP8H+HDjhxw44ccOOHHDjhxw4f4P8B4AAAAAAAAAAAAAA==',
      'P': 'fgf8P/HDjg5w848f+P+HADgBwA4AcAAAAAAAAAAAAAAAAA==',
      'Q': 'HgP8H+HDjhxw44ccOOHHDjhxw4f4P8B+AHgBgAAAAAAAAA==',
      'R': '/Af8P+HHjhxw458f8P+HHDjxw44OcHAAAAAAAAAAAAAAAA==',
      'S': 'HwP8P+HBDgB4A/wP8A/ADgBxg4/8f8D4AAAAAAAAAAAAAA==',
      'T': '//f/v/wMAGADABgAwAYAMAGADABgAwAAAAAAAAAAAAAAAA==',
      'U': '4ccOOHHDjhxw44ccOOHHDjhxw4/8P8B4AAAAAAAAAAAAAA==',
      'V': '4HcDnDzhxw4YcOcHODnA/AfgPwDwB4AAAAAAAAAAAAAAAA==',
      'W': 'wDYBuB3A7vd3u73N7G/j/x5488eeHOAAAAAAAAAAAAAAAA==',
      'X': 'YHOHnjhzgfwPwDwB4B+A/A5w88cPcDgAAAAAAAAAAAAAAA==',
      'Y': '4HcDnDjzw5wPwH4B4AYAMAGADABgAwAAAAAAAAAAAAAAAA==',
      'Z': '/+f/P/gHgDgDgDwBwBwBwB4A4A/+f/AAAAAAAAAAAAAAAA==',
      'a': 'AAAAAAAYB/g/wQcD+H/Hzjhxx4/8P+DwAAAAAAAAAAAAAA==',
      'b': '4AcAOAHID/h/48ccOOHHDjhx44/8f8A4AAAAAAAAAAAAAA==',
      'c': 'AAAAAAAEA/w/4cEOAOAHABwA4Af8H+A8AAAAAAAAAAAAAA==',
      'd': 'AcAOAHATh/w/448cOOHHDjhxx4/8P+BwAAAAAAAAAAAAAA==',
      'e': 'AAAAAAAIA/g/44ccOP/H/jgBwAf8H+A8AAAAAAAAAAAAAA==',
      'f': 'B8B+BwA4D/x/4HADgBwA4AcAOAHADgAAAAAAAAAAAAAAAA==',
      'g': 'AAAAAAAQB/w/448cOOHHDjhxx4f8P+AnCHB/g/gAAAAAAA==',
      'h': '4AcAOAHMD/h/w8ccOOHHDjhxw44ccOAAAAAAAAAAAAAAAA==',
      'i': 'DgBwA4AAB+A/ADgBwA4AcAOAHA/8f+AAAAAAAAAAAAAAAA==',
      'j': 'DgBwA4AAB+A/ADgBwA4AcAOAHADgBwA4AcD+B+AAAAAAAA==',
      'k': '4AcAOAHADjh3g/gfgPwH8DvBzg44ceAAAAAAAAAAAAAAAA==',
      'l': '/AfgBwA4AcAOAHADgBwA4AcAOAH8B+AAAAAAAAAAAAAAAA==',
      'm': 'AAAAAAAiD/x/4zMZnMzmZzM5mczOZnAAAAAAAAAAAAAAAA==',
      'n': 'AAAAAAAMD/h/w8ccOOHHDjhxw44ccOAAAAAAAAAAAAAAAA==',
      'o': 'AAAAAAAYA/g/w4ccOOHHDjhxw4f4P8B4AAAAAAAAAAAAAA==',
      'p': 'AAAAAAAID/h/48ccOOHHDjhx44/8f8O4HADgBwAAAAAAAA==',
      'q': 'AAAAAAAAA/w/448cOOHHDjhxx4f8P+B3ADgBwA4AAAAAAA==',
      'r': 'AAAAAAAMD/h/w8IcAOAHADgBwA4AcAAAAAAAAAAAAAAAAA==',
      's': 'AAAAAAAwB/B/gwQcAP4D+AHABw/wf4HwAAAAAAAAAAAAAA==',
      't': 'AADABgAwD/x/4GADABgAwAYAOAH8D+AAAAAAAAAAAAAAAA==',
      'u': 'AAAAAAAADhxw44ccOOHHDjhwx4f8P+BwAAAAAAAAAAAAAA==',
      'v': 'AAAAAAAADhxw44cOcHOBnA/AfgHgDwAAAAAAAAAAAAAAAA==',
      'w': 'AAAAAAAADANwO4Hczm9j/x/4/8OcHOAAAAAAAAAAAAAAAA==',
      'x': 'AAAAAAAABw4c8P8D8A8AeAfgf4eeeHgAAAAAAAAAAAAAAA==',
      'y': 'AAAAAAAADg5w44cOcHOB3A/APgHgBwBwA4D4B8AAAAAAAA==',
      'z': 'AAAAAAAAD/h/wBwBwBwBwB4B4A/4f8AAAAAAAAAAAAAAAA==',
      '`': '4AOADgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
      '!': 'AAYAMAGADABgAwAYAMAGADAAAAwAYAMAAAAAAAAAAAAAAA==',
      '@': 'AAAAAeA/w944O5/d/s52YbMNmO7/c/nADwA/wH8AAAAAAA==',
      '#': 'AAAAA7gdwO4/+f/P/hmA3D/5/8MwO4HcAAAAAAAAAAAAAA==',
      '$': 'AABgAwB/B/h+Q7AfgH8B/gPwG4zcf+P+AYAMAGAAAAAAAA==',
      '%': 'AAAAHwH8DuBjA/nP/g+D/z38DmBjA/gPgAAAAAAAAAAAAA==',
      '&': 'AAB4D+B/A4AcAPAHgH43Obntx+8eP/D/wcAAAAAAAAAAAA==',
      '(': 'AAHADgDgBwBwA4AcAOAHADgBwA4AcAHADgA4AcAAAAAAAA==',
      ')': 'AAcAOADgBwAcAOAHADgAwA4AcAOAHAHADgDgBwAAAAAAAA==',
      '{': 'AAB4B8A4AYAMAGADAHgHwD4AcAGADABgA4AfAPgAAAAAAA==',
      '}': 'AAeAPgBwAYAMAGADAB4A+AfAOAGADABgBwD4B8AAAAAAAA==',
      '[': 'AAfAPgHADgBwA4AcAOAHADgBwA4AcAOAHAD4B8AAAAAAAA==',
      ']': 'AAfAPgBwA4AcAOAHADgBwA4AcAOAHADgBwD4B8AAAAAAAA==',
      '_': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//f/gAA==',
      '+': 'AAAAAAAAAGADABgAwP/3/5/8DABgAwAAAAAAAAAAAAAAAA==',
      '-': 'AAAAAAAAAAAAAAAAAAAH4D8AAAAAAAAAAAAAAAAAAAAAAA==',
      '*': 'AABgAwHbj/wfgf4f+EyAYAAAAAAAAAAAAAAAAAAAAAAAAA==',
      '/': 'AAAOAHAHADgDgBwBwA4A4AcAcAOAOAHAHADgAAAAAAAAAA==',
      ':': 'AAAAAAAAAAB4A8AeAPAAAAAAAA8AeAPAAAAAAAAAAAAAAA==',
      ',': 'AAAAAAAAAAAAAAAAAAAAAAAAAAeAPAHgDgBwBwAAAAAAAA==',
      '.': 'AAAAAAAAAAAAAAAAAAAAAAAAAA8AeAPAAAAAAAAAAAAAAA==',
      '?': 'AAHgP8H+CDgDwDwDwBwBwA4AcAOAHADgAAAAAAAAAAAAAA==',
      ';': 'AAAAAAAAAAA8AeAPAHgAAAAAAAeAPAHgDgBwBwAAAAAAAA==',
      '\'': 'AAYAMAGADABgAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
      '"': 'AAZgMwGYDMBmAzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=='
    }
  },
  'E': {
    name: 'FONT_E',
    spacing: {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0
    },
    size: {
      width: 20,
      height: 38
    },
    base64: {
      '0': 'B/gB/+A//wf/+H4fh8D4+AfPgHz4A88APPADzwA88APPADzwA+8APvADzwA88APPADz4A8+AfPgHx8D4f/+D//Af/wD/4AP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '1': 'AeAAPwAP8AH/AD/wB/8A//AP3wD58AYfAAHwAB8AAfAAHwAB8AAfAAHwAB8AAfAAHwAB8AAfAAHwAB8AAfAAHwAB8AAfAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '2': 'D/gD/+B//w//+P4/hwD4AAfAAHwAB8AAeAAPgAH4AH8AD+AD/AB/gA/wAfwAP4AD4AB+AAfAAHwAB4AAf/+H//x//8f/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '3': 'f/8P//j//4//+H//gAP4AH8AD+AB/AA/gAfwAH+AB/4Af/AD/4AB+AAPwAB8AAPAADwAA8AAfAAPxgH4//+P//D//gf/wB/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '4': 'AOAAHwAB8AA/AAPgAD4AB8AAfAAPgAD4AB8AAfAAPhwD4+B8PgfD4Pg+D4Pg///P//z//8///H//gAPgAD4AA+AAPgAD4AAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '5': 'P/4H//B//wf/8H/+B4AAeAAPgAD4AA/4AP/wD/+A//wH/+AAfgAB8AAfAAHwAA8AAfAAHwAD8AB+AB/gf/wP/4D/8A/8AP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '6': 'ADgAB8AA/AAfwAP4AD8AB+AA/AAfgAHwAD/4B//gf/8H//j//4/A/PgHz4A88APPAD7wA88APPgHz8D8f/+H//g//wD/4APwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '7': 'f/+P//z//+///H//wAB8AA/AAfgAH4AD8AB+AA/AAPgAH4AD8AA+AAPgAHwAB8AAfAAHgAD4AA+AAPgAD4AA+AAPgAD4AAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '8': 'B/gB/+A//wP/+H8fh8D4eAeHwPh8D4fz+D//Af/gD/wB/+A//wf/+H4fj8D8+AfPADzwA+8APPgHz8D8///H//g//wH/4AP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '9': 'B/gB/+A//wf/+H8fj8D8+AfPgDzwA88APvADz4A8+AfP4Px//8P/+B//gP/wAf8AA+AAfgAPwAH4AD8AB/AA/gAPwAD4AAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      ' ': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'A': 'A/AAPwAH+AB/gAf4AH+AD/wA/8APvADz4B8+AfPgHx4B4fA+HwP/8D//B//4f/+HwPh4B4+AfPgHz4B88APPADxgAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'B': 'f/AP/+D//w//+P//jwD88AfPAHzwB88AfPA/z//4//8P//j//88A/PAHzwA88APvADzwB88B/P//j//4//8P/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'C': 'A/gA/8Af/gP/4D8/B+HwfA8HwAB4AAeAAPgAD4AA+AAPgAD4AA+AAPgAB4AAeAAHwOB8HwPh8D//Af/gH/4A/8AD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'D': 'OAAH+AD/4A//AP/4D7/A+PwPh+D4Pw+B8PgfD4Dw+A+PgPj4D4+A+PgPD4Hw+B8Pg/D4fg+/wP/8D/+A/+AH+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'E': 'f/8P//j//4//+P//D4AA+AAPgAD4AA+AAPgAD//g//4P/+D//g+AAPgAD4AA+AAPgAD4AA+AAP//j//4//+H//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'F': 'f/gP/8D//A//wP/8D4AA+AAPgAD4AA+AAPgAD/+A//gP/4D/8A+AAPgAD4AA+AAPgAD4AA+AAPgAD4AA+AAPAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'G': 'A/wA//Af/4P/+D+fx+B4fAOHwAD4AA+AAPgAD4AA8P+PD/z4/8+P/PgHz4B8+AfHwHx8B8fgfD//wf/8H//Af/gB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'H': '8AcPAPDwDw8A8PAPDwDw8A8PAPDwDw8A8PAPD//w//8P//D//w8A8PAPDwDw8A8PAPDwDw8A8PAPDwDw8A8PAPBgBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'I': 'P/gH/8D//Af/wH/4AHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AP/8D//A//wP/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'J': 'ADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8BwPA+DwPg8D4PA+HwH/8B/+AP/gB/wAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'K': 'cAOPgHz4D8+B+Pg/D4fg+PwPn4D78A//AP/gD/wA/4AP+AD/wA/+AP/wD7+A+fwPj+D4fw+D+Pgfz4D8+AfPADxwAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'L': '8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAP//j//4///P//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'M': '/A/P4fz+H+/h/v8/7/P+/z/v//7//+///vf773++9/vvPz7z8+8/PvHz7x4+8OPvAD7wA+8APvAD7wA+8APvADxgAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'N': 'eAOPwDz8A8/gPP4Dz/A8/wPP+Dz/g8/8PP/Dz748++PPnzz588+fvPj7z4/8+H/Ph/z4P8+D/Pgfz4H8+A/PAPxwB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'O': 'B/gA/8Af/gP/8D8/B+D4fA+PgHz4B8+AfPADzwA88APPADzwA88APPgHz4B8+AfHwPh8D4Ph+D//Af/gD/4Af8AB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'P': 'f+AP/8D//g//8P//jwH48AePAHjwB88AePAPjwf4//8P//D//g//gPAADwAA8AAPAADwAA8AAPAADwAA8AAPAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'Q': 'B/AA/8A//gP/4H9/B8Hw+A+PgPj4B48AePAHjwB88AfPHnzz548fePn/j4/4+H+Hx/B+PwP/+B//wP/8B/fAADwAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'R': 'f8AP/4D//g//8P//D4Pw+A8PgPD4Dw+A8PgfD4fw//4P/8D//A//APnwD4+A+PwPh8D4fg+D4PgfD4H4+A+PAPhwBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'S': 'D/AB/8A//gf/4P4/D4Hw+A8PgOD4AA/gAH+AA/4AH/gA/8AD/gAP4AA/AAHwcA8PAPD4Hw+B8P//B//gP/wB/4AH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'T': 'f/+P//z//8///H//wB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'U': 'cAOPgDz4A8+APPgDz4A8+APPgDz4A8+APPgDz4A8+APPgDz4A8+APPgDz4A8+APPgHz4B8fA/H//g//4P/8B/+AD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'V': '8AHPAD7wA++AfPgHz4B8eAeHwPh8D4fA+DwPA+HwPh8D4fAfHgHz4B8+APPgD7wA/8AP/AB/gAf4AH+AB/gAPwAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'W': '8AHPADzwA+8APPADzwA88APPADzwA88APPnjz798+/fPv3z798///P//x//4f/+H//h//4fz+H8/g/P4Px8D4fAcDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'X': 'eAOHgHx8D8fA+H4fg+HwHz8B8+AP/gD/wAf4AH+AA/AAPwAH+AB/gA/8AP/AH74B8+A+HwPh+HwPj8D8+AfPgHxwA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'Y': 'cAOPgHz8B8fA+H4Pg+HwPz8B8+Af/gD/wA/8AH+AA/gAPwAB8AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'Z': 'f/wP/+D//g//4H/+AAfAAPwAD4AB+AAfAAPwAD4AB+AAfAAPgAD4AB8AAfAAPgAD4AB8AAfAAP//D//w//8P//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'a': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAD+AD/wD//A//wP7+DwPgAD4AH+A//g//4f/+H//j8B4+A+Pgfj4P4/v+H//g//4H/+A/nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'b': '8AAPAAD4AA+AAPgAD4AA+AAPgAD58A//wP//D//4//+P4Pz8B8+AfPgDz4A++APPgDz4A8+AfPwHz+D8/7+P//j//w//4HP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'c': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAH4AH/gD/8B//Af/4Pw+D4HA8AAPAADwAA8AAPAADwAA8BwPg+D4Pgfv4H/8A//AH/gAfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'd': 'AAPAADwAA8AAPAADwAA8AAPAADwD48D/vB//w//8f//Pwfz4D8+AfPADzwA88APPADzwA8+AfPgPz8H8f3/H//w//8H//AfzgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'e': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAD+AD/4B//A//wf7+HwPh8B8///P//z//8///P//j4AA+AAHwAB+Dgf78D//Af/wD/4AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'f': 'AD8AD/AB/wAf8AP4AD4AA8AAPAB//g//8P//D//wf/4APAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'g': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAD44H/+D//x//8f//Pwfz4D8+A/PAHzwB88AfPAHz4D8+A/Pw/x//8f//D//wf/8A+fAAHx4D4fB+H//g//wP/4A/4AAAAAAAAAAA=',
      'h': 'cAAPgAD4AA+AAPgAD4AA+AAPgAD58A//gP/8D//g//8P4fD8Hw+B8PgfD4Hw+B8PgfD4Hw+B8PgfD4Hw+B8PgfD4Hw+A8HAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'i': 'B+AAfgAH4AB+AAfgADwAAAAAAAAAAA/+AP/gD/4Af+AAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'j': 'A/AAPwAD8AA/AAPwAB4AAAAAAAAAAAH+AD/wA/8AH/AAHwAB8AAfAAHwAB8AAfAAHwAB8AAfAAHwAB8AAfAAHwAB8AAfAAHwAB8Af+AP/gD/wA/4AH8AAAAAAAAAAAA=',
      'k': '8AAPAADwAA8AAPAADwAA8AAPAADwGA8DwPB8Dw/A8fwPfwD/4A/8AP+AD/AA/4AP/AD/4A9/APP4Dx/A8P4PB+DwPw8B4GAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'l': '8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAPgAD4AA/8AH/gB/4AH+AAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'm': 'AAAAAAAAAAAAAAAAAAAAAAAAAABvHg//+P//z//8///Pnz758+8fPvHj7x4+8ePvHj7x4+8ePvHj7x4+8ePvHj7x4+8ePODhwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'n': 'AAAAAAAAAAAAAAAAAAAAAAAAAABx+A9/4P//D//4//+P8Pz8B8/AfPgHz4A8+APPgDz4A8+APPgDz4A8+APPgDz4A8+APHADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'o': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAD+AD/wD//A//4f/+PwPz4B8+AfPADzwA88APvADzwA8+AfPgHz8D8f/+D//g//wD/4AP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'p': 'AAAAAAAAAAAAAAAAAAAAAAAAAABh8A9/wP//D//4//+P4Pz8B8+AfPgDz4A8+APvgDz4A8+APPwHz+D8/7+P//j//w//4Pv4D4AA+AAPgAD4AA8AAHAAAAAAAAAAAAA=',
      'q': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAD4YD//D//w//8f//Pwfz4D8+AfPAHzwA88APPADzwA8+AfPgPz8H8f3/H//w//8H//AfzwAA8AAPAADwAA8AAPAADgAAAAAAAAAA=',
      'r': 'AAAAAAAAAAAAAAAAAAAAAAAAAABj8A//gP/8D//g//4P4+D8Hg+BwPgAD4AA8AAPAADwAA8AAPAADwAA8AAPAADwAA8AAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      's': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAP8AP/wH/+B//g/n8PgfD4Dg/AAH/AB/+AP/4A//AB/wAB8GAPDwHw/n8P//B//gP/wA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      't': 'AAAAAAAAAAAwAAeAAHgAB4AAeAAHgA//8P//D//wf/8AeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB/8Af/AD/wA/8AD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'u': 'AAAAAAAAAAAAAAAAAAAAAAAAAABwAY8APPgDz4A8+APPgDz4A8+APPgDz4A8+APPgDz4B8+AfPgPz8H8f//H//w//8H/vAfzgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'v': 'AAAAAAAAAAAAAAAAAAAAAAAAAABgAY8APPADz4B8+AfHwHx8D4fA+D4PA+HwPh8B8+AfPgHz4A/8AP/AD/wAf4AH+AA/gAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'w': 'AAAAAAAAAAAAAAAAAAAAAAAAAABgAY8APPADzwA88APPgHz4B8+AfPv3z798e/eH//h//4f/+H//h//4f/+H8/g/P4Pz8D4fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'x': 'AAAAAAAAAAAAAAAAAAAAAAAAAABwDg+B8PgfD8Pwfn4D58A//AH/gA/wAP8AB+AA/wAP+AH/gD/8B+fgfD4Pw/D4Hw8A8HAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'y': 'AAAAAAAAAAAAAAAAAAAAAAAAAABgAY8APPgD74B8/A/HwPh+H4Ph8B8/AfvgD/4A/8AH/AA/gAPwAD8AA+AAfgAHwAD8AA+AAfgAfwAP4AD+AA/AAPgAAAAAAAAAAAA=',
      'z': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/4P//D//wf/8AB/AA/gAPwAH4AD8AB+AA/AAfgAPwAH4AD+AA//8P//j//4//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '`': '8AAPgAD4AA/AAHwAB8AAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '!': 'eAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAAAAAAAAAAAAAAAAAAAAAAAAHwAD8AA/AAPwAD8AAfAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '@': 'AAAAAAAP+AP/4H//B//4/h+PgPjwB88AfGADwAA8DEPD/zx/88//Pv/z758+8fPvDz7w8+8PPPDzzx88+//P//x//4f/+B++AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '#': 'A8PAfDwHx8B8fAeHwHh8D4eD//h//8///P//x//8Hx8B4fAeHwPh4D4+D//4///P//z//4fHwHh8B4eA+PgPj4D4+A8PgHBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '$': 'AeAAHgAP/AP/8H//j//4///Pnnzx44+eAP3gD/4Af/AD/+Af/wA/+AH/wB78AePGHj7x48+efP//z//4f/+D/+AP+AAeAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '%': 'PwHH+Dz/h+/8fPfPz3z4/98P//D/vgf34D58AA+AAfgAHwAD8AA+AAfgAPwAD78B//gff8P3/H77x8+8/P/Ph/z4f88D+GAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '&': 'D/AB/8A//Af/4H4+B4HgeD4Hg+B4fgfPwH/8A/+AP+AB/AA/wAf8PP/jz788+fPPH7zw/88H/Pg/z4P4//+H//g//8H/+AfjgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '(': 'AeAAPgAP4AD+AB+AA/AAPgAHwAB8AA+AAPgAD4AA8AAPAADwAA8AAPAAD4AA+AAPgAB8AAfgAD4AA/AAH8AA/gAH4AA+AAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      ')': '8AAPwAD+AAfwAD8AAfgAD8AAfAAHwAA+AAPgAD4AAeAAHgAB4AAeAAHgAD4AA+AAPgAHwAB8AA+AAfgAfwAP4AD8AA+AAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '{': 'AD/AD/wB/8Af/APwAD4AA8AAPAADwAA8AAPAAHwA/8AP+AD/gA/4AH/AAHwAA8AAPAADwAA8AAPgAD4AA/+AH/wB/8AP/AAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '}': '/wAP/AD/4A//AAPwAB8AAPAADwAA8AAPAAD4AA+AAP/AB/wAf8AH/AD/gA+AAPAADwAA8AAPAADwAB8Af/AP/gD/4A/8AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '[': 'f/wP/+D//g//wPgAD4AA+AAPgAD4AA+AAPgAD4AA+AAPgAD4AA+AAPgAD4AA+AAPgAD4AA+AAPgAD4AA//gP/+D//g//4H/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      ']': 'f/4P/+D//gf/4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgAB4AAeAAHgP/4P/+D//g//4H/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '_': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//j//8///v//7//8///AAAA=',
      '+': 'AAAAAAAAAAAAAAHgAB4AAeAAHgAB4AAeAAHgAB4A///P//z//8///H//gB4AAeAAHgAB4AAeAAHgAB4AAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '-': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///P//7//+///P//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '*': 'AAAAAAAAAAAAAADAAB4AAeAAHgAB4AAeAPnnz//8///P//w//wB/gA/8AP/gH74D8/A+HwPg8BwOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '/': 'ADwAA8AAfAAHwAB8AA+AAPgAHwAB8AAfAAPgAD4AB8AAfAAPwAD4AA+AAfAAHwAD4AA+AAPgAHwAB8AA+AAPgAD4AA8AAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      ':': 'AAAAAAAAAAAAAAAAAAAAAAAAAAB+AA/wAP8AD/AA/wAP8AD/AAfgAAAAAAAAAAAAAAAAAAfgAP8AD/AA/wAP8AD/AA/wAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      ',': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AA/4AP+AH/gB/4A/8Af+AH/AD/gA/wAf4AH8AD+AA/AAHgAAAAAAAAAAAA=',
      '.': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf4AP/AD/wA/8AP/AD/wA/8AH+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '?': 'AAAAAAAP8AP/gH/8D//g/n4Pg+DwHg8B4PA+AAPgAH4AD8AB+AA/AAPgADwAA8AAGAAAAAAAAAAAAAAAAAAAfgAH4AB+AAfgAH4AA8AAAAAAAAAAAAAAAAAAAAAAAAA=',
      ';': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAD8AB/gAf4AH+AB/gAf4AH+AA/AAAAAAAAAAAAAAAAAAA/AAf4AP+AD/gB/wAf8AP+AD/AB/gAf4AP8AD+AA/AAHgAAAAAAAAAAAA=',
      '\'': 'fgAH4AD+AAfgAH4AB+AAfgAH4AB+AAfgAH4AB+AAfgAH4AAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '"': 'fh+H4fh+H4fh+H4fh+H4fh+H4fh+H4fh+H4fh+H4fh+H4fgYBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='
    }
  },
  'F': {
    name: 'FONT_F',
    spacing: {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0
    },
    size: {
      width: 16,
      height: 25
    },
    base64: {
      '0': 'H+A/8D/weHh4OHA8cDzwPPe897z3vPe88DzwPHA8eDh4eDz4P/Af4AeAAAAAAAAAAAA=',
      '1': 'PwD/AP8A/wAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAP/w//D/8AAAAAAAAAAAAAA=',
      '2': 'f8D/4P/wwPAA8ABwAHAA8ADwAeADwAeAD4AfAD4AfAD4AP/w//D/8AAAAAAAAAAAAAA=',
      '3': 'f+B/8H/4QHgAeAA4AHgA+A/wD+AP8AD4ADgAPAA8ADzAePH4//D/4B+AAAAAAAAAAAA=',
      '4': 'AfAB8APwA/AH8A/wDvAc8DzwOPB48PDw8PD//P/8//wA8ADwAPAA8AAAAAAAAAAAAAA=',
      '5': 'f/B/8H/weAB4AHgAeAB/4H/wf/hA+AB4ADgAPAA8ADgAePH4//D/4D+AAAAAAAAAAAA=',
      '6': 'D/gf+D/4fBh4AHAAcAD/4P/w//j4fPg88DzwPHA8cDx4PHx4P/gf8AfAAAAAAAAAAAA=',
      '7': '//z//P/4AHgAeABwAPAA4AHgAeABwAPAA8AHgAeABwAPAA8AHgAeAAAAAAAAAAAAAAA=',
      '8': 'H+A/8H/4eHhwOHA4eDh4eD/wH+A/+Hx4cDzwPPA88DzwPHx8f/g/8A/AAAAAAAAAAAA=',
      '9': 'H+A/8H/4eHjwOPA88DzwPPA8cHx8/H/8P/wPvAA4AHgAeDHwP/A/4B+AAAAAAAAAAAA=',
      ' ': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'A': 'A8AD4AfgB+AH8A/wD3AOcB54HngcOBw8P/w//D/+eB54HnAP8A/wDwAAAAAAAAAAAAA=',
      'B': '/8D/4P/w4PjgeOB44Hjg8P/w/+D/8OD44HjgOOA44DjgeP/4//D/4AAAAAAAAAAAAAA=',
      'C': 'B/gf/D/8PAx4AHgAcABwAPAA8ADwAPAA8ABwAHgAeAA8DD48H/wP/APwAAAAAAAAAAA=',
      'D': '/4D/4P/w8PjwePA48DzwPPA88DzwPPA88DzwPPA88Hjw+P/w/+D/wAAAAAAAAAAAAAA=',
      'E': '//j/+P/48ADwAPAA8ADwAP/w//D/8PAA8ADwAPAA8ADwAP/4//j/+AAAAAAAAAAAAAA=',
      'F': '//D/8P/w4ADgAOAA4ADgAP/g/+D/4OAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAA=',
      'G': 'D/Af+D/4fBh4CPAA8ADwAPAA8Pzw/PD88PzwHPAceBx4HD48P/wf+APgAAAAAAAAAAA=',
      'H': '8DzwPPA88DzwPPA88DzwPP/8//z//PA88DzwPPA88DzwPPA88DzwPAAAAAAAAAAAAAA=',
      'I': '//D/8P/wDwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAP/w//D/8AAAAAAAAAAAAAA=',
      'J': 'H/Af8B/wAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPDA8PHw/+D/wB8AAAAAAAAAAAA=',
      'K': '8B7wPvB88Pjx8PPg98D/gP8A/4D/gPvA8+Dx4PDw8PjwePA88D7wHgAAAAAAAAAAAAA=',
      'L': '8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAP/4//j/+AAAAAAAAAAAAAA=',
      'M': '8D74Pvh++H78fvz+/P7v/u/e797n3uee557gHuAe4B7gHuAe4B7gHgAAAAAAAAAAAAA=',
      'N': '+Dz4PPw8/Dz8PP48/jz/PPc897zzvPO88/zx/PH88Pzw/PD88HzwfAAAAAAAAAAAAAA=',
      'O': 'H+A/8D/4eHh4PPA88DzwPPA88DzwPPA88DzwPPA8cDx4eHz4P/Af4AfAAAAAAAAAAAA=',
      'P': '/8D/8P/48PjwePA48DjwOPB4//j/8P/g/wDwAPAA8ADwAPAA8ADwAAAAAAAAAAAAAAA=',
      'Q': 'H+A/8D/4eHh4PPA88DzwPPA88DzwPPA88DzwPPA8cDx4eHz4P/Af4AfwAPgAeAAwAAA=',
      'R': '/8D/8P/48PjwePA48DjwePB4//D/4P/g8fDwePB48DzwPPAe8B7wDwAAAAAAAAAAAAA=',
      'S': 'H/g/+H/4eBjwAPAA8AB4AH+AP+Af+AP4AHwAPAA8ADxAPHj4f/h/8B/AAAAAAAAAAAA=',
      'T': '////////A8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAAAAAAAAAAAAAA=',
      'U': '8DzwPPA88DzwPPA88DzwPPA88DzwPPA88DzwPHA8cDx4OHz4P/gf8AfAAAAAAAAAAAA=',
      'V': '8A9wD3gOeB54HjgePBw8PBw8HDgeOB54DnAPcA/wB/AH4AfgA+ADwAAAAAAAAAAAAAA=',
      'W': '4AfgB+AH4AfwB/PH889zz3Pvd+537nfuf25+fj5+Pnw+fD48PDw8PAAAAAAAAAAAAAA=',
      'X': 'eA94HjwePDwePA94D/AH8APgA8AD4AfgD/APeB54Pjw8HngeeA/wDwAAAAAAAAAAAAA=',
      'Y': '8A94D3gePB48PB54HngP8AfwB+ADwAPAA8ADwAPAA8ADwAPAA8ADwAAAAAAAAAAAAAA=',
      'Z': '//z//P/8AHgA8AHwAeADwAPAB4APAA8AHgA8ADwAeADwAP/8//z//AAAAAAAAAAAAAA=',
      'a': 'AAAAAAAAAAAAAAcAf+B/8Hz4YDgAOA/4P/h/+Hg48DjwOPB4+Ph/+D/4HwAAAAAAAAA=',
      'b': '4ADgAOAA4ADgAOMA7+D/8P3w8HjwePB44DjgOOA48HjwePB4+PD/8P/gB4AAAAAAAAA=',
      'c': 'AAAAAAAAAAAAAAOAH/A/8H5weBDwAPAA8ADwAPAA8ADwAHgQfDA/8B/wB8AAAAAAAAA=',
      'd': 'ADgAOAA4ADgAOAc4H/g/+H34eHjwePA48DjwOPA48DjweHB4ePg/+D/4DwAAAAAAAAA=',
      'e': 'AAAAAAAAAAAAAAOAH+A/+H74eDxwPPAc//z//P/88ADwAHgAfDw//B/8B+AAAAAAAAA=',
      'f': 'A/AH8A/wDwAOAA4A//D/8P/wDgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=',
      'g': 'AAAAAAAAAAAAAAYAH/g/+H34eHjwePA48DjwOPA48DjweHh4fPg/+B/4BjgAOCB4P/A=',
      'h': '4ADgAOAA4ADgAOOA7+D/4P3w8PDwcPBw4HDgcOBw4HDgcOBw4HDgcOBwAAAAAAAAAAA=',
      'i': 'BwAHAAcABwAAAAAAfwB/AH8ABwAHAAcABwAHAAcABwAHAAcABwD/+P/4AAAAAAAAAAA=',
      'j': 'B4AHgAeAB4AAAAAAf4B/gH+AB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeA/wA=',
      'k': '4ADgAOAA4ADgAOAA4PDh4OPA54DvAP4A/gD/APeA58DjwOHg4fDg8OB4AAAAAAAAAAA=',
      'l': '/gD+AP4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AD/AP8AfwAAAAAAAAAAA=',
      'm': 'AAAAAAAAAAAAAAww//j//Pf855zjnOOc45zjnOOc45zjnOOc45zjnOOcAAAAAAAAAAA=',
      'n': 'AAAAAAAAAAAAAAOA7+D/4P3w8PDwcPBw4HDgcOBw4HDgcOBw4HDgcOBwAAAAAAAAAAA=',
      'o': 'AAAAAAAAAAAAAAMAH+A/8H74eHhwPPA88DzwPPA88DxwPHg4fPg/8B/wB8AAAAAAAAA=',
      'p': 'AAAAAAAAAAAAAAMA78D/4P3w8HDwePB44DjgOOA48HjwePB4+PD/8P/g54DgAOAA4AA=',
      'q': 'AAAAAAAAAAAAAAIAH/g/+H/4eHhwePA48DjwOPA48DhwOHh4fPg/+B/4D7gAOAA4ADg=',
      'r': 'AAAAAAAAAAAAAAGA//D/8P/w+BDwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAA=',
      's': 'AAAAAAAAAAAAAAcAP+B/4Hjg8ADwAPgAf4A/4B/wAfAAcADw8PD/4P/AH4AAAAAAAAA=',
      't': 'AAAAAA8ADwAPAA8A//j/+P/4DwAPAA8ADwAPAA8ADwAPAA8AD4AH+AP4AAAAAAAAAAA=',
      'u': 'AAAAAAAAAAAAAAAA4HDgcOBw4HDgcOBw4HDgcOBw4HDwcPDw+fB/8H/wHgAAAAAAAAA=',
      'v': 'AAAAAAAAAAAAAAAA4BzwPHA8eDh4eDh4PHA88BzwHuAf4A/AD8APwAeAAAAAAAAAAAA=',
      'w': 'AAAAAAAAAAAAAAAA4AfgB+AH8Afxz3PPc85z7n/uP/4/fD58PnwefBw4AAAAAAAAAAA=',
      'x': 'AAAAAAAAAAAAAAAA8Dx4eDx4PPAf4A/AD8AHgA/AH+Af8DzweHj4PPA+AAAAAAAAAAA=',
      'y': 'AAAAAAAAAAAAAAAA8B7wHHA8eDx4eDx4PHAc8B7wHuAP4A/AB8AHwAeAB4AHgA8AfwA=',
      'z': 'AAAAAAAAAAAAAAAAf/B/8H/wAfAB4APAB4APAB8AHgA8AHgA8AD/8P/wAAAAAAAAAAA=',
      '`': '8AB4ADwAHAAeAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '!': 'AAAAAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAHAAcAAAAAAA8ADwAPAA8AAAAAAAAAA=',
      '@': 'AAAAAAAAAfAP/B/+Ph44D3gHcf/z/+P/54/nB+cH5wfnB+eP4//x/3D/eAA8AB8MD/w=',
      '#': 'AAAAAAOOA44DnAOcB5wHPH//f/9//w44DnAOcP/+//7//hzgPOA54DnAOcAAAAAAAAA=',
      '$': 'AAAHAAcABwAPwD/wf/D3MOcA5wD3AP8Af8A/8Af4B3gHOAc4x3j/+P/wf+AHAAcABwA=',
      '%': 'AAAAAAAAPgB/APeA44DhgOOA/49/Pz/8B/A/vH7+cf8BxwHHAccB7wD/AH4AAAAAAAA=',
      '&': 'AAAAAA/wH/AfcBwAHAAcAB4AHwAfAD+Ae8dzx/Hn8Pfwf/B+eD58fj//H/8HwAAAAAA=',
      '(': 'AAAOAB4AHAA8ADgAeAB4AHAAcADwAPAA8ADwAPAA8ADwAHAAcAB4AHgAOAA8ABwAHgA=',
      ')': 'AADgAHAAeAA4ADgAPAAcABwAHgAeAB4ADgAOAA4AHgAeAB4AHAAcADwAOAA4AHgAcAA=',
      '{': 'AAAB8AfwB/AHAAcABwAHAAcABwAPAA8APwD+AP4AHwAPAA8ABwAHAAcABwAHAAcAB/A=',
      '}': 'AAD8AP4A/gAPAA8ADwAPAA8ADwAPAA8AB8AH8AfwB4APAA8ADwAPAA8ADwAPAA8A/gA=',
      '[': 'AAD8APwA/ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAPwA/AA=',
      ']': 'AAD+AP4A/gAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAP4A/gA=',
      '_': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '+': 'AAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOA//7//v/+A4ADgAOAA4ADgAOAAAAAAAAAAAA=',
      '-': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AP8A/wAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '*': 'AAAAAAYABgDGMPbwf+AfwB+Af+D28OZwBgAGAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '/': 'AAAAAAA8ADgAeABwAPAA4AHgAcADwAPAB4AHgA8ADwAeAB4AHAA8ADgAeABwAPAA4AA=',
      ':': 'AAAAAAAAAAAAAAAAAAAAAPAA8ADwAPAAAAAAAAAAAAAAAAAA8ADwAPAA8AAAAAAAAAA=',
      ',': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAB4AHgAeAB4APAA8AA=',
      '.': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcAAAAAAAAAA=',
      '?': 'AAAAAH+A/8D/4MHgAOAB4AHgA8AHgA8AHgAeABwAHAAcAAAAAAAcABwAHAAAAAAAAAA=',
      ';': 'AAAAAAAAAAAAAAAAAAAAAHgAeAB4AHgAAAAAAAAAAAAAAAAAeAB4AHgAeAB4APAA8AA=',
      '\'': 'AAAAAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      '"': 'AAAAAOOA44DjgOOA44DjgOOA44AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='
    }
  }
};

FontFamilyDefinition.initialize();

/* Properties */

var SizeType = {
  Absolute : 0, // exact size
  Fraction : 1, // size as part of parent
  Relative : 2, // size together with siblings as part of parent
}

var Rotation = {
  Normal : 'N',
  Right : 'R',
  Bottom : 'I',
  Left : 'B'
}

var PrintDensityName = {
  '6dpmm' : 6,
  '8dpmm' : 8,
  '12dpmm' : 12,
  '24dpmm' : 24,
}

var FontFamilyName = {
  A : 'A',
  B : 'B',
  D : 'D',
  E : 'E',
  F : 'F',  
  /*G : 'G',
  H : 'H',
  P : 'P',
  Q : 'Q',
  U : 'U',
  V : 'V',*/
}

var BarcodeTypeName = {
  Code11: 'Code11',
  Interleaved25: 'Interleaved25',
  Code39: 'Code39',
  PlanetCode: 'PlanetCode',
  PDF417: 'PDF417',
  EAN8: 'EAN8',
  UPCE: 'UPCE',
  Code93: 'Code93',
  Code128: 'Code128',
  EAN13: 'EAN13',
  Industrial25: 'Industrial25',
  Standard25: 'Standard25',
  ANSICodabar: 'ANSICodabar',
  Logmars: 'Logmars',
  MSI: 'MSI',
  Plessey: 'Plessey',
  QRCode: 'QRCode',
  DataMatrix: 'DataMatrix',
  PostNet: 'PostNet'
}

var AlignmentValue = {
  Start: 'Start',
  Center: 'Center',
  End: 'End',
}

var LabelTools = {
  ImageProcessor: undefined,
  ImageResizer: undefined,
  Logger: function(msg) { console.log(msg); },
}

class ImageProcessor {
  contstructor() {
    this.processor = undefined;
  }

  processImage(data, cb) {
    LabelTools.Logger("Image Processor not defined");
    cb([]);
  }

  processZplImage(width, height, data) {

  }
}

class ImageResizer {
  constructor() {    
  }

  resize(targetWidth, targetHeight, width, height, data) {
    var result = [];

    var dx = width / targetWidth;
    var dy = height / targetHeight;

    for (var y = 0; y < targetHeight; y++) {
      for (var x = 0; x < targetWidth; x++) {
        var iy = Math.floor(dy * y);
        var ix = Math.floor(dx * x);

        var value = data[(iy * width) + ix];

        result.push(value ? 1 : 0);
      }
    }

    return result;
  }
}

class BarcodeRenderer {
  constructor() {

  }

  render(width, height, type, data) {
    var box = new Box();
    box.width = width;
    box.height = height;
    box.border = 2;

    var text = new Text();
    box.content.push(text);
    text.fontFamily = new FontFamily(FontFamilyName.B);
    text.text = 'BARCODE';

    text.verticalAlignment = new Alignment(AlignmentValue.Center);
    text.horizontalAlignment = new Alignment(AlignmentValue.Center);

    var data = [];
    for (var y = 0; y < height; y++) {
      data.push([]);
      for (var x = 0; x < width; x++) {
        data[y].push(0);
      }
    }

    box.generateBinaryImage(data, 0, 0, width, height, width, height);

    return data;
  }
}

class Size {
  constructor(value, sizeType) {
    this.value = value || 0;
    this.sizeType = sizeType || SizeType.Absolute;
  }

  getValue(unitSize) {
    if (typeof(unitSize) == 'number' && this.sizeType == SizeType.Relative)
    {
      return this.value * unitSize;
    }
    return this.value;
  }

  toString() {
    return this.value + (this.sizeType == SizeType.Relative ? '*' : '');
  }
}

class Spacing {

  constructor(left, top, right, bottom) {
    this.left = left || 0;
    this.top = (top == undefined ? this.left : top);
    this.right = (right == undefined ? this.left : right);
    this.bottom = (bottom == undefined ? this.top : bottom);
  }

  get horizontal() {
    return this.left + this.right;
  }

  get vertical() {
    return this.top + this.bottom;
  }

  get horizontalDifference() {
    return Math.abs(this.left - this.top);
  }

  get verticalDifference() {
    return Math.abs(this.top - this.bottom);
  }

  toString() {
    return this.left + ', ' + this.top + ', ' + this.right + ', ' + this.bottom;
  }
}

class GridPosition {
  constructor(column, row) {
    this.column = column || 0;
    this.row = row || 0;
  }

  toString() {
    return this.column + ', ' + this.row;
  }
}

class FontFamily {
  constructor(value) {
    this.value = value;
  }

  get definition() {
    return FontFamilyDefinition[this.value];
  }

  toString() {
    return this.value;
  }
}

class Alignment {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

class PrintDensity {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value + ' dpmm';
  }
}

class GraphicData {

  constructor(width, height, data) {
    this.data = data || [];
    this.width = width || 0;
    this.height = height || 0;
  }

  toString() {
    return this.width + ' x ' + this.height;
  }  
}

class BarcodeType {
  constructor(type) {
    this.value = type;
  }

  toString() {
    return this.value;
  }
}

/* Elements */

class BaseElement {
  constructor() {
    this.invert = false;
    this.fixed = false;

    this.grid = new GridPosition();

    this.notImplemented = [];
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    return '';
  }

  generateXML(availableWidth, availableHeight) {
    return '';
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

  }
}

class BaseVisualElment extends BaseElement {
  constructor() {
    super(); 

    this.width = new Size();
    this.height = new Size();

    this.top = new Size();
    this.left = new Size();

    this.margin = new Spacing();
  }

  getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    // gets start position and size of content
    var left = this.getSize(this.left, widthUnits) + this.margin.left;
    var top = this.getSize(this.top, heightUnits) + this.margin.top;

    var width = this.getSize(this.width, widthUnits) || (availableWidth - this.margin.horizontal);
    var height = this.getSize(this.height, heightUnits) || (availableHeight - this.margin.vertical);

    if (typeof(this.top) == 'object' && this.top.sizeType == SizeType.Fraction) {
      top = (availableHeight * this.top.value);
    }
    if (typeof(this.left) == 'object' && this.left.sizeType == SizeType.Fraction) {
      left = (availableWidth * this.left.value);
    }

    return {
      left: Math.round(left + offsetLeft),
      top: Math.round(top + offsetTop),
      width: Math.round(width),
      height: Math.round(height),
    };
  }

  getSize(prop, unitSize) {
    if (typeof(prop) == 'number') {
      return prop;
    } else {
      return prop.getValue(unitSize);
    }
  }

  calculateUnits() {
    var units = {
      absolute: {
        width: 0,
        height: 0
      },
      relative: {
        width: 0,
        height: 0
      }
    }

    var elements = this.content || [];

    for (var e_id in elements) {
      var element = elements[e_id];

      units.absolute.width += element.margin.horizontal + (this.border || 0);
      units.absolute.height += element.margin.vertical + (this.border || 0);

      if (typeof(element.border) == 'number') {
        units.absolute.width += element.border * 2;
        units.absolute.height += element.border * 2;
      }

      if (typeof(element.width) == 'number') {
        units.absolute.width += element.width;
      } else if (element.width.sizeType == SizeType.Absolute) {
        units.absolute.width += element.width.value;
      } else {
        units.relative.width += element.width.value;
      }

      if (typeof(element.height) == 'number') {
        units.absolute.height += element.height;
      } else if (element.height.sizeType == SizeType.Absolute) {
        units.absolute.height += element.height.value;
      } else {
        units.relative.height += element.height.value;
      }
    }

    return units;
  }
}

class BaseContainerElement extends BaseVisualElment {
  constructor() {
    super();

    this.padding = new Spacing();

    this.content = [];
  }

  calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits) {
    var units = this.calculateUnits();

    var spacingLeft = this.margin.left + this.padding.left;
    var spacingTop = this.margin.top + this.padding.top;

    var spacingHorizontal = spacingLeft + this.margin.right + this.padding.right;
    var spacingVertical = spacingTop + this.margin.bottom + this.padding.right;

    var width = availableWidth - spacingHorizontal - (this.border || 0) * 2;
    var height = availableHeight - spacingVertical - (this.border || 0) * 2;

    var widthUnits = (width - units.absolute.width) / (units.relative.width || 1);
    var heightUnits = (height - units.absolute.height) / (units.relative.height || 1);

    return {
      spacingTop: spacingTop,
      spacingLeft: spacingLeft,
      width: width,
      height: height,
      widthUnits: widthUnits,
      heightUnits: heightUnits,
    }
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    var zpl = '';

    for (var c_id in this.content) {
      var element = this.content[c_id];

      var left = offsetLeft + sizing.spacingLeft + (this.border || 0);
      var top = offsetTop + sizing.spacingTop + (this.border || 0);

      if (element.fixed) {
        left = this.getSize(element.left);
        top = this.getSize(element.top);
      }

      zpl += element.generateZPL(left, top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits);
    }

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    for (var c_id in this.content) {
      var element = this.content[c_id];

      var left = offsetLeft + sizing.spacingLeft + (this.border || 0);
      var top = offsetTop + sizing.spacingTop + (this.border || 0);

      if (element.fixed) {
        left = this.getSize(element.left);
        top = this.getSize(element.top);
      }

      element.generateBinaryImage(binaryBase, left, top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits);
    }
  }
}

class Label extends BaseContainerElement {
  constructor() {
    super();

    this.printDensity = new PrintDensity(PrintDensityName['8dpmm']);

    this.notImplemented = ['fixed', 'grid', 'margin', 'left', 'top']
  }

  generateZPL() {
    var zpl = '^XA';

    zpl += '\n';

    var width = this.getSize(this.width) * this.printDensity.value;
    var height = this.getSize(this.height) * this.printDensity.value;

    zpl += super.generateZPL(0, 0, width, height);

    zpl += '^XZ';

    return zpl;
  }

  generateBinaryImage(binaryBase) {
    var width = this.getSize(this.width) * this.printDensity.value;
    var height = this.getSize(this.height) * this.printDensity.value;

    for (var y = 0; y < height; y++) {
      binaryBase.push([]);
      for (var x = 0; x < width; x++) {
        binaryBase[y].push(false);
      }
    }

    super.generateBinaryImage(binaryBase, 0, 0, width, height);
  }
}

class Text extends BaseVisualElment {
  constructor() {
    super();

    this.text = '';
    this.fontFamily = new FontFamily(FontFamilyName.A);

    // this.rotation = Rotation.Normal;
    this.verticalAlignment = new Alignment(AlignmentValue.Start);
    this.horizontalAlignment = new Alignment(AlignmentValue.Start);
  }

  characterMap() {
    var characters = [];
    for (var c_id in this.text) {
      var character = this.text[c_id];
      var charset = this.fontFamily.definition.characters.empty;
      if (this.fontFamily.definition.characters[character] != undefined) {
        charset = this.fontFamily.definition.characters[character];
      }
      characters.push(charset);
    }
    return characters;
  }

  calculateSize() {
    var characters = this.characterMap();
    var height = characters[0].length + this.fontFamily.definition.spacing.top + this.fontFamily.definition.spacing.bottom;
    var width = 0;

    for (var c_id in characters)
    {
      var character = characters[c_id];
      width += character[0].length;
      width += this.fontFamily.definition.spacing.left + this.fontFamily.definition.spacing.right;
    }

    return {
      width: width,
      height: height
    }
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var size = this.calculateSize();

    if (this.verticalAlignment.value == AlignmentValue.End) {
      position.top = position.top + position.height - size.height;
    } else if (this.verticalAlignment.value == AlignmentValue.Center) {
      position.top = position.top + (position.height / 2) - (size.height / 2);
    }

    var zpl = '';

    if (this.invert) {
      zpl += '^LRY\n';
    }

    var horizontalAlignment;
    switch (this.horizontalAlignment.value) {
      case AlignmentValue.Start:
        horizontalAlignment = 'L'
        break;
      case AlignmentValue.Center:
        horizontalAlignment = 'C'
        break;
      case AlignmentValue.End:
        horizontalAlignment = 'R'
        break;
    }

    zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top);
    zpl += '^A' + this.fontFamily.value + ',' + 'N' + ',,' + '\n';
    zpl += '^FB' + Math.round(position.width) + ',1,0,' + horizontalAlignment + ',0\n';
    zpl += '^FD' + this.text + '^FS\n';

    if (this.invert) {
      zpl += '^LRN\n';
    }

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var characters = this.characterMap();

    var size = this.calculateSize();

    if (this.horizontalAlignment == AlignmentValue.End) {
      position.left = position.left + position.width - (size.width);
    } else if (this.horizontalAlignment == AlignmentValue.Center) {
      position.left = position.left + (position.width - size.width) / 2;
    }

    if (this.verticalAlignment.value == AlignmentValue.End) {
      position.top = position.top + position.height - size.height;
    } else if (this.verticalAlignment.value == AlignmentValue.Center) {
      position.top = position.top + ((position.height) / 2) - (size.height / 2);
    }

    for (var c_id in characters) {
      var character = characters[c_id];

      var top = position.top;
      var left = position.left;

      position.left += character[0].length + this.fontFamily.definition.spacing.left + this.fontFamily.definition.spacing.right;

      for (var y = 0; y < character.length; y++) {
        for (var x = 0; x < character[0].length; x++) {          
          var value = character[y][x] == 1;

          var yIndex = Math.round(y + top);
          var xIndex = Math.round(x + left);

          if ((yIndex > 0 && yIndex < binaryBase.length && xIndex > 0 && xIndex < binaryBase[yIndex].length) == false) continue;

          if (value) {
            if (this.invert) {
              binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
            } else {
              binaryBase[yIndex][xIndex] = value;
            }
          }
        }
      }
    }
  }
}

class BaseGraphic extends BaseContainerElement {
  constructor() {
    super();

    this.border = 0;
    this.fill = false;
  }
}

class Box extends BaseGraphic {
  constructor() {
    super();

    this.cornerRadius = 0;
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var zpl = '^FO' + Math.round(position.left) + ',' + Math.round(position.top);

    if (this.invert) {
      zpl += '^FR';
    }

    var thickness = this.border;
 
    if (this.fill) {
      thickness = Math.min(position.width, position.height);
    }

    var shorterSide = Math.min(position.width, position.height);
    var roundingIndex = Math.round((this.cornerRadius * 16) / shorterSide);

    if (thickness > 0) {
      zpl += '^GB' + position.width + ',' + position.height + ',' + (thickness || '') + ',,' + roundingIndex + '^FS' + '\n';
    } else {
      zpl += '\n';
    }

    zpl += super.generateZPL(position.left, position.top, position.width, position.height)

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var borderSize = (this.border || 0);

    var yTop = this.cornerRadius;
    var yBottom = position.height - this.cornerRadius - 1;
    var xLeft = this.cornerRadius;
    var xRight = position.width - this.cornerRadius - 1;

    if (this.fill || this.border > 0) {
      for (var y = 0; y < position.height; y++) {
        for (var x = 0; x < position.width; x++) {

          var xIndex = x + position.left;
          var yIndex = y + position.top;

          if (yIndex < 0 || xIndex < 0 || yIndex >= binaryBase.length || xIndex >= binaryBase[yIndex].length) continue;

          var center = undefined;
          if (this.cornerRadius > 0) {
            if (y < yTop) {
              if (x < xLeft) {
                // top left
                center = {
                  x: xLeft,
                  y: yTop,
                }
              } else if (x > xRight) {
                // top right
                center = {
                  x: xRight,
                  y: yTop,
                }
              }
            } else if (y > yBottom) {
              if (x < xLeft) {
                // bottom left
                center = {
                  x: xLeft,
                  y: yBottom,
                }
              } else if (x > xRight) {
                // bottom right
                center = {
                  x: xRight,
                  y: yBottom,
                }
              }
            }
          }

          if (center != undefined) {
            var distance = Math.sqrt(Math.pow(y - center.y, 2) + Math.pow(x - center.x, 2));
            if (distance <= this.cornerRadius + 1) {
              if (this.fill || distance >= this.cornerRadius - this.border) {
                if (this.invert) {
                  binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
                } else {
                  binaryBase[yIndex][xIndex] = true;
                }
              }
            }
            continue;
          }

          if ((this.fill) || (y < borderSize) || (y >= position.height - borderSize) || (x < borderSize) || (x >= position.width - borderSize)) {
            if (this.invert) {
              binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
            } else {
              binaryBase[yIndex][xIndex] = true;
            }
          }
        }
      }
    }

    super.generateBinaryImage(binaryBase, position.left, position.top, position.width, position.height);
  }
}

class Circle extends BaseGraphic {
  constructor() {
    super();
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var zpl = '^FO' + Math.round(position.left) + ',' + Math.round(position.top);

    if (this.invert) {
      zpl += '^FR';
    }

    var thickness = this.border;

    if (this.fill) {
      thickness = Math.min(position.width, position.height);
    }

    if (thickness > 0) {
      if (position.width != position.height) {
        // ellipse
        zpl += '^GE' + position.width + ',' + position.height + ',' + (thickness || '') + ',B' + '^FS' + '\n';
      } else {
        // circle
        zpl += '^GC' + position.width + ',' + (thickness || '') + ',B' + '^FS' + '\n';
      }
    } else {
      zpl += '\n';
    }

    zpl += super.generateZPL(position.left, position.top, position.width, position.height)

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var yCenter = position.height / 2;
    var xCenter = position.width / 2;

    var widthHalf = position.width / 2;
    var heightHalf = position.height / 2;

    var widthHalfBorder = widthHalf - this.border;
    var heightHalfBorder = heightHalf - this.border;

    if (this.fill || this.border > 0) {
      for (var y = 0; y < position.height; y++) {
        for (var x = 0; x < position.width; x++) {

          var yIndex = Math.round(y + position.top);
          var xIndex = Math.round(x + position.left);

          var value = false;

          value = (Math.pow(x - xCenter, 2) / Math.pow(widthHalf, 2)) + (Math.pow(y - yCenter, 2) / Math.pow(heightHalf, 2)) <= 1;
          if (this.fill == false) {
            value &= (Math.pow(x - xCenter, 2) / Math.pow(widthHalfBorder, 2)) + (Math.pow(y - yCenter, 2) / Math.pow(heightHalfBorder, 2)) >= 1;
          }

          if (value) {
            if (this.invert) {
              binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
            } else {
              binaryBase[yIndex][xIndex] = value;
            }
          }
        }
      }
    }

    super.generateBinaryImage(binaryBase, position.left, position.top, position.width, position.height);
  }
}

class Graphic extends BaseVisualElment {
  constructor() {
    super();

    this.data = new GraphicData();
    this.border = 0;
  }

  generateContainer() {
    var container = new Box();
    container.border = this.border;
    container.margin = this.margin;
    container.top = this.top;
    container.left = this.left;
    return container;
  }

  extractImageData(cb) {
    var processor = LabelTools.ImageProcessor || new ImageProcessor();
    var imageData = processor.processImage(this.data);
    cb(imageData);
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var container = this.generateContainer();    
    var zpl = container.generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    var imageData = LabelTools.ImageResizer.resize(position.width, position.height, this.data.width, this.data.height, this.data.data);

    zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top);

    if (this.invert)
    {
      zpl += "^FR";
    }

    var widthBytes = Math.ceil(position.width / 8);
    var byteCount = widthBytes * position.height;
    var hexData = ZPLImageTools.generateHexAscii(position.width, position.height, imageData);
    hexData = ZPLImageTools.encodeHexAscii(hexData);

    zpl += '^GFA,' + byteCount + ',' + byteCount + ',' + widthBytes + ',' + hexData + '^FS';

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var container = this.generateContainer();
    container.generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    var imageData = LabelTools.ImageResizer.resize(position.width, position.height, this.data.width, this.data.height, this.data.data);


    for (var y = 0; y < position.height; y++) {
      for (var x = 0; x < position.width; x++) {

        var yIndex = y + position.top;
        var xIndex = x + position.left;

        var index = y * position.width + x;

        var value = imageData[index];

        if (value) {
          if (this.invert) {
            binaryBase[yIndex][xIndex] = !binaryBase[yIndex][xIndex];
          } else {
            binaryBase[yIndex][xIndex] = true;
          }
        }
      }
    }
  }
}

class Grid extends BaseContainerElement {
  constructor() {
    super();

    this.columns = [];
    this.rows = [];

    this.columnSpacing = 0;
    this.rowSpacing = 0;
  }

  calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits) {
    var units = this.calculateUnits();

    var spacingLeft = this.margin.left;
    var spacingTop = this.margin.top;

    var spacingHorizontal = spacingLeft + this.margin.right;
    var spacingVertical = spacingTop + this.margin.bottom;

    var width = availableWidth - spacingHorizontal;
    var height = availableHeight - spacingVertical;

    var widthUnits = (width - units.absolute.width) / (units.relative.width || 1);
    var heightUnits = (height - units.absolute.height) / (units.relative.height || 1);

    return {
      spacingTop: spacingTop,
      spacingLeft: spacingLeft,
      width: width,
      height: height,
      widthUnits: widthUnits,
      heightUnits: heightUnits,
    }
  }

  generateChildren(availableWidth, availableHeight) {

    var columnDefinitions = this.columns;
    if (columnDefinitions.length == 0) {
      columnDefinitions.push(new Size(1, SizeType.Relative));
    }
    var rowDefinitions = this.rows;
    if (rowDefinitions.length == 0) {
      rowDefinitions.push(new Size(1, SizeType.Relative));
    }

    var units = {
      absolute: {
        width: 0,
        height: 0
      },
      relative: {
        width: 0,
        height: 0
      }
    }

    for (var c_id in columnDefinitions) {
      var cell = columnDefinitions[c_id];

      if (typeof(cell) == 'object') {
        if (cell.sizeType == SizeType.Absolute) {
          units.absolute.width += cell.value;
        } else {
          units.relative.width += cell.value;
        }
      } else if (typeof(cell) == 'number') {
        units.absolute.width += cell;
      }
    }

    for (var c_id in rowDefinitions) {
      var cell = rowDefinitions[c_id];

      if (typeof(cell) == 'object') {
        if (cell.sizeType == SizeType.Absolute) {
          units.absolute.height += cell.value;
        } else {
          units.relative.height += cell.value;
        }
      } else if (typeof(cell) == 'number') {
        units.absolute.height += cell;
      }
    }

    var borderSpacing = (this.border || 0) * 4;

    units.absolute.width += borderSpacing;
    units.absolute.height += borderSpacing;

    var absoluteWidth = (availableWidth - borderSpacing - (this.columnSpacing * (columnDefinitions.length + 1)));
    var absoluteHeight = (availableHeight - borderSpacing - (this.rowSpacing * (rowDefinitions.length + 1)));

    var widthUnits = (absoluteWidth - units.absolute.width) / (units.relative.width || 1);
    var heightUnits = (absoluteHeight - units.absolute.height) / (units.relative.height || 1);

    var content = [];
    var contentCells = [];

    var top = this.rowSpacing;

    var unusedHeight = absoluteHeight + (this.border || 0) * 2;

    for (var y = 0; y < rowDefinitions.length; y++) {
      content[y] = [];

      var unusedWidth = absoluteWidth + (this.border || 0) * 2;

      var left = this.columnSpacing;

      var height = Math.ceil(this.getSize(rowDefinitions[y], heightUnits)) + (this.border || 0);

      if (y == this.rows.length - 1) {
        height = unusedHeight;
      }

      unusedHeight -= height;

      for (var x = 0; x < this.columns.length; x++) {

        var cell = new Box();
        content[y].push(cell);
        contentCells.push(cell);

        var width = Math.ceil(this.getSize(columnDefinitions[x], widthUnits)) + (this.border || 0);

        if (x == this.columns.length - 1) {
          width = unusedWidth;
        }
        
        unusedWidth -= width;

        cell.width = width;
        cell.height = height;
        cell.top = top;
        cell.left = left;
        cell.border = this.border;
        cell.padding = this.padding;

        left += width + this.columnSpacing;
      }

      top += height + this.rowSpacing;
    }

    for (var c_id in this.content) {
      var element = this.content[c_id];

      if (element.grid.row < 0 || element.grid.row >= rowDefinitions.length) continue;
      if (element.grid.column < 0 || element.grid.column >= columnDefinitions.length) continue;

      content[element.grid.row][element.grid.column].content.push(element);
    }

    var contentBox = new Box();
    contentBox.content = contentCells;
    contentBox.fixed = this.fixed;
    contentBox.width = this.width;
    contentBox.height = this.height;
    contentBox.border = this.border;
    contentBox.invert = this.invert;
    contentBox.padding = new Spacing();

    return contentBox;
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    var contentBox = this.generateChildren(position.width, position.height);
    var sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    return contentBox.generateZPL(position.left, position.top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits);
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    var contentBox = this.generateChildren(position.width, position.height);
    var sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    contentBox.generateBinaryImage(binaryBase, position.left, position.top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits);
  }
}

class Barcode extends BaseVisualElment {
  constructor() {
    super();

    this.data = '';
    this.maxLength = 32;
    this.type = new BarcodeType(BarcodeTypeName.CODE_11);

    this.notImplemented = ['invert']
  }

  generateZPL(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {

    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var zpl = '';

    switch (this.type.value) {
      case BarcodeTypeName.Code49:
        zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top + 25);
        break;

      default:
        zpl += '^FO' + Math.round(position.left) + ',' + Math.round(position.top);
        break;
    }


    if (this.invert)
    {
      zpl += "^FR";
    }

    console.log('rendering barcode: ' + this.type.value);

    switch (this.type.value) {
      case BarcodeTypeName.Code11:
        zpl += '^B1N,N,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.Interleaved25:
        zpl += '^B2N,' + position.height + ',Y,N,N';
        break;

      case BarcodeTypeName.Code39:
        zpl += '^B3N,N,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.PlanetCode:
        zpl += '^B5N,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.PDF417:
        var rowHeight = 10;
        var rows = Math.ceil(position.height / rowHeight);
        var bytes = this.maxLength * rows;
        var columns = Math.ceil(bytes / rows);

        zpl += '^B7N,' + rowHeight + ',0,' + columns + ',' + rows + ',N';
        break;

      case BarcodeTypeName.EAN8:
        zpl += '^B8N,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.UPCE:
        zpl += '^B9N,' + position.height + ',Y,N,Y';
        break;

      case BarcodeTypeName.Code93:
        zpl += '^BAN,' + position.height + ',Y,N,N';
        break;

      case BarcodeTypeName.Code128:
        zpl += '^BCN,' + position.height + ',Y,N,N,N';
        break;

      case BarcodeTypeName.EAN13:
        zpl += '^BEN,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.Industrial25:
        zpl += '^BIN,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.Standard25:
        zpl += '^BJN,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.ANSICodabar:
        zpl += '^BKN,N,' + position.height + ',Y,N,A,A';
        break;

      case BarcodeTypeName.Logmars:
        zpl += '^BLN,' + position.height + ',N';
        break;

      case BarcodeTypeName.MSI:
        zpl += '^BMN,B,' + position.height + ',Y,N,N';
        break;

      case BarcodeTypeName.Plessey:
        zpl += '^BPN,N,' + position.height + ',Y,N';
        break;

      case BarcodeTypeName.QRCode:      
        var magnification = Math.floor(position.height / 10) - 2;
        zpl += '^BQN,2,' + magnification + ',Q,7';
        break;

      case BarcodeTypeName.DataMatrix:

        var rows = Math.ceil(Math.sqrt(Math.max(this.data.length, this.maxLength)));
        rows = Math.ceil(rows / 2) * 2;
        var rowHeight = Math.ceil(position.height / rows);

        zpl += '^BXN,' + rowHeight + ',200,' + rows + ',' + rows, ',6,~';
        break;

      case BarcodeTypeName.PostNet:
        zpl += '^BZN,' + position.height + ',Y,N';
        break;
    }

    zpl += '^FD' + this.data;
    zpl += '^FS\n';

    return zpl;
  }

  generateBinaryImage(binaryBase, offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits) {
    var position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);

    var barcodeData = LabelTools.BarcodeRenderer.render(position.width, position.height, this.type, this.data);

    for (var y = 0; y < position.height; y++) {
      for (var x = 0; x < position.width; x++) {
        var yIndex = y + position.top;
        var xIndex = x + position.left;

        binaryBase[yIndex][xIndex] = barcodeData[y][x];
      }
    }
  }
}

var ZPLImageTools = {
  generateHexAscii: function(width, height, imageData) {
    var index = 0;
    var bitIndex = 0;
    var output = '';

    var currentValue = 0;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {

        var value = imageData[index];
        currentValue += (value << (7 - bitIndex));

        if (bitIndex == 7 || x == width - 1) {
          var valueString = currentValue.toString(16).toUpperCase();
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

  encodeHexAscii: function(data) {
    var mapCode = { 1: "G", 2: "H", 3: "I", 4: "J", 5: "K", 6: "L", 7: "M", 8: "N", 9: "O", 10: "P", 11: "Q", 12: "R", 13: "S", 14: "T", 15: "U", 16: "V", 17: "W", 18: "X", 19: "Y", 20: "g", 40: "h", 60: "i", 80: "j", 100: "k", 120: "l", 140: "m", 160: "n", 180: "o", 200: "p", 220: "q", 240: "r", 260: "s", 280: "t", 300: "u", 320: "v", 340: "w", 360: "x", 380: "y", 400: "z" }  

    var outputCode = '';
    var currentLine = '';
    var previousLine = '';

    var newSection = true;
    var currentChar = undefined;
    var counter = 1;

    for (var i = 0; i < data.length; i++) {
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
          var value = Math.floor(counter / 20) * 20;
          currentLine += mapCode[value];

          var counterMod = counter % 20;
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
          var value = Math.floor(counter / 20) * 20;
          currentLine += mapCode[value];

          var counterMod = counter % 20;
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

var elements = {
  Text: Text,
  Grid: Grid,
  Box: Box,
  Circle: Circle,
  Graphic: Graphic,
  Barcode: Barcode,
}