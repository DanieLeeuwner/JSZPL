import { BaseContainerComponent } from './base-container-component.ts';

export abstract class BaseGraphicComponent extends BaseContainerComponent {
  border: number = 0;
  fill: boolean = false;
}
