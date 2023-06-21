import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { MaterialModule } from '@app/material/material.module';

@NgModule({
  declarations: [DateRangeComponent],
  imports: [CommonModule, MaterialModule],
})
export class DateRangeModule {}
