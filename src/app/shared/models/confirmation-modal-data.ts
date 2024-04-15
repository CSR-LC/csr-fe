import { Type } from '@angular/core';

export type ConfirmationModalData = {
  title: string;
  body?: string;
  contentComponentData?: Record<string, unknown>;
  contentComponent?: Type<any>;
  applyButtonText?: string;
  cancelButtonText?: string;
};
