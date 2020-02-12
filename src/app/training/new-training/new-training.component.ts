import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter();
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.getAllExercises();
  }

  getAllExercises() {
    this.exercises = this.trainingService.getAllExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
