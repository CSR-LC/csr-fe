import { Type } from '@angular/core';

export type ConfirmationModalData = {
  title: string;
  body?: string;
  contentComponentData?: Record<string, unknown>;
  contentComponent?: Type<unknown>;
  applyButtonText?: string;
  cancelButtonText?: string;
};
