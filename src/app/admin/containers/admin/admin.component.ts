import { Component, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@app/auth/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  user: User | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }

}
