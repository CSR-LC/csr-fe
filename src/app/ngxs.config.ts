import { NgxsModuleOptions } from '@ngxs/store';
import { environment } from '@src/environments/environment';

export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: !environment.production,
  selectorOptions: {
    // These Selector Settings are recommended in preparation for NGXS v4
    suppressErrors: false,
    injectContainerState: false,
  },
};
