import { BaseComponent } from './base-component.ts';
import { GridPosition } from '../properties/grid-position.ts';
import { Size } from '../properties/size.ts';
import { Spacing } from '../properties/spacing.ts';
import { SizeType } from '../enums/size-type.ts';

export interface ComponentPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export abstract class BaseVisualComponent extends BaseComponent {
  invert: boolean = false;
  fixed: boolean = false;
  grid: GridPosition = new GridPosition();
  width: Size | number = new Size();
  height: Size | number = new Size();
  top: Size | number = new Size();
  left: Size | number = new Size();
  margin: Spacing = new Spacing();
  border?: number;

  getPosition(
    offsetLeft: number,
    offsetTop: number,
    availableWidth: number,
    availableHeight: number,
    widthUnits?: number,
    heightUnits?: number,
  ): ComponentPosition {
    let left = this.getSize(this.left, widthUnits) + this.margin.left;
    let top = this.getSize(this.top, heightUnits) + this.margin.top;

    const width = this.getSize(this.width, widthUnits) || (availableWidth - this.margin.horizontal);
    const height = this.getSize(this.height, heightUnits) || (availableHeight - this.margin.vertical);

    if (this.top instanceof Size && this.top.sizeType === SizeType.Fraction) {
      top = availableHeight * this.top.value;
    }
    if (this.left instanceof Size && this.left.sizeType === SizeType.Fraction) {
      left = availableWidth * this.left.value;
    }

    return {
      left: Math.round(left + offsetLeft),
      top: Math.round(top + offsetTop),
      width: Math.round(width),
      height: Math.round(height),
    };
  }

  getSize(prop: Size | number, unitSize?: number): number {
    return prop instanceof Size ? prop.getValue(unitSize) : prop;
  }

  calculateUnits(): { absolute: { width: number; height: number }; relative: { width: number; height: number } } {
    const units = {
      absolute: { width: 0, height: 0 },
      relative: { width: 0, height: 0 },
    };

    const elements = (this as unknown as { content?: BaseComponent[] }).content ?? [];

    for (const element of elements) {
      const el = element as unknown as BaseVisualComponent;
      if (!el.margin || el.border === undefined || !el.width || !el.height) continue;

      units.absolute.width += el.margin.horizontal + (this.border ?? 0);
      units.absolute.height += el.margin.vertical + (this.border ?? 0);

      units.absolute.width += el.border * 2;
      units.absolute.height += el.border * 2;

      if (el.width instanceof Size) {
        if (el.width.sizeType === SizeType.Absolute) units.absolute.width += el.width.value;
        else units.relative.width += el.width.value;
      } else {
        units.absolute.width += el.width;
      }

      if (el.height instanceof Size) {
        if (el.height.sizeType === SizeType.Absolute) units.absolute.height += el.height.value;
        else units.relative.height += el.height.value;
      } else {
        units.absolute.height += el.height;
      }
    }

    return units;
  }
}
