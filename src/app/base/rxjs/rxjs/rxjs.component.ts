import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  from,
  fromEvent,
  Observable,
  of,
  ReplaySubject,
  Subject
} from 'rxjs';
import { filter, map, skip, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {
  @ViewChild('source') source: ElementRef;

  public value$: Observable<number>;
  public stream$: Observable<any>;
  public list$: Observable<string[]>;
  public event$: Observable<number>;

  public subject$: Subject<number> = new Subject();
  public behaviorSubject$: BehaviorSubject<number> = new BehaviorSubject(0);
  public replaySubject$: ReplaySubject<number> = new ReplaySubject(3);
  public asyncSubject$: AsyncSubject<number> = new AsyncSubject();

  public subjectObs = 0;
  public behaviorSubjectObs = 0;
  public replaySubjectObs = 0;
  public asyncSubjectObs = 0;

  public opByTen = 0;
  public opEven = 0;
  public opCombo = 0;
  public opPlus = 0;

  constructor() {}

  ngOnInit() {
    this.constructObservables();
    // this.subscribeBefore();
    this.emitValues();
    // this.subscribeLater();
    this.operate();
  }

  private constructObservables() {
    this.value$ = of(new Date().getMilliseconds());
    this.stream$ = from([1, 'two', '***']);
    this.list$ = of(['N', 'S', 'E', 'W']);
    this.event$ = fromEvent(this.source.nativeElement, 'click');
  }

  private emitValues() {
    const interval = setInterval(() => {
      const v = Math.floor(Math.random() * 1000 + 1);
      console.warn(v);
      this.subject$.next(v);
      this.behaviorSubject$.next(v);
      this.replaySubject$.next(v);
      this.asyncSubject$.next(v);
      if (v > 900) {
        this.subject$.complete();
        this.behaviorSubject$.complete();
        this.replaySubject$.complete();
        this.asyncSubject$.complete();
        clearInterval(interval);
      }
    }, 2000);
  }

  private subscribeBefore() {
    this.makeSubscriptions();
  }

  private subscribeLater() {
    setTimeout(() => {
      this.makeSubscriptions();
    }, 5000);
  }

  private makeSubscriptions() {
    this.subject$.subscribe(v => (this.subjectObs += v));
    this.behaviorSubject$.subscribe(v => (this.behaviorSubjectObs += v));
    this.replaySubject$.subscribe(v => (this.replaySubjectObs += v));
    this.asyncSubject$.subscribe(v => (this.asyncSubjectObs += v));
  }

  private operate() {
    this.subject$
      .pipe(map(value => value * 10))
      .subscribe(v => (this.opByTen = v));
    this.subject$
      .pipe(filter(value => value % 2 === 0))
      .subscribe(v => (this.opEven = v));
    this.subject$
      .pipe(
        filter(value => value % 2 === 0),
        map(value => value * 10),
        tap(value => console.log(value))
      )
      .subscribe(v => (this.opCombo = v));
    this.subject$
      .pipe(
        filter(value => value % 2 === 0),
        map(value => value * 10),
        tap(value => console.log(value)),
        skip(2),
        takeWhile(value => value < 8000)
      )
      .subscribe(v => (this.opPlus = v));
  }
}
