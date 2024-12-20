import { Component, OnInit, inject } from '@angular/core';
import { BlockUiService } from '@shared/services/block-ui/block-ui.service';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { BlockUi } from '@shared/constants';

@UntilDestroy
@Component({
  selector: 'lc-block-ui',
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.scss'],
})
export class BlockUiComponent implements OnInit {
  private readonly blockUiService = inject(BlockUiService);

  blocked = false;

  ngOnInit(): void {
    this.blockUiService.stream.pipe(untilDestroyed(this)).subscribe((value) => {
      this.blocked = value === BlockUi.block;
    });
  }
}
