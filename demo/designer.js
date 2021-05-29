"use strict";

// this is meh
// it will not be expanded
// it should rather be rewritten

class Sidebar {

  constructor(container) {
    this.container = container;
    this.startIconArea = undefined;
    this.titleArea = undefined;
    this.endIconArea = undefined;
    this.sourceStack = [];
    this.viewStack = [];

    this.container.innerHTML = '';

    this.header = HtmlHelper.generateElement('div', 'header', {}, {}, this.container);
    this.content = HtmlHelper.generateElement('div', 'container', {}, {}, this.container);

    this.startIconArea = HtmlHelper.generateElement('div', 'left', {}, {}, this.header);
    this.titleArea = HtmlHelper.generateElement('div', 'title', {}, {}, this.header);
    this.endIconArea = HtmlHelper.generateElement('div', 'right', {}, {}, this.header);
  }

  setTitle(title) {
    this.titleArea.innerHTML = title;
  }

  setStartIcons(icons) {
    icons = icons || [];
    this.startIconArea.innerHTML = '';
    for (var i_id in icons) {
      var icon = icons[i_id];
      var image = HtmlHelper.generateSvg(icon.image);
      var imageContainer = HtmlHelper.generateElement('div', '', {}, {}, this.startIconArea);
      imageContainer.addEventListener('click', icon.action);
      imageContainer.appendChild(image);
    }
  }

  setEndIcons(icons) {
    icons = icons || [];
    this.endIconArea.innerHTML = '';
    for (var i_id in icons) {
      var icon = icons[i_id];
      var image = HtmlHelper.generateSvg(icon.image);
      var imageContainer = HtmlHelper.generateElement('div', '', {}, {}, this.endIconArea);
      imageContainer.addEventListener('click', icon.action);
      imageContainer.appendChild(image);
    }
  }

  setContent(content) {
    this.content.innerHTML = '';
    this.content.appendChild(content);
  }

  pushView(source, populationFunction) {
    this.clearIcons();
    this.sourceStack.push(source);
    this.viewStack.push(populationFunction);
    populationFunction.call(source);
  }

  refreshView() {
    this.clearIcons();
    var view = this.viewStack[this.viewStack.length - 1];
    var source = this.sourceStack[this.sourceStack.length - 1];
    view.call(source);
  }

  clearIcons() {
    this.setStartIcons();
    this.setEndIcons();
  }

  popView() {
    this.sourceStack.pop();
    this.viewStack.pop();
    this.refreshView();
  }
}

class SidebarView {
  constructor(header, content, startIcons, endIcons) {
    this.header = header;
    this.content = content;
    this.startIcons = startIcons;
    this.endIcons = endIcons;
  }

  generateView() {
    var container = document.createElement('div');

    var header = document.createElement('div');
    header.className = 'header';

    var title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = this.header;

    for (var i_id in this.startIcons) {
      var icon = this.startIcons[i_id];
      var image = HtmlHelper.generateSvg(icon.image);
      var imageContainer = HtmlHelper.generateElement('div', 'left', {}, {}, header);
      imageContainer.addEventListener('click', icon.action);
      imageContainer.appendChild(image);
    }

    header.appendChild(title);

    for (var i_id in this.endIcons) {
      var icon = this.endIcons[i_id];
      var image = HtmlHelper.generateSvg(icon.image);
      var imageContainer = HtmlHelper.generateElement('div', 'right', {}, {}, header);
      imageContainer.addEventListener('click', icon.action);
      imageContainer.appendChild(image);
    }

    container.appendChild(header);
    container.appendChild(this.content);
    return container;
  }
}

class ImageButton {
  constructor(image, action) {
    this.image = image;
    this.action = action;
  }
}

var HtmlHelper = {
  generateElement : function (type, className, attributes, properties, parent) {
    var element = document.createElement(type);
    element.className = className;

    attributes = attributes || [];
    properties = properties || [];

    for (var a_id in attributes) {
      element.setAttribute(a_id, attributes[a_id]);
    }

    for (var p_id in properties) {
      element[p_id] = properties[p_id];
    }

    if (parent) {
      parent.appendChild(element);
    }

    return element;
  },

  removeClass : function (element, className) {
    if ($(element).hasClass(className)) {
      $(element).removeClass(className);
    }
  },

  addClass : function (element, className) {
    if ($(element).hasClass(className) == false) {
      $(element).addClass(className);
    }
  },

  registerVisibilityToggle : function (elements, tabClass, contentClass) {

    for (var e_id in elements) {
      var element = elements[e_id];

      element.tab.siblings = [];

      for (var s_id in elements) {
        if (s_id == e_id) continue;
        element.tab.siblings.push(elements[s_id]);
      }

      element.tab.addEventListener('click', function (e) {
        var target = e.target;

        var tab = target.tab;
        var content = target.content;
        var siblings = target.siblings;

        for (var s_id in siblings) {
          var sibling = siblings[s_id];

          HtmlHelper.removeClass(sibling.tab, tabClass);
          HtmlHelper.addClass(sibling.content, contentClass);
        }

        HtmlHelper.addClass(tab, tabClass);
        HtmlHelper.removeClass(content, contentClass);
      });
    }
  },

  registerResize : function (dragger, container, orientation, side, minSize, maxSize) {
    dragger.container = container;
    dragger.orientation = orientation,
    dragger.side = side;
    dragger.minSize = minSize;
    dragger.maxSize = maxSize;

    dragger.addEventListener('mousedown', function (e) {
      var dragger = e.target;

      var pos = { x: e.pageX, y: e.pageY };

      var boundingRectangle = dragger.container.getBoundingClientRect();

      var originalWidth = boundingRectangle.width - 1;
      var originalHeight = boundingRectangle.height - 1;

      globalMove = function (el) {

        var dx = el.pageX - pos.x;
        var dy = el.pageY - pos.y;

        if (dragger.orientation == 'horizontal') {
          if (side == 'right') dx *= -1;

          var newValue = originalWidth + dx;

          if (newValue < dragger.minSize) newValue = dragger.minSize;
          if (newValue > dragger.maxSize) newValue = dragger.maxSize;

          dragger.container.style.width = Math.floor(newValue) + 'px';
        }
      }
    });
  },

  getElementProperties : function(element) {
    var properties = {};

    for (var p_id in element) {
      if (element[p_id] === undefined) continue;
      properties[p_id] = {
        name: p_id,
        type: element[p_id].typeName || element[p_id].constructor.name
      };
    }

    return properties;
  },

  generateSvg(path) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    if (path) {
      svg.innerHTML = path;
    }
    return svg;
  },

  getFunctionArgunemts : function(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null) {
      result = [];
    }
    return result;
  },

  parseValue : function(type, current, value) {
    var lowerCase = value.toLowerCase();
    var upperCase = value.toUpperCase();
    var spaceless = lowerCase.replace(' ', '');
    switch (type) {
      case DataType.Boolean:
        if (spaceless == 'true') return true;
        if (spaceless == '1') return true;
        if (spaceless == 'yes') return true;
        if (spaceless == 'false') return false;
        if (spaceless == '0') return false;
        if (spaceless == 'no') return false;
        return current;

      case DataType.Number:
        var parse = Number(spaceless);
        if (parse !== 'NaN') {
          return parse;
        }
        return current;

      case DataType.String:
        return value;
        break;

      case DataType.FontFamily:
        var fontValue = upperCase[0];
        if (FontFamilyName[fontValue] != undefined) {
          return new FontFamily(fontValue);
        }
        return current;

      case DataType.Size:
        var sizeType = SizeType.Absolute;

        if (spaceless.endsWith('*')) {
          spaceless = spaceless.substring(0, spaceless.length - 1);
          sizeType = SizeType.Relative;
        }

        var parse = Number(spaceless);

        if (parse != 'NaN') {
          if (sizeType != SizeType.Relative) {
            if (parse != 0 && Math.trunc(parse) == 0) {
              sizeType = SizeType.Fraction;
            }
          }
          return new Size(parse, sizeType);
        }

        return current;

      case DataType.Alignment:
        if (lowerCase.length > 1) {
          var initialCapital = lowerCase;
          initialCapital = initialCapital[0].toUpperCase() + initialCapital.substring(1);
          if (AlignmentValue[initialCapital] != undefined) {
            return new Alignment(initialCapital);
          }
        }
        return current;

      case DataType.PrintDensity:
        var printDensity = spaceless;
        if (printDensity.endsWith('dpmm') == false) {
          printDensity = printDensity + 'dpmm';
        }
        if (PrintDensityName[printDensity] != undefined) {
          return new PrintDensity(PrintDensityName[printDensity]);
        }
        return current;

      case DataType.Spacing:
        var parts = spaceless.split(',');
        try {
          for (var p_id in parts) {
            parts[p_id] = Number(parts[p_id]);
          }
          parts.unshift(parts.length)
          var parseValue = new (Function.prototype.bind.apply(Spacing, parts));
          return parseValue;
        } catch (e) {
          return current;
        }

      case DataType.GridPosition:
        var parts = spaceless.split(',');
        try {
          for (var p_id in parts) {
            parts[p_id] = Number(parts[p_id]);
          }
          parts.unshift(parts.length)
          var parseValue = new (Function.prototype.bind.apply(GridPosition, parts));
          return parseValue;
        } catch (e) {
          return current;
        }

      case DataType.BarcodeType:
        if (lowerCase.length > 1) {
          var initialCapital = lowerCase;

          var propertyNames = Object.getOwnPropertyNames(BarcodeTypeName);
          var lowercaseNames = [];
          for (var p_id in propertyNames) {
            lowercaseNames.push(propertyNames[p_id].toLowerCase());
          }

          var index = lowercaseNames.indexOf(spaceless);

          if (index != -1) {
            return new BarcodeType(BarcodeTypeName[propertyNames[index]]);
          }
        }
        return current;
    }

    return current;
  },

  splitByUppercase : function(value) {
    var output = '';

    for (var i = 0; i < value.length; i++) {
      if (i == 0) {
        output += value[i].toUpperCase();
        continue;
      }
      if (value[i] < 'a') {
        output += ' ';
      }
      output += value[i];
    }

    return output;
  }
}

var DataType = {
  Boolean: 'Boolean',
  Number : 'Number',
  String : 'String',
  FontFamily : 'FontFamily',
  Size : 'Size',
  GridPosition : 'GridPosition',
  PrintDensity : 'PrintDensity',
  Array : 'Array',
  Alignment : 'Alignment',
  Spacing : 'Spacing',
  GraphicData: 'GraphicData',
  BarcodeType: 'BarcodeType',
}

var PropertyIndex = [
  'fixed',
  'invert',
  'grid',

  'margin',
  'padding',
  'columnSpacing',
  'rowSpacing',

  'width',
  'height',
  'left',
  'top' ,

  'type',
  'diameter',
  'border',
  'text',
  'data',
  'maxLength',
  'printDensity',
]

var globalMove = undefined;

document.addEventListener('mousemove', function (e) {
  if (globalMove) globalMove(e);
});

document.addEventListener('mouseup', function (e) {
  globalMove = undefined;
});

class ZPLDesigner {

  constructor(container) {
    this.container = container;

    this.label = undefined;
    this.canvas = undefined;

    this.focus = undefined;
    this.alternateFocus = undefined;
    this.focusParent = undefined;
    this.zplDisplay = undefined;
    this.movingFocus = undefined;

    this.sidebar = {
      left: {},
      right: {}
    }

    this.minScale = 0.25;
    this.maxScale = 5;

    this.minX = -5000;
    this.minY = -5000;
    this.maxX = 5000;
    this.maxY = 5000;

    this.scale = 0.5;
    this.positionX = 0;
    this.positionY = 0;
    this.cachedPositionX = 0;
    this.cachedPositionY = 0;

    this.movingCanvas = false;

    this.initialX = 0;
    this.initialY = 0;

    this.options = {
      grid: {
        size: 10,
        snap: false,
        display: false,
      },
      crosshair: false,
    }

    this.ruler = {
      vertical: {
        ruler: undefined,
        g: undefined,
        pointer: undefined
      },
      horizontal: {
        ruler: undefined,
        g: undefined,
        pointer: undefined
      }
    };
  }

  initialize() {

    LabelTools.ImageProcessor = new SimpleImageProcessor();
    LabelTools.ImageResizer = new ImageResizer();
    LabelTools.BarcodeRenderer = new BarcodeRenderer();

    if (this.container === undefined) {
      throw new Error('ZPLDesigner container is not defined');
    }

    if (this.container.className.indexOf('zpl') == -1) {
      this.container.className += ' zpl noselect';
    }

    var thisDesigner = this;

    this.views = {};
    this.container.innerHTML = '';

    var header = HtmlHelper.generateElement('div', 'header');
    this.container.appendChild(header);

    /* Designer Elements */

    var designerTabTitle = HtmlHelper.generateElement('div', 'tab active');
    header.appendChild(designerTabTitle);
    designerTabTitle.innerHTML = 'Designer';

    var designContainer = HtmlHelper.generateElement('div', 'container bordered');
    this.container.appendChild(designContainer);

    designerTabTitle.tab = designerTabTitle;
    designerTabTitle.content = designContainer;

    /* Designer Elements - Sidebar Left */

    var sidebarLeft = HtmlHelper.generateElement('div', 'sidebar left', {}, {}, designContainer);
    var leftDrag = HtmlHelper.generateElement('div', 'drag-vertical', {}, {}, sidebarLeft);
    var sidebarLeftContent = HtmlHelper.generateElement('div', '', {}, {}, sidebarLeft);

    this.sidebar.left = new Sidebar(sidebarLeftContent);

    /* Designer Elements - Sidebar Right */

    var sideBarRight = HtmlHelper.generateElement('div', 'sidebar right');
    designContainer.appendChild(sideBarRight);

    this.sidebar.right.header = HtmlHelper.generateElement('div', 'header');
    sideBarRight.appendChild(this.sidebar.right.header);
    this.sidebar.right.header.innerHTML = 'right title';

    this.sidebar.right.content = HtmlHelper.generateElement('div', 'container');
    sideBarRight.appendChild(this.sidebar.right.content);
    this.sidebar.right.content.innerHTML = 'right content';

    var rightDrag = HtmlHelper.generateElement('div', 'drag-vertical');
    sideBarRight.appendChild(rightDrag);

    /* Designer Elements - Content */

    var designContent = HtmlHelper.generateElement('div', 'content', {}, {
      'style': 'background-color: #CCC; overflow: hidden; position: relative;'
    });
    designContainer.appendChild(designContent);

    this.canvas = HtmlHelper.generateElement('canvas', '', {
      'id': 'labelCanvas'
    }, {
      'style': 'border-radius: 5px; position: absolute; z-index: 10;'
    });
    designContent.appendChild(this.canvas);

    HtmlHelper.registerResize(leftDrag, sidebarLeft, 'horizontal', 'left', 2, 500);
    HtmlHelper.registerResize(rightDrag, sideBarRight, 'horizontal', 'right', 2, 300);

    sideBarRight.style.width = '2px';

    this.crosshair = {};
    this.crosshair.vertical = HtmlHelper.generateElement('div', 'crosshair vertical', {}, {}, designContent);
    this.crosshair.horizontal = HtmlHelper.generateElement('div', 'crosshair horizontal', {}, {}, designContent);

    this.ruler.vertical.ruler = HtmlHelper.generateSvg();
    this.ruler.vertical.ruler.style.width = '15px';
    this.ruler.vertical.ruler.style.height = 'calc(100% - 35px)';
    this.ruler.vertical.ruler.style.position = 'absolute';
    this.ruler.vertical.ruler.style.top = '15px';

    this.ruler.vertical.g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.ruler.vertical.ruler.appendChild(this.ruler.vertical.g);

    this.ruler.vertical.pointer = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.ruler.vertical.ruler.appendChild(this.ruler.vertical.pointer);
    this.ruler.vertical.pointer.style.fill = '#000';
    this.ruler.vertical.pointer.setAttribute('height', 2);
    this.ruler.vertical.pointer.setAttribute('width', 15);


    this.ruler.horizontal.ruler = HtmlHelper.generateSvg();
    this.ruler.horizontal.ruler.style.height = '15px';
    this.ruler.horizontal.ruler.style.width = 'calc(100% - 15px)';
    this.ruler.horizontal.ruler.style.position = 'absolute';
    this.ruler.horizontal.ruler.style.left = '15px';
    this.ruler.horizontal.ruler.style.top = '0';

    this.ruler.horizontal.g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.ruler.horizontal.ruler.appendChild(this.ruler.horizontal.g);

    this.ruler.horizontal.pointer = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.ruler.horizontal.ruler.appendChild(this.ruler.horizontal.pointer);
    this.ruler.horizontal.pointer.style.fill = '#000';
    this.ruler.horizontal.pointer.setAttribute('height', 15);
    this.ruler.horizontal.pointer.setAttribute('width', 2);

    this.designOverlay = HtmlHelper.generateElement('div', '', {
    }, {
      'style': 'width: 100%; height: 100%; z-index: 100; position: relative;'
    }, designContent);

    this.designOverlay.addEventListener('mousewheel', function(e) {
      e.preventDefault();
      if (thisDesigner.movingCanvas) return;
      var delta = e.wheelDelta;
      var deltaScale = 0;
      if (delta < 0) {
        deltaScale = -0.05;
      } else {
        deltaScale = 0.05;
      }
      deltaScale *= thisDesigner.scale * (Math.abs(e.wheelDelta) / 30);

      thisDesigner.scale += deltaScale;

      if (thisDesigner.scale > thisDesigner.maxScale) {
        thisDesigner.scale = thisDesigner.maxScale;
        deltaScale = 0;
      }
      if (thisDesigner.scale < thisDesigner.minScale) {
        thisDesigner.scale = thisDesigner.minScale;
        deltaScale = 0;
      }

      var canvasRectangle = thisDesigner.canvas.getBoundingClientRect();

      var dX = (e.offsetX - thisDesigner.positionX) / canvasRectangle.width;
      var dY = (e.offsetY - thisDesigner.positionY) / canvasRectangle.height;
      thisDesigner.updateCanvasPosition();

      canvasRectangle = thisDesigner.canvas.getBoundingClientRect()

      thisDesigner.positionX = e.offsetX - (dX * canvasRectangle.width);
      thisDesigner.positionY = e.offsetY - (dY * canvasRectangle.height);

      thisDesigner.updateCanvasPosition();
    });

    this.designOverlay.addEventListener('mousedown', function(e) {
      e.preventDefault();
      thisDesigner.movingCanvas = true;
      thisDesigner.initialX = e.screenX;
      thisDesigner.initialY = e.screenY;
      thisDesigner.cachedPositionX = thisDesigner.positionX;
      thisDesigner.cachedPositionY = thisDesigner.positionY;
    });

    document.addEventListener('mouseup', function(e) {
      thisDesigner.movingCanvas = false;
    });

    document.addEventListener('mousemove', function(e) {
      e.preventDefault();
      if (thisDesigner.movingCanvas) {
        thisDesigner.positionX = thisDesigner.cachedPositionX + (e.screenX - thisDesigner.initialX);
        thisDesigner.positionY = thisDesigner.cachedPositionY + (e.screenY - thisDesigner.initialY);

        if (thisDesigner.positionX < thisDesigner.minX) thisDesigner.positionX = thisDesigner.minX;
        if (thisDesigner.positionY < thisDesigner.minY) thisDesigner.positionY = thisDesigner.minY;
        if (thisDesigner.positionX > thisDesigner.maxX) thisDesigner.positionX = thisDesigner.maxX;
        if (thisDesigner.positionY > thisDesigner.maxY) thisDesigner.positionY = thisDesigner.maxY;

        thisDesigner.updateCanvasPosition();
      }

      if (e.target == thisDesigner.designOverlay) {
        var x = (e.offsetX - 15);
        var y = (e.offsetY - 15);

        thisDesigner.cursorTextX.innerHTML = 'X: ' + Math.floor(x / thisDesigner.scale);
        thisDesigner.cursorTextY.innerHTML = 'Y: ' + Math.floor(y / thisDesigner.scale);

        thisDesigner.ruler.horizontal.pointer.setAttribute('x', x - 1);
        thisDesigner.ruler.vertical.pointer.setAttribute('y', y - 1);

        if (thisDesigner.options.crosshair) {
          thisDesigner.crosshair.vertical.style.left = e.offsetX - 1 + 'px';
          thisDesigner.crosshair.horizontal.style.top = e.offsetY - 1 + 'px';
        }
      }
    });

    this.designOverlay.addEventListener('mouseout', function(e) {
      thisDesigner.crosshair.vertical.style.display = 'none';
      thisDesigner.crosshair.horizontal.style.display = 'none';
      thisDesigner.ruler.vertical.pointer.style.display = 'none';
      thisDesigner.ruler.horizontal.pointer.style.display = 'none';
    });

    this.designOverlay.addEventListener('mouseenter', function() {
      if (thisDesigner.options.crosshair) {
        thisDesigner.crosshair.vertical.style.display = 'block';
        thisDesigner.crosshair.horizontal.style.display = 'block';
      } else {
        thisDesigner.crosshair.vertical.style.display = 'none';
        thisDesigner.crosshair.horizontal.style.display = 'none';
      }

      thisDesigner.ruler.vertical.pointer.style.display = 'block';
      thisDesigner.ruler.horizontal.pointer.style.display = 'block';
    });

    var horizontalRuler = HtmlHelper.generateElement('div', 'info-bar top', {}, {}, designContent);
    var verticalRuler = HtmlHelper.generateElement('div', 'info-bar left', {}, {}, designContent);
    var bottomControls = HtmlHelper.generateElement('div', 'info-bar bottom', {}, {}, designContent);

    var boxBottomLeft = HtmlHelper.generateElement('div', 'box left', {}, {}, bottomControls);
    this.zoomText = HtmlHelper.generateElement('div', 'left clickable', {
    }, {
      'style': 'width: 50px;',
    }, bottomControls);
    this.positionTextX = HtmlHelper.generateElement('div', 'left', {
    }, {
      'style': 'width: 60px;',
    }, bottomControls);
    this.positionTextY = HtmlHelper.generateElement('div', 'left', {
    }, {
      'style': 'width: 60px;',
    }, bottomControls);

    var boxLeftTop = HtmlHelper.generateElement('div', 'box top', {}, {}, verticalRuler);
    verticalRuler.appendChild(this.ruler.vertical.ruler);

    horizontalRuler.appendChild(this.ruler.horizontal.ruler);

    this.exportView = HtmlHelper.generateElement('div', 'right icon-container clickable', {}, {}, bottomControls);
    var exportLink = HtmlHelper.generateElement('a', '', {}, {}, this.exportView);
    var exportImage = HtmlHelper.generateSvg(octicons['file'].path);
    exportLink.appendChild(exportImage);

    this.crosshairView = HtmlHelper.generateElement('div', 'right icon-container clickable', {}, {}, bottomControls);
    var crosshairImage = HtmlHelper.generateSvg(octicons['plus-small'].path);
    this.crosshairView.appendChild(crosshairImage);

    this.resetView = HtmlHelper.generateElement('div', 'right icon-container clickable', {}, {}, bottomControls);
    var resetImage = HtmlHelper.generateSvg(octicons['screen-full'].path);
    this.resetView.appendChild(resetImage);

    this.cursorTextY = HtmlHelper.generateElement('div', 'right', {
    }, {
      'style': 'width: 60px;',
    }, bottomControls);
    this.cursorTextX = HtmlHelper.generateElement('div', 'right', {
    }, {
      'style': 'width: 60px;',
    }, bottomControls);

    exportLink.addEventListener('click', function() {
      exportLink.href = thisDesigner.canvas.toDataURL();
      exportLink.download = 'zpl_label_' + (new Date()).getTime() + '.png';
    });

    this.crosshairView.addEventListener('click', function() {
      if (thisDesigner.options.crosshair) {
        thisDesigner.designOverlay.style.cursor = 'crosshair';
        thisDesigner.options.crosshair = false;
        HtmlHelper.removeClass(thisDesigner.crosshairView, 'active');
        thisDesigner.ruler.horizontal.pointer.setAttribute('width', 2);
        thisDesigner.ruler.vertical.pointer.setAttribute('height', 2);
      } else {
        thisDesigner.designOverlay.style.cursor = 'none';
        thisDesigner.options.crosshair = true;
        HtmlHelper.addClass(thisDesigner.crosshairView, 'active');
        thisDesigner.ruler.horizontal.pointer.setAttribute('width', 1);
        thisDesigner.ruler.vertical.pointer.setAttribute('height', 1);
      }
    });

    this.resetView.addEventListener('click', function() { thisDesigner.resetCanvasPosition(); });

    /* Code Elements */

    var codeTabTitle = HtmlHelper.generateElement('div', 'tab noselect');
    header.appendChild(codeTabTitle);
    codeTabTitle.innerHTML = 'Code';

    var codeContainer = HtmlHelper.generateElement('div', 'container bordered hidden', {}, {}, this.container);
    this.zplDisplay = HtmlHelper.generateElement('div', 'code allselect', {}, {}, codeContainer);

    codeTabTitle.tab = codeTabTitle;
    codeTabTitle.content = codeContainer;

    /* Event Registration */

    HtmlHelper.registerVisibilityToggle([
      {
        tab: designerTabTitle,
        content: designContainer
      },
      {
        tab: codeTabTitle,
        content: codeContainer
      }
    ], 'active', 'hidden');
  }

  initializeView() {
    this.sidebar.left.pushView(this, this.updateOptions);
  }

  update() {
    var binaryLabel = ZPLGenerator.generateBinary(this.label);
    ZPLGenerator.drawBinary(this.canvas, binaryLabel);

    var content = ZPLGenerator.generateZPL(this.label);
    this.zplDisplay.innerText = content;
  }

  printToPrinter(url) {
    var content = ZPLGenerator.generateZPL(this.label);
    ZPLGenerator.printZPL(url || 'http://192.168.1.201', 9100, content);
  }

  updateOptions() {

    this.sidebar.left.setTitle(this.focus.typeName);

    var thisDesigner = this;

    var endIcons = [];
    var startIcons = [];

    if (this.focus.typeName == 'Grid') {
      endIcons.push(new ImageButton(octicons['link'].path, function() {
        thisDesigner.sidebar.left.pushView(thisDesigner, thisDesigner.showGridDefinitions);
      }));
    }

    if (this.focus.content != undefined && this.focus.notImplemented.indexOf('content') == -1) {
      endIcons.push(new ImageButton(octicons['plus'].path, function() {
        thisDesigner.sidebar.left.pushView(thisDesigner, thisDesigner.showElements);
      }));
    }

    if (this.focus.typeName != 'Label') {
      endIcons.push(new ImageButton(octicons['trashcan'].path, function() {
        thisDesigner.deleteFocus();
        thisDesigner.sidebar.left.refreshView();
        thisDesigner.update();
      }));
    }

    startIcons.push(
      new ImageButton(octicons['three-bars'].path, function() {
        thisDesigner.sidebar.left.pushView(thisDesigner, thisDesigner.updateHierarchy);
      })
    );

    this.sidebar.left.setStartIcons(startIcons);
    this.sidebar.left.setEndIcons(endIcons);

    var optionsTable = this.generateOptionsArea(this.focus);
    this.sidebar.left.setContent(optionsTable);
  }

  generateOptionsArea(datasource, updateFunction) {
    var propertiesTable = HtmlHelper.generateElement('table', 'properties');

    var properties = HtmlHelper.getElementProperties(datasource);
    var propertyNames = Object.getOwnPropertyNames(properties).sort((a, b) => {
      return PropertyIndex.indexOf(a) - PropertyIndex.indexOf(b);
    });

    for (var p_id in propertyNames) {
      var index = propertyNames[p_id]
      var property = properties[index];

      if (property.type == DataType.Array) continue;
      if (datasource.notImplemented && datasource.notImplemented.indexOf(property.name) !== -1) continue;

      var row = HtmlHelper.generateElement('tr', '', {}, {}, propertiesTable);

      var title = HtmlHelper.generateElement('td', '', {}, {
        'innerHTML': HtmlHelper.splitByUppercase(property.name)
      }, row);

      var value = HtmlHelper.generateElement('td', '', {}, {}, row);

      var displayValue = HtmlHelper.generateElement('div', '', {
        'style': 'height: 14px'
      }, {
        'innerHTML': datasource[property.name]
      }, value);
      var editValue = {};

    console.log(property);

      switch (property.type) {
        case DataType.Boolean:
        case DataType.Number:
        case DataType.String:
        case DataType.FontFamily:
        case DataType.Size:
        case DataType.GridPosition:
        case DataType.PrintDensity:
        case DataType.Alignment:
        case DataType.Spacing:
        case DataType.BarcodeType:
          editValue = HtmlHelper.generateElement('textarea', '', {
            'rows': '1',
            'cols': '1524288',
            'style': 'display: none'
          }, {}, value);

          editValue.addEventListener('blur', function(e) {
            var editValue = e.target;
            var displayValue = e.target.displayValue;

            displayValue.style.display = 'block';
            editValue.style.display = 'none';

            editValue.update();
          });

          editValue.addEventListener('keydown', function(e) {
            var editValue = e.target;
            var property = editValue.property;
            var value = editValue.value;
            var parseValue = HtmlHelper.parseValue(property.type, editValue.data[property.name], value);

            if (e.keyCode == 13) {
              e.preventDefault();
              editValue.update();
              return;
            }

            switch (property.type) {
              case DataType.Boolean:
                if (e.keyCode == 38 || e.keyCode == 40) {
                  value = !parseValue;
                  editValue.value = value;
                  e.preventDefault();
                }
                break;
              case DataType.Number:
                if (e.keyCode == 38 || e.keyCode == 40) {
                  if (e.keyCode == 38) {
                    parseValue++;
                  } else if (e.keyCode == 40) {
                    parseValue--;
                  }
                  e.preventDefault();
                  editValue.value = parseValue;
                }
                break;
              case DataType.Size:
                if (e.keyCode == 38 || e.keyCode == 40) {
                  var addValue = 1;
                  if (parseValue.sizeType == SizeType.Fraction) {
                    addValue = 0.1;
                  }
                  if (e.keyCode == 38) {
                    parseValue.value += addValue;
                  } else if (e.keyCode == 40) {
                    parseValue -= addValue;
                  }
                  parseValue = Math.round(parseValue * 100) / 100;
                  e.preventDefault();
                  editValue.value = parseValue;
                }
                break;
              case DataType.Alignment:
                if (e.keyCode == 38 || e.keyCode == 40) {
                  var keys = Object.keys(AlignmentValue);
                  var index = keys.indexOf(value);
                  if (e.keyCode == 38) {
                    index--;
                  } else if (e.keyCode == 40) {
                    index++;
                  }
                  if (index >= keys.length) {
                    index = 0;
                  }
                  if (index < 0) {
                    index = keys.length - 1;
                  }
                  e.preventDefault();
                  editValue.value = new Alignment(keys[index]);
                }
                break;
              case DataType.FontFamily:
                if (e.keyCode == 38 || e.keyCode == 40) {
                  var keys = Object.keys(FontFamilyName);
                  var index = keys.indexOf(value);
                  if (e.keyCode == 38) {
                    index--;
                  } else if (e.keyCode == 40) {
                    index++;
                  }
                  if (index >= keys.length) {
                    index = 0;
                  }
                  if (index < 0) {
                    index = keys.length - 1;
                  }
                  e.preventDefault();
                  editValue.value = new FontFamily(keys[index]);
                }
                break;

              case DataType.BarcodeType:
                if (e.keyCode == 38 || e.keyCode == 40) {
                  var keys = Object.keys(BarcodeTypeName);
                  var index = keys.indexOf(value);
                  if (e.keyCode == 38) {
                    index--;
                  } else if (e.keyCode == 40) {
                    index++;
                  }
                  if (index >= keys.length) {
                    index = 0;
                  }
                  if (index < 0) {
                    index = keys.length - 1;
                  }
                  e.preventDefault();
                  editValue.value = new BarcodeType(keys[index]);
                }
                break;
            }
          });

          displayValue.addEventListener('click', function(e) {
            var displayValue = e.target;

            var editValue = e.target.editValue;

            var data = displayValue.data;

            editValue.value = data[displayValue.property.name];

            displayValue.style.display = 'none';
            editValue.style.display = 'block';

            editValue.focus();
            editValue.select();
          });

          editValue.update = function() {
            editValue = this;

            var property = editValue.property;
            var data = editValue.data;

            var value = editValue.value;
            var currentValue = data[property.name];

            if (value != currentValue) {
              var newValue = HtmlHelper.parseValue(property.type, currentValue, value);
              data[property.name] = newValue;
              editValue.displayValue.innerHTML = newValue;

              if (updateFunction) updateFunction(property.name, newValue);

              designer.update();
            }
          }

          break;

        case DataType.GraphicData:
          editValue = HtmlHelper.generateElement('div', 'hoverVisible', {
            'style': 'width: 100%'
          }, {}, value);

          var button = HtmlHelper.generateElement('div', 'button fixed right', {
            'style': 'width: 20px;'
          }, {
            'innerHTML': '...'
          }, editValue);

          button.editValue = editValue;

          button.addEventListener('click', function(e) {
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';

            var editValue = e.target.editValue;
            var property = editValue.property;

            input.addEventListener('change', function(e) {

              var files = e.target.files;
              if (files.length != 1) return;

              var reader = new FileReader();

              reader.addEventListener("load", function () {
                LabelTools.ImageProcessor.processImage(this.result, function(graphicData) {
                  var data = editValue.data;
                  data[property.name] = graphicData;
                  editValue.displayValue.innerHTML = graphicData;

                  if (updateFunction) updateFunction(property.name, graphicData);

                  designer.update();
                });
              });
              reader.readAsDataURL(files[0]);
            });

            input.click();
          });
          break;
      }

      displayValue.editValue = editValue;
      displayValue.property = property;
      displayValue.data = datasource;

      editValue.displayValue = displayValue;
      editValue.property = property;
      editValue.data = datasource;
    }

    return propertiesTable;
  }

  generateListHierarchy(data) {
    var item = new ListItem();
    item.text = data.typeName;
    item.data = data;
    var children = (data.content || []);
    for (var c_id in children) {
      var childItem = this.generateListHierarchy(children[c_id]);
      childItem.supportsChildren = data.content != undefined;
      childItem.supportsMovement = true;
      childItem.supportsSiblings = true;
      item.children.push(childItem);
    }
    return item;
  }

  updateHierarchy(hierarchyList, parent, element, indent) {

    var thisDesigner = this;
    this.sidebar.left.setTitle('Hierarchy');

    if (hierarchyList == undefined) {
      hierarchyList = HtmlHelper.generateElement('ul', 'hierarchyList');

      this.sidebar.left.setContent(hierarchyList);
      element = this.label;
      indent = 0;

      this.sidebar.left.setStartIcons([
        new ImageButton(octicons['triangle-left'].path, function() {
          thisDesigner.sidebar.left.popView();
        })
      ]);

      if (this.focus.typeName != 'Label') {
        this.sidebar.left.setEndIcons([
          new ImageButton(octicons['unfold'].path, function() {
            thisDesigner.sidebar.left.pushView(thisDesigner, thisDesigner.changeElementParent);
          })
        ]);
      }
    }

    var className = '';
    if (element == this.focus) {
      className = 'focus';
    }

    var item = HtmlHelper.generateElement('li', className, {}, {
      innerHTML: element.typeName
    }, hierarchyList);
    var padding = (indent * 10) + 5;
    item.style.padding = '0 0 0 ' + padding + 'px';

    item.element = element;
    item.parent = parent;
    item.hierarchyItem = true;

    item.addEventListener('click', function(e) {
      var item = e.target;

      thisDesigner.focus = item.element;

      thisDesigner.sidebar.left.popView();
      thisDesigner.update();

    });

    if (element.content) {
      for (var c_id in element.content) {
        this.updateHierarchy(hierarchyList, element, element.content[c_id], indent + 1);
      }
    }
  }

  changeElementParent(hierarchyList, element, indent) {
    var thisDesigner = this;

    if (element == undefined) {
      indent = 0;
      element = this.label;

      hierarchyList = HtmlHelper.generateElement('ul', 'hierarchyList');

      this.sidebar.left.setTitle('Select Parent');
      this.sidebar.left.setContent(hierarchyList);

      this.sidebar.left.setStartIcons([
        new ImageButton(octicons['triangle-left'].path, function() {
          thisDesigner.sidebar.left.popView();
        })
      ]);
    }

    var className = '';
    if (element == this.focus) {
      className = 'focus';
    }

    var item = HtmlHelper.generateElement('li', className, {}, {
      innerHTML: element.typeName
    }, hierarchyList);
    var padding = (indent * 10) + 5;
    item.style.padding = '0 0 0 ' + padding + 'px';

    item.element = element;

    item.addEventListener('click', function(e) {
      var focus = thisDesigner.focus;
      thisDesigner.deleteFocus();

      e.target.element.content.push(focus);
      thisDesigner.focus = focus;

      thisDesigner.sidebar.left.popView();
      thisDesigner.update();
    });

    if (element.content) {
      for (var c_id in element.content) {
        var childElement = element.content[c_id];
        if (childElement.content != undefined && childElement.notImplemented.indexOf('content') == -1) {
          this.changeElementParent(hierarchyList, childElement, indent + 1);
        }
      }
    }
  }

  showElements() {
    var thisDesigner = this;

    var elementList = HtmlHelper.generateElement('ul', 'elementList');

    this.sidebar.left.setTitle('Create Element');
    this.sidebar.left.setContent(elementList);

    this.sidebar.left.setStartIcons([
      new ImageButton(octicons['triangle-left'].path, function() {
        thisDesigner.sidebar.left.popView();
      })
    ]);

    for (var e_id in elements) {
      var element = elements[e_id];
      var item = HtmlHelper.generateElement('li', '', {}, {
        innerHTML: e_id
      }, elementList);

      item.style.padding = '0 0 0 5px';
      item.element = element;

      item.addEventListener('click', function(e) {
        var newElement = new e.target.element();
        thisDesigner.focus.content.push(newElement);
        thisDesigner.focus = newElement;
        thisDesigner.sidebar.left.popView();
      });
    }
  }

  deleteFocus(focus) {
    if (focus == undefined) {
      focus = this.label;
    }

    if (focus.content && focus.content.length > 0) {
      for (var c_id in focus.content) {
        var element = focus.content[c_id];
        if (element === this.focus) {
          focus.content.splice(c_id, 1);
          this.focus = focus;
          return true;
        } else {
          if (this.deleteFocus(element)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  showGridDefinitions() {
    var thisDesigner = this;

    var elementList = HtmlHelper.generateElement('ul', 'elementList');

    this.sidebar.left.setTitle('Definitions');
    this.sidebar.left.setContent(elementList);

    this.sidebar.left.setStartIcons([
      new ImageButton(octicons['triangle-left'].path, function() {
        thisDesigner.sidebar.left.popView();
      })
    ]);

    this.sidebar.left.setEndIcons([
      new ImageButton(octicons['plus'].path, function() {
        thisDesigner.sidebar.left.pushView(thisDesigner, thisDesigner.showGridElements);
      })
    ]);

    for (var e_id in this.focus.columns) {
      var item = HtmlHelper.generateElement('li', '', {}, {
        innerHTML: 'Column ' + e_id
      }, elementList);

      item.style.padding = '0 0 0 5px';
      item.elementId = e_id;

      item.addEventListener('click', function(e) {
        thisDesigner.alternateFocus = { size: thisDesigner.focus.columns[e.target.elementId] };
        thisDesigner.sidebar.left.pushView(thisDesigner, function() {
          thisDesigner.sidebar.left.setEndIcons([
            new ImageButton(octicons['trashcan'].path, function() {
              thisDesigner.focus.columns.splice(e_id, 1);
              if (thisDesigner.focus.columns.length == 0) {
                thisDesigner.focus.columns.push(new Size(1, SizeType.Relative));
              }
              thisDesigner.sidebar.left.popView();
              thisDesigner.update();
            })
          ]);

          thisDesigner.showPropertyOptions('Column Definition', function(property, value) {
            thisDesigner.focus.columns[e_id] = value;
          });
        });
      });
    }

    for (var e_id in this.focus.rows) {
      var item = HtmlHelper.generateElement('li', '', {}, {
        innerHTML: 'Row ' + e_id
      }, elementList);

      item.style.padding = '0 0 0 5px';
      item.elementId = e_id;

      item.addEventListener('click', function(e) {
        var e_id = e.target.elementId;
        thisDesigner.alternateFocus = { size: thisDesigner.focus.rows[e_id] };
        thisDesigner.sidebar.left.pushView(thisDesigner, function() {
          thisDesigner.sidebar.left.setEndIcons([
            new ImageButton(octicons['trashcan'].path, function() {
              thisDesigner.focus.rows.splice(e_id, 1);
              if (thisDesigner.focus.rows.length == 0) {
                thisDesigner.focus.rows.push(new Size(1, SizeType.Relative));
              }
              thisDesigner.sidebar.left.popView();
              thisDesigner.update();
            })
          ]);

          thisDesigner.showPropertyOptions('Row Definition', function(property, value) {
            thisDesigner.focus.rows[e_id] = value;
          });
        });
      });
    }
  }

  showPropertyOptions(title, updateFunction) {
    var thisDesigner = this;
    this.sidebar.left.setTitle(title);

    this.sidebar.left.setStartIcons([
      new ImageButton(octicons['triangle-left'].path, function() {
        thisDesigner.sidebar.left.popView();
      })
    ]);

    var optionsTable = thisDesigner.generateOptionsArea(thisDesigner.alternateFocus, updateFunction);
    this.sidebar.left.setContent(optionsTable);
  }

  showGridElements() {
    var thisDesigner = this;

    var elementList = HtmlHelper.generateElement('ul', 'elementList');

    this.sidebar.left.setTitle('Create Definition');
    this.sidebar.left.setContent(elementList);

    this.sidebar.left.setStartIcons([
      new ImageButton(octicons['triangle-left'].path, function() {
        thisDesigner.sidebar.left.popView();
      })
    ]);

    var GridElement = {
      Column: 'Column',
      Row: 'Row'
    };

    for (var e_id in GridElement) {
      var element = GridElement[e_id];
      var item = HtmlHelper.generateElement('li', '', {}, {
        innerHTML: element
      }, elementList);

      item.style.padding = '0 0 0 5px';
      item.element = element;

      item.addEventListener('click', function(e) {
        var newElement = new Size();
        newElement.value = 1;
        newElement.sizeType = SizeType.Relative;

        switch (e.target.element) {
          case GridElement.Column:
            thisDesigner.focus.columns.push(newElement);
            break;

          case GridElement.Row:
            thisDesigner.focus.rows.push(newElement);
            break;
        }
        thisDesigner.sidebar.left.popView();
        thisDesigner.update();
      });
    }
  }

  updateCanvasPosition() {
    var canvasRectangle = {
      width: this.canvas.width,
      height: this.canvas.height,
    }

    var designerRectangle = this.designOverlay.getBoundingClientRect();

    this.canvas.style.width = canvasRectangle.width * this.scale + 'px';
    this.canvas.style.height = canvasRectangle.height * this.scale + 'px';

    var minX = (canvasRectangle.width * this.scale * (-1));
    var minY = (canvasRectangle.height * this.scale * (-1));

    var maxX = designerRectangle.width;
    var maxY = designerRectangle.height;

    if (this.positionX < minX) this.positionX = minX;
    if (this.positionY < minY) this.positionY = minY;
    if (this.positionX > maxX) this.positionX = maxX;
    if (this.positionY > maxY) this.positionY = maxY;

    this.canvas.style.left = this.positionX + 'px';
    this.canvas.style.top = this.positionY + 'px';
    this.canvas.style.borderRadius = this.scale * 15 + 'px';

    this.zoomText.innerHTML = Math.floor(this.scale * 100) + '%';
    this.positionTextX.innerHTML = 'X: ' + Math.floor((this.positionX - 15) / this.scale);
    this.positionTextY.innerHTML = 'Y: ' + Math.floor((this.positionY - 15) / this.scale);

    this.ruler.vertical.g.setAttribute('transform', 'translate(0,' + (this.positionY - 15) + ')');
    this.ruler.horizontal.g.setAttribute('transform', 'translate(' + (this.positionX - 15) + ',0)');

    if (this.lastScale != this.scale) {
      this.lastScale = this.scale;

      var scaleMultiplier = 1;

      var scaleDivision = (1) * scaleMultiplier;
      var minorScale = scaleDivision * this.scale;

      while (minorScale < 3) {
        minorScale *= 5;
      }

      minorScale = Math.round(minorScale);

      var majorScale = minorScale * 5;
      var minorSize = 2;
      var majorSize = 10;

      this.ruler.vertical.g.innerHTML = '';

      var yInitial = (Math.floor((designerRectangle.height * -1) / majorScale) * majorScale);
      var yFinal = (designerRectangle.height * 2);

      for (var y = yInitial; y < yFinal; y++) {
        var rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectangle.style.fill = '#000';
        rectangle.setAttribute('y', y);
        rectangle.setAttribute('height', 1);
        if (y % majorScale == 0) {
          this.ruler.vertical.g.appendChild(rectangle);

          if (y % (majorScale * 2) == 0) {
            rectangle.setAttribute('width', majorSize);

            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.style.fill = '#999';
            text.innerHTML = Math.floor((y * -1 / this.scale) / minorScale) * minorScale;
            text.setAttribute('y', 10);
            text.setAttribute('x', y + 2);
            text.setAttribute('transform', 'rotate(-90)');
            text.style.fontSize = 10 + 'px';
            this.ruler.vertical.g.appendChild(text);
          } else {
            rectangle.setAttribute('width', majorSize / 2);
          }

        } else if (y % minorScale == 0) {
          rectangle.setAttribute('width', minorSize);
          this.ruler.vertical.g.appendChild(rectangle);
        }
      }

      this.ruler.horizontal.g.innerHTML = '';

      var xInitial = (Math.floor((designerRectangle.width * -1) / majorScale) * majorScale);
      var xFinal = (designerRectangle.width * 2);

      for (var x = xInitial; x < xFinal; x++) {
        var rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectangle.style.fill = '#000';
        rectangle.setAttribute('x', x);
        rectangle.setAttribute('width', 1);
        if (x % majorScale == 0) {
          this.ruler.horizontal.g.appendChild(rectangle);

          if (x % (majorScale * 2) == 0) {
            rectangle.setAttribute('height', majorSize);

            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.style.fill = '#999';
            text.innerHTML = Math.floor((x / this.scale) / minorScale) * minorScale;
            text.setAttribute('y', 10);
            text.setAttribute('x', x + 2);
            text.style.fontSize = 10 + 'px';
            this.ruler.horizontal.g.appendChild(text);
          } else {
            rectangle.setAttribute('height', majorSize / 2);
          }

        } else if (x % minorScale == 0) {
          rectangle.setAttribute('height', minorSize);
          this.ruler.horizontal.g.appendChild(rectangle);
        }
      }
    }
  }

  resetCanvasPosition() {
    var designerRectangle = this.designOverlay.getBoundingClientRect();
    var labelSize = {
      width: this.canvas.width,
      height: this.canvas.height
    };

    var designerRatio = designerRectangle.width / designerRectangle.height;
    var labelRatio = labelSize.width / labelSize.height;

    if (designerRatio <= labelRatio) {
      // fit label width
      this.scale = ((designerRectangle.width - 15) - 50) / labelSize.width;
    } else {
      // fit label height
      this.scale = ((designerRectangle.height - 30) - 50) / labelSize.height;
    }

    this.positionX = ((designerRectangle.width + 15 - (labelSize.width * this.scale)) / 2);
    this.positionY = ((designerRectangle.height - (labelSize.height * this.scale)) / 2);

    this.updateCanvasPosition();
  }
}

var ZPLGenerator = {
  generateZPL: function (element) {
    var zpl = element.generateZPL();
    return zpl;
  },

  generateBinary : function (element) {
    var binaryData = [];

    element.generateBinaryImage(binaryData);

    return binaryData;
  },

  drawBinary : function (canvas, binaryData) {
    var context = canvas.getContext('2d');

    var height = binaryData.length;
    var width = binaryData[0].length;

    canvas.width = width;
    canvas.height = height;

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var value = binaryData[y][x];
        if (value) {
          context.fillRect(x, y, 1, 1);
        }
      }
    }
  },

  printZPL : function(url, port, zpl) {
    $.ajax({
      type: "POST",
      data: zpl,
      url: url + ':' + (port || 9100),
      async: true,
      cache: false,
    });
  }
}

class SimpleImageProcessor extends ImageProcessor {
  constructor() {
    super();
  }

  processImage(data, cb) {
    var image = new Image();
    image.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      var index = 0;
      var imageBits = [];

      for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {

          var red = imageData.data[index++];
          var green = imageData.data[index++];
          var blue = imageData.data[index++];
          var opacity = imageData.data[index++];

          var value = 0;

          if (opacity != 0) {
            value = (((red + green + blue) / 3) < 180) ? 1 : 0;
          }

          imageBits.push(value);
        }
      }
      cb(new GraphicData(image.width, image.height, imageBits));
    };
    image.src = data;
  }
}
