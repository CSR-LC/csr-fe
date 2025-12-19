import { ChangeDetectionStrategy, Component, inject, OnInit, signal, SkipSelf } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '@app/admin/types';
import { map, tap } from 'rxjs/operators';
import { MyApplicationsController } from '@app/my-applications/services';
import { AppRoutes } from '@shared/constants/routes.enum';
import { filter } from 'rxjs';

@Component({
  selector: 'lc-my-application-details',
  templateUrl: './my-application-details.component.html',
  styleUrls: ['./my-application-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIcon, MatButton, DatePipe],
})
export class MyApplicationDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  @SkipSelf()
  private readonly controller = inject(MyApplicationsController);
  
  details = signal<Application | null>(null);

  ngOnInit(): void {
    // Initialize with data from resolver
    this.route.data.pipe(
      map((data) => data['myApplicationDetails'] as Application)
    ).subscribe((app) => {
      this.details.set(app);
      this.controller.setPageTitle(app?.equipments[0].name || '');
    });
  }

  editPeriod(): void {
    const application = this.details();
    if (!application) return;

    this.controller
      .editApplicationPeriod(application)
      .pipe(
        filter((result) => !!result),
        tap((updatedApplication) => {
          // Update the signal with the response from API (includes imageUrl)
          this.details.set(updatedApplication);
        })
      )
      .subscribe();
  }

  deleteApplication(): void {
    const application = this.details();
    if (!application) return;

    this.controller
      .deleteApplication(application.id)
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.router.navigate([AppRoutes.MyApplications]);
      });
  }
}
