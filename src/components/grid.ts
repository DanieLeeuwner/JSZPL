import { BaseContainerComponent, SizingResult } from './base-container-component.ts';
import { Box } from './box.ts';
import { Size } from '../properties/size.ts';
import { Spacing } from '../properties/spacing.ts';
import { SizeType } from '../enums/size-type.ts';
import { BaseComponent } from './base-component.ts';
import { BaseVisualComponent } from './base-visual-component.ts';

export class Grid extends BaseContainerComponent {
  readonly typeName = 'Grid';
  columns: (Size | number)[] = [];
  rows: (Size | number)[] = [];
  columnSpacing: number = 0;
  rowSpacing: number = 0;
  border: number = 0;

  calculateSizing(
    availableWidth: number,
    availableHeight: number,
    _widthUnits?: number,
    _heightUnits?: number,
  ): SizingResult {
    const units = this.calculateUnits();

    const spacingLeft = this.margin.left;
    const spacingTop = this.margin.top;
    const spacingHorizontal = spacingLeft + this.margin.right;
    const spacingVertical = spacingTop + this.margin.bottom;

    const width = availableWidth - spacingHorizontal;
    const height = availableHeight - spacingVertical;

    const widthUnits = (width - units.absolute.width) / (units.relative.width || 1);
    const heightUnits = (height - units.absolute.height) / (units.relative.height || 1);

    return { spacingTop, spacingLeft, width, height, widthUnits, heightUnits };
  }

  generateChildren(availableWidth: number, availableHeight: number): Box {
    const columnDefinitions = this.columns.length > 0 ? this.columns : [new Size(1, SizeType.Relative)];
    const rowDefinitions = this.rows.length > 0 ? this.rows : [new Size(1, SizeType.Relative)];

    const units = { absolute: { width: 0, height: 0 }, relative: { width: 0, height: 0 } };

    for (const cell of columnDefinitions) {
      if (typeof cell === 'object') {
        if (cell.sizeType === SizeType.Absolute) units.absolute.width += cell.value;
        else units.relative.width += cell.value;
      } else {
        units.absolute.width += cell;
      }
    }

    for (const cell of rowDefinitions) {
      if (typeof cell === 'object') {
        if (cell.sizeType === SizeType.Absolute) units.absolute.height += cell.value;
        else units.relative.height += cell.value;
      } else {
        units.absolute.height += cell;
      }
    }

    const borderSpacing = (this.border || 0) * 4;
    units.absolute.width += borderSpacing;
    units.absolute.height += borderSpacing;

    const absoluteWidth = availableWidth - borderSpacing - (this.columnSpacing * (columnDefinitions.length + 1));
    const absoluteHeight = availableHeight - borderSpacing - (this.rowSpacing * (rowDefinitions.length + 1));

    const widthUnits = (absoluteWidth - units.absolute.width) / (units.relative.width || 1);
    const heightUnits = (absoluteHeight - units.absolute.height) / (units.relative.height || 1);

    const content: Box[][] = [];
    const contentCells: Box[] = [];

    let top = this.rowSpacing;
    let unusedHeight = absoluteHeight + (this.border || 0) * 2;

    for (let y = 0; y < rowDefinitions.length; y++) {
      content[y] = [];
      let unusedWidth = absoluteWidth + (this.border || 0) * 2;
      let left = this.columnSpacing;
      let height = Math.ceil(this.getSize(rowDefinitions[y] as Size | number, heightUnits)) + (this.border || 0);

      if (y === this.rows.length - 1) {
        height = unusedHeight;
      }
      unusedHeight -= height;

      for (let x = 0; x < columnDefinitions.length; x++) {
        const cell = new Box();
        content[y].push(cell);
        contentCells.push(cell);

        let width = Math.ceil(this.getSize(columnDefinitions[x] as Size | number, widthUnits)) + (this.border || 0);
        if (x === columnDefinitions.length - 1) {
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

    for (const element of this.content) {
      const el = element as unknown as BaseVisualComponent;
      if (!el.grid) continue;
      if (el.grid.row < 0 || el.grid.row >= rowDefinitions.length) continue;
      if (el.grid.column < 0 || el.grid.column >= columnDefinitions.length) continue;
      content[el.grid.row][el.grid.column].content.push(element as BaseComponent);
    }

    const contentBox = new Box();
    contentBox.content = contentCells;
    contentBox.fixed = false;
    contentBox.width = this.width;
    contentBox.height = this.height;
    contentBox.border = this.border;
    contentBox.invert = this.invert;
    contentBox.padding = new Spacing();

    return contentBox;
  }

  generateZPL(
    offsetLeft: number,
    offsetTop: number,
    availableWidth: number,
    availableHeight: number,
    widthUnits?: number,
    heightUnits?: number,
    useLegacyPositioning?: boolean,
  ): string {
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    const contentBox = this.generateChildren(position.width, position.height);
    const sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    return contentBox.generateZPL(position.left, position.top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits, useLegacyPositioning);
  }

  generateBinaryImage(
    binaryBase: (boolean | number)[][],
    offsetLeft: number,
    offsetTop: number,
    availableWidth: number,
    availableHeight: number,
    widthUnits?: number,
    heightUnits?: number,
    useLegacyPositioning?: boolean,
  ): void {
    const position = this.getPosition(offsetLeft, offsetTop, availableWidth, availableHeight, widthUnits, heightUnits);
    const contentBox = this.generateChildren(position.width, position.height);
    const sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    contentBox.generateBinaryImage(binaryBase, position.left, position.top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits, useLegacyPositioning);
  }
}
