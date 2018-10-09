export class PokerHand {
  constructor(hand) {
    this.hand = hand;
    this.formattedHand = this.generateHand();
    this.sortedValues = this.formattedHand.map((x) => { return x.value }).sort((a, b) => { return a - b });
    this.handScore = this.calculateHandScore();
  }

  generateHand() {
    return this.hand.split(' ').map((x) => {
      let newVal;
      switch (x.slice(0, -1)) {
        case 'A':
          newVal = 14;
          break;
        case 'J':
          newVal = 11;
          break;
        case 'Q':
          newVal = 12;
          break;
        case 'K':
          newVal = 13;
          break;
        default:
          newVal = parseInt(x.slice(0, -1));
          break;
      }
      return { value: newVal, suit: x[x.length - 1] }
    });
  }

  calculateHandScore() {
    const scoringSystem = [this.isRoyalFlush(), this.isStraightFlush(), this.isFourOfKind(), this.isFullHouse(), this.isFlush(), this.isStraight(), this.isThree()];

    for (let i = 0; i < scoringSystem.length; i++) {
      if (scoringSystem[i]) {
        return scoringSystem[i];
      }
    }
  };

  isThree(){
    const sortedVal = this.sortedValues;
    for (let n = 0; n < this.sortedValues.length; n++) {
      let counter = 0;
      for (let i = 0; i < this.sortedValues.length; i++){
        if (this.sortedValues[n] === this.sortedValues[i] && counter < 3){
          counter++;
        } else if (counter === 3){
          const score = sortedVal.filter((x) => {
            return x !== this.sortedValues[n];
          }).sort((a, b) => { return a - b }).reverse();
          return { rank: 4, score: [this.sortedValues[n],this.sortedValues[n],this.sortedValues[n], score[0], score[1] ] };
        }
      }
    }
    return false;


  }

  isStraight() {
    const sortedVal = this.sortedValues;
    const altSortedVal = sortedVal.map((x) => {
      if (x === 14){
        return 1;
      } else return x;
    }).sort();

    if (this.sortedValues[4] - this.sortedValues[0] === 4 && this.sortedValues[4] - this.sortedValues[1] === 3 && this.sortedValues[4] - this.sortedValues[2] === 2 && this.sortedValues[4] - this.sortedValues[3] === 1) {
      return { rank: 5, score: this.sortedValues.reverse() };
    } else if (altSortedVal[4] - altSortedVal[0] === 4 && altSortedVal[4] - altSortedVal[1] === 3 && altSortedVal[4] - altSortedVal[2] === 2 && altSortedVal[4] - altSortedVal[3] === 1) {
      return { rank: 5, score: altSortedVal.reverse() };
    } else return false;  
  }

  isFlush() {
    if (this.formattedHand.every((val, i, arr) => val.suit === arr[0].suit)) {
      return { rank: 6, score: this.sortedValues.reverse() };
    } else return false;
  }

  isFullHouse() {
    let valueOfThree;
    if (this.sortedValues[0] === this.sortedValues[2] && this.sortedValues[3] === this.sortedValues[4] || this.sortedValues[0] === this.sortedValues[1] && this.sortedValues[2] === this.sortedValues[4]) {
      if (this.sortedValues[0] === this.sortedValues[2]) {
        valueOfThree = this.sortedValues[0];
      } else if (this.sortedValues[2] === this.sortedValues[4]) {
        valueOfThree = this.sortedValues[4];
      }
      return { rank: 7, score: [valueOfThree] };
    } else return false;
  }

  isFourOfKind() {
    if (this.sortedValues[0] === this.sortedValues[3] || this.sortedValues[1] === this.sortedValues[4]) {
      return {
        rank: 8, score: [this.sortedValues[2]]
      }
    } else return false;
  }

  isStraightFlush() {
    const initialValue = 0;
    const differenceBetweenValues = this.sortedValues[this.sortedValues.length - 1] - this.sortedValues[0];
    if (
      this.formattedHand.every((val, i, arr) => val.suit === arr[0].suit) &&
      differenceBetweenValues === 4
    ) {
      return {
        rank: 9, score: [this.formattedHand.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.value;
        }, initialValue)]
      }
    } else return false;
  }

  isRoyalFlush() {
    const initialValue = 0;
    if (
      this.formattedHand.every((val, i, arr) => val.suit === arr[0].suit) &&
      this.formattedHand.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.value;
      }, initialValue) === 60
    ) {
      return { rank: 10, score: [100] };
    } else return false;
  };

  compareWith(handTwo) {
    function compareScore(x, y) {
      for (let n = 0; n < x.length; n++) {
        if (x[n] > y[n]) {
          return Result.WIN;
        } else if (x[n] < y[n]) {
          return Result.LOSS;
        }
      }
    }

    if (this.handScore === handTwo.handScore) {
      return Result.TIE;
    } else if (this.handScore.rank > handTwo.handScore.rank) {
      return Result.WIN;
    } else if (this.handScore.rank < handTwo.handScore.rank) {
      return Result.LOSS;
    } else if (this.handScore.rank === handTwo.handScore.rank) {
      return compareScore(this.handScore.score, handTwo.handScore.score);
    }
  }
}

export const Result = {
  WIN: 1,
  LOSS: 2,
  TIE: 3
};

// const handOne = new PokerHand('AC 4S 5S 8C AH');
// const handTwo = new PokerHand('4S 5S 8C AS AD');
// const handThree = new PokerHand('2D 7D 7D 7D 3D');
// const handFour = new PokerHand('2D 4H 4C 4S 5C');

// console.log(handFour);
// console.log(handFour.compareWith(handThree));

export default PokerHand;