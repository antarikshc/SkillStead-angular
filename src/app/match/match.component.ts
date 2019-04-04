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
  questionCount = 0;
  questionString: string;
  // I know it's stupid, but don't have time
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  playerNumber: number;
  playerOneScore: string;
  playerTwoScore: string;

  constructor(
    private navCtrl: NgxNavigationWithDataComponent,
    private socket: SocketService
  ) {
    this.socket.nextQuestion()
      .subscribe(data => this.queueNextQuestion(data));
  }

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
    const currentQuestion = this.questions[count];
    this.questionString = currentQuestion.question;
    this.optionOne = currentQuestion.options[0];
    this.optionTwo = currentQuestion.options[1];
    this.optionThree = currentQuestion.options[2];
    this.optionFour = currentQuestion.options[3];
  }

  // Click listeners for Options
  answerOption(option: number) {

    let isCorrect = false;
    if (this.questions[this.questionCount].answer + 1 === option) {
      console.log('Correct answer brah..');
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

  queueNextQuestion(data: any) {
    console.log(data);
    this.playerOneScore = data.playerOne;
    this.playerTwoScore = data.playerTwo;
    this.questionCount += 1;
    if (this.questionCount < 10) {
      this.setQuestion(this.questionCount);
    } else {
      console.log('End of Quiz');
    }
  }
}

