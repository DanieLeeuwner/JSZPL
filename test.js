var jszpl = require('./src/jszpl');

var label = new jszpl.Label();
label.printDensity = new jszpl.PrintDensity(jszpl.PrintDensityName['8dpmm']);
label.width = 100;
label.height = 50;
label.padding = new jszpl.Spacing(10);

var text = new jszpl.Text();
label.content.push(text);
text.fontFamily = new jszpl.FontFamily(jszpl.FontFamilyName.D);
text.text = 'Hello World!';

console.log(label.generateZPL());