const { Label, PrintDensity, PrintDensityName, Spacing, Text, FontFamily, FontFamilyName } = require('./src/jszpl');

var label = new Label();
label.printDensity = new PrintDensity(PrintDensityName['8dpmm']);
label.width = 100;
label.height = 50;
label.padding = new Spacing(10);

var text = new Text();
label.content.push(text);
text.fontFamily = new FontFamily(FontFamilyName.D);
text.text = 'Hello World!\nWith\nNew\nLines!';

console.log(label.generateZPL());