import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DropdownFilterOption } from '@shared/models/dropdown-filter-option';

@Component({
  selector: 'lc-dropdown-filter',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule],
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownFilterComponent implements OnInit {
  @Input() label!: string;
  @Input() options: DropdownFilterOption[] = [];
  @Input() defaultValue?: string;
  @Output() selectionChange = new EventEmitter<string>();
  control!: FormControl;

  ngOnInit(): void {
    this.control = new FormControl(this.defaultValue || this.options[0].value);
  }

  onSelectionChange(event: MatSelectChange) {
    this.selectionChange.emit(event.value);
  }
}
