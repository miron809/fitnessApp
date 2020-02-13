import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  unsubscriber = new Subject<void>();
  form: FormGroup;
  exercises: Exercise[];

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.getAllAvailableExercises();
    this.trainingService.exercisesChanged$
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(exercises => this.exercises = exercises);
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      exercise: new FormControl(null, [Validators.required])
    });
  }

  onStartTraining({value}) {
    this.trainingService.startExercise(value.exercise);
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
