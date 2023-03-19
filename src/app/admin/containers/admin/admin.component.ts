import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { User } from '@app/auth/models';
import { ActivatedRoute } from '@angular/router';
import { AdminController } from '@app/admin/services';

@Component({
  selector: 'lc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminController],
})
export class AdminComponent implements OnInit {
  user: User | null = null;

  constructor(private route: ActivatedRoute, private controller: AdminController) {}

  ngOnInit() {
    // the information should be get from store now.
    this.user = this.route.snapshot.data['user'];
  }

  openArchiveConfirmation() {
    this.controller.openArchiveConfirmation();
  }
  openBlockConfirmation() {
    this.controller.openBlockConfirmation();
  }
  openArchiveConfirmationComponent() {
    this.controller.openArchiveEquipmentModal();
  }
  openBlockConfirmationComponent() {
    this.controller.openBlockEquipmentModal();
  }
}
