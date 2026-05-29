import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
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
  data = inject<AssignRoleModalData>(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private validationService = inject(ValidationService);
  private dialogRef = inject<MatDialogRef<AssignRoleModalComponent>>(MatDialogRef);

  formName = 'role_assignment_form';
  labels = RoleModal;
  roles: Role[] = [];
  form = this.formBuilder.group({
    user: [null, Validators.required],
    role: [null, Validators.required],
  });
  filteredUserOptions$: Observable<User[]> | undefined;

  ngOnInit() {
    this.roles = this.data.roles;
    this.filteredUserOptions$ = this.form.get('user')?.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value && (value as User)?.name;
        return name ? this.filterUsersByName(name as string) : this.data.users.slice();
      }),
      untilDestroyed(this),
    );
  }

  getUserName(user: User): string {
    return user && user.name ? `${user.name} ${user.surname}` : '';
  }

  private filterUsersByName(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.data.users.filter((user) => {
      return (
        user.name.toLowerCase().includes(filterValue) ||
        user.surname.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue)
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
