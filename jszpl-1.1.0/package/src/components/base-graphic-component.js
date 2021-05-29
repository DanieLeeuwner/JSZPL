const BaseContainerControl = require('./base-container-component.js');

module.exports = class BaseGraphicComponent extends BaseContainerControl {
  constructor() {
    super();

    this.border = 0;
    this.fill = false;
  }
}
