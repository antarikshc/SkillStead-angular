import { Component, OnInit } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  // Properties
  questions: Array<Question>;
  questionCount = 1;
  questionString: string;
  // I know it's stupid, but don't have time
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;

  constructor(
    private navCtrl: NgxNavigationWithDataComponent
  ) { }

  ngOnInit() {
    this.questions = this.navCtrl.get('questions');
    this.setQuestion(this.questionCount);
  }

  setQuestion(count) {
    const currentQuestion = this.questions[count - 1];
    console.log(currentQuestion);
    this.questionString = currentQuestion.question;
    this.optionOne = currentQuestion.options[0];
    this.optionTwo = currentQuestion.options[1];
    this.optionThree = currentQuestion.options[2];
    this.optionFour = currentQuestion.options[3];
  }

}
