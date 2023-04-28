import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { MaterialModule } from '@app/material/material.module';
import { DateRangeApi } from './services';

@NgModule({
  declarations: [DateRangeComponent],
  imports: [CommonModule, MaterialModule],
  providers: [DateRangeApi],
})
export class DateRangeModule {}
