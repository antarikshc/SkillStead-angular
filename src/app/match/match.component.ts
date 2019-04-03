import { Component, OnInit } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Question } from '../models/question.model';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  // Properties
  matchId: string;
  questions: Array<Question>;
  questionCount = 1;
  questionString: string;
  // I know it's stupid, but don't have time
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  playerNumber: number;

  constructor(
    private navCtrl: NgxNavigationWithDataComponent,
    private socket: SocketService
  ) { }

  ngOnInit() {
    this.matchId = this.navCtrl.get('matchId');
    this.questions = this.navCtrl.get('questions');
    this.playerNumber = this.navCtrl.get('playerNumber');
    this.setQuestion(this.questionCount);
  }

  /**
   * Update Question with given count
   * @param count Question Count
   */
  setQuestion(count: number) {
    const currentQuestion = this.questions[count - 1];
    this.questionString = currentQuestion.question;
    this.optionOne = currentQuestion.options[0];
    this.optionTwo = currentQuestion.options[1];
    this.optionThree = currentQuestion.options[2];
    this.optionFour = currentQuestion.options[3];
  }

  // Click listeners for Options
  answerOption(option: number) {
    console.log(`Clicked Option ${option}`);

    let isCorrect = false;
    if (this.questions[this.questionCount].answer === option) {
      isCorrect = true;
    }

    this.socket.sendResponse({
      match: {
        id: this.matchId,
        count: this.questionCount,
        player: this.playerNumber
      },
      response: {
        answer: option,
        time: 0,
        isCorrect
      }
    });
  }
}

