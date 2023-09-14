import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [DateRangeComponent],
  imports: [CommonModule, SharedModule],
})
export class DateRangeModule {}
