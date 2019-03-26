import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GlobalService } from '../../../../../core/global.service';
import { GetAll, Post } from '../store/root/items/items.actions';
import {
  completedOkSelector,
  messageSelector
} from '../store/root/items/items.state';
import { RootState } from '../store/root/root.state';

@Component({
  selector: 'app-items-container',
  templateUrl: './items-container.component.html',
  styles: []
})
export class ItemsContainerComponent implements OnInit {
  public itemsRedux$: Observable<any[]>;
  public item: any = { description: '' };
  private iLikeRisks = true;
  constructor(
    private store: Store<RootState>,
    private globalService: GlobalService
  ) {}

  public ngOnInit() {
    this.itemsRedux$ = this.store.select('items', 'data');
    this.store.dispatch(new GetAll());
    this.store.select(messageSelector).subscribe(this.showMessage);
    this.store
      .select(completedOkSelector)
      .pipe(
        tap(() => this.globalService.setMessage('pausa')),
        map(isOk => (isOk ? 'Job done!' : 'Working on it...'))
      )
      .subscribe(this.showMessage);
  }

  public onSaveClick() {
    this.store.dispatch(new Post(this.item));
  }

  private showMessage(message) {
    if (this.iLikeRisks) {
      this.globalService.setMessage(message);
    } else {
      console.log(message);
    }
  }
}
