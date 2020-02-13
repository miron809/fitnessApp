import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { TrainingService } from '../training.service';
import { map } from 'rxjs/operators';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  form: FormGroup;
  exercises: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore) {
  }

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
    this.exercises = this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map( doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          };
        });
      }));
  }

  onStartTraining({value}) {
    this.trainingService.startExercise(value.exercise);
  }
}
