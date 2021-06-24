const BaseVisualComponent = require('./base-visual-component.js');
const BarcodeType = require('../properties/barcode-type.js');
const BarcodeTypeName = require('../enums/barcode-type-name.js');
const LabelTools = require('../helpers/label-tools.js');

module.exports = class Barcode extends BaseVisualComponent {
  constructor() {
    super();

    this.typeName = 'Barcode';

    this.data = '';
    this.dataPrepend = '';
    this.maxLength = 32;
    this.type = new BarcodeType(BarcodeTypeName.CODE_11);

    this.subset = '';

    this.notImplemented = ['typeName', 'invert']
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

    let rows = undefined;

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
        rows = Math.ceil(position.height / rowHeight);
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
        
        if(this.dataPrepend === '') {
          switch (this.subset) {
            case 'A':
              this.dataPrepend += '>9';
              break;

            case 'B':
              this.dataPrepend += '>:';
              break;

            case 'C':
              this.dataPrepend += '>;';
              break;
          }
        }
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
        var magnification = Math.min(Math.floor(position.height / 25), 10);
        zpl += '^BQ,2,' + magnification + ',Q,7';
        
        if(this.dataPrepend === '') {
          this.dataPrepend = 'QA,';
        }
        break;

      case BarcodeTypeName.DataMatrix:
        zpl += '^BXN,10,200,,,~,1';
        break;

      case BarcodeTypeName.PostNet:
        zpl += '^BZN,' + position.height + ',Y,N';
        break;
    }

    zpl += '^FD' + this.dataPrepend + this.data;
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
