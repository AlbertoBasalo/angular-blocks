import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlocksService } from '../blocks.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-shell-container',
  templateUrl: './shell-container.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styles: []
})
export class ShellContainerComponent implements OnInit {
  public message$: Observable<string>;
  public blocks$: Observable<any[]>;
  constructor(
    private globalService: GlobalService,
    private blocksService: BlocksService
  ) {}

  public ngOnInit() {
    this.globalService.setMessage('Initializing...');
    this.blocks$ = this.blocksService.getBlocks$();
    this.message$ = this.globalService.getMessage$();
  }
}
