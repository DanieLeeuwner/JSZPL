module.exports = class GraphicData {

  constructor(width, height, data) {
    this.typeName = 'GraphicData';

    this.data = data || [];
    this.width = width || 0;
    this.height = height || 0;
  }

  toString() {
    return this.width + ' x ' + this.height;
  }
}
