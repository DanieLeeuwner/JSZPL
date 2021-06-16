const { Label, PrintDensity, PrintDensityName, Spacing, Text, FontFamily, FontFamilyName, Raw } = require('./src/jszpl');

const label = new Label();
label.printDensity = new PrintDensity(PrintDensityName['8dpmm']);
label.width = 100;
label.height = 50;
label.padding = new Spacing(10);

const text = new Text();
label.content.push(text);
text.fontFamily = new FontFamily(FontFamilyName.D);
text.text = 'Hello World!\nWith\nNew\nLines!';
text.top = 100;

const raw = new Raw();
raw.data = `^FO50,50^GB100,100,100^FS
^FO75,75^FR^GB100,100,100^FS
^FO93,93^GB40,40,40^FS`;
label.content.push(raw);

console.log(label.generateZPL());