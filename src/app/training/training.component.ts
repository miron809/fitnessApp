import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  unsubscriber = new Subject<void>();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.exerciseChanged$
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(exercise => {
        exercise ? this.ongoingTraining = true : this.ongoingTraining = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
