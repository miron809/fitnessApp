import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  form: FormGroup;
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.getAllExercises();
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      exercise: new FormControl(null, [Validators.required])
    });
  }

  getAllExercises() {
    this.exercises = this.trainingService.getAllExercises();
  }

  onStartTraining({value}) {
    this.trainingService.startExercise(value.exercise);
  }
}
