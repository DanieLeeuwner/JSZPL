const { Label, PrintDensity, PrintDensityName, Spacing } = require('../src/jszpl');

module.exports = {
  createLabel: () => {
    const label = new Label();
    label.printDensity = new PrintDensity(PrintDensityName['8dpmm']);
    label.width = 100;
    label.height = 50;
    label.padding = new Spacing(10);

    return label;
  }
}