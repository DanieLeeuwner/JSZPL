import { BaseVisualComponent } from './base-visual-component.ts';
import { Spacing } from '../properties/spacing.ts';
import { BaseComponent } from './base-component.ts';

export interface SizingResult {
  spacingTop: number;
  spacingLeft: number;
  width: number;
  height: number;
  widthUnits: number;
  heightUnits: number;
}

export abstract class BaseContainerComponent extends BaseVisualComponent {
  padding: Spacing = new Spacing();
  content: BaseComponent[] = [];

  calculateSizing(
    availableWidth: number,
    availableHeight: number,
    _widthUnits?: number,
    _heightUnits?: number,
  ): SizingResult {
    const units = this.calculateUnits();

    const spacingLeft = this.margin.left + this.padding.left;
    const spacingTop = this.margin.top + this.padding.top;

    const spacingHorizontal = spacingLeft + this.margin.right + this.padding.right;
    const spacingVertical = spacingTop + this.margin.bottom + this.padding.right;

    const border = this.border ?? 0;

    const width = availableWidth - spacingHorizontal - border * 2;
    const height = availableHeight - spacingVertical - border * 2;

    const widthUnits = (width - units.absolute.width) / (units.relative.width || 1);
    const heightUnits = (height - units.absolute.height) / (units.relative.height || 1);

    return { spacingTop, spacingLeft, width, height, widthUnits, heightUnits };
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
    const sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);
    let zpl = '';

    for (const element of this.content) {
      const el = element as unknown as BaseVisualComponent;
      const border = this.border ?? 0;

      let left = offsetLeft + sizing.spacingLeft + border;
      let top = offsetTop + sizing.spacingTop + border;

      if (el.fixed) {
        if (useLegacyPositioning) {
          left = offsetLeft + this.getSize(el.left);
          top = offsetTop + this.getSize(el.top);
        } else {
          left = 0;
          top = 0;
        }
      }

      zpl += element.generateZPL(left, top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits, useLegacyPositioning);
    }

    return zpl;
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
    const sizing = this.calculateSizing(availableWidth, availableHeight, widthUnits, heightUnits);

    for (const element of this.content) {
      const el = element as unknown as BaseVisualComponent;
      const border = this.border ?? 0;

      let left = offsetLeft + sizing.spacingLeft + border;
      let top = offsetTop + sizing.spacingTop + border;

      if (el.fixed) {
        if (useLegacyPositioning) {
          left = offsetLeft + this.getSize(el.left);
          top = offsetTop + this.getSize(el.top);
        } else {
          left = 0;
          top = 0;
        }
      }

      element.generateBinaryImage(binaryBase, left, top, sizing.width, sizing.height, sizing.widthUnits, sizing.heightUnits, useLegacyPositioning);
    }
  }
}
