import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Role, User } from '@app/auth/models';
import { RoleModal } from '@app/admin/constants/role-modal.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignRoleModalData } from '@app/admin/types/assign-role-modal-data';
import { ValidationService } from '@shared/services/validation/validation.service';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';

@UntilDestroy
@Component({
  selector: 'lc-assign-role-modal',
  templateUrl: './assign-role-modal.component.html',
  styleUrls: ['./assign-role-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignRoleModalComponent implements OnInit {
  formName = 'role_assignment_form';
  labels = RoleModal;
  roles!: Role[];
  form = this.formBuilder.group({
    user: [null, Validators.required],
    role: [null, Validators.required],
  });
  filteredOptions: Observable<User[]> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssignRoleModalData,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private dialogRef: MatDialogRef<AssignRoleModalComponent>,
  ) {}

  ngOnInit() {
    this.roles = this.data.roles;
    this.filteredOptions = this.form.get('user')?.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value && (value as User)?.name;
        return name ? this.filter(name as string) : this.data.users.slice();
      }),
      untilDestroyed(this),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? `${user.name} ${user.surname}` : '';
  }

  private filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.data.users.filter((option) => {
      return (
        option.name.toLowerCase().includes(filterValue) ||
        option.surname.toLowerCase().includes(filterValue) ||
        option.email.toLowerCase().includes(filterValue)
      );
    });
  }

  assignRole() {
    const { role: roleId, user } = this.form.value;
    this.validationService.emitSubmit(this.formName);

    if (!this.form?.valid) return;

    this.dialogRef.close({
      roleId: roleId && roleId,
      userId: user && (user as User).id,
    });
  }
}
