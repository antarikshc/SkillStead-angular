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

  /**
   * Update Question with given count
   * @param count Question Count
   */
  setQuestion(count: number) {
    const currentQuestion = this.questions[count - 1];
    console.log(currentQuestion);
    this.questionString = currentQuestion.question;
    this.optionOne = currentQuestion.options[0];
    this.optionTwo = currentQuestion.options[1];
    this.optionThree = currentQuestion.options[2];
    this.optionFour = currentQuestion.options[3];
  }

  /**
   * Click listeners for Options
   */
  answerOptionOne() {
    console.log('Clicked Option 1');
  }
  answerOptionTwo() {
    console.log('Clicked Option 2');
  }
  answerOptionThree() {
    console.log('Clicked Option 3');
  }
  answerOptionFour() {
    console.log('Clicked Option 4');
  }

}
