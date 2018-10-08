// export class PokerHand {
//   constructor(handOne){
//     console.log(handOne)
//   }

// 	compareWith(handTwo) {
// 		return Result.TIE;
// 	}

// }

// export const Result = {
// 	WIN: 1,
// 	LOSS: 2,
// 	TIE: 3
// };

// export default PokerHand;


class PokerHand {
  constructor(hand) {
    this.hand = hand;
    this.formattedHand = this.generateHand();
    this.sortedValues = this.formattedHand.map((x) => {return x.value}).sort((a, b)=>{return a-b});
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
    const scoringSystem = [this.isRoyalFlush(), this.isStraightFlush(), this.isFourOfKind(), this.isFullHouse()];
    
    for (var i = 0; i < scoringSystem.length; i++){
      if (scoringSystem[i]){
        return scoringSystem[i];

      }
    }

  };

  isFullHouse (){
    let valueOfThree;
    if(this.sortedValues[0] === this.sortedValues[2] && this.sortedValues[3] === this.sortedValues[4] || this.sortedValues[0] === this.sortedValues[1] && this.sortedValues[2] === this.sortedValues[4]){
      if (this.sortedValues[0] === this.sortedValues[2]){
        valueOfThree = this.sortedValues[0] + this.sortedValues[2];
      } else if (valueOfThree = this.sortedValues[2] === this.sortedValues[4]){
        valueOfThree = this.sortedValues[2] + this.sortedValues[4];
      }
      return {rank: 7, score: valueOfThree};
    } else return false;
  }

  isFourOfKind() {
    if (this.sortedValues.slice(0, 4)[0] === this.sortedValues.slice(0, 4)[3]){
      return {rank: 8, score: this.sortedValues.slice(0, 4).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      })};
    } else return false;
  }

  isStraightFlush() {
    const initialValue = 0;
    const differenceBetweenValues = this.sortedValues[this.sortedValues.length -1] - this.sortedValues[0];
    if(
      this.formattedHand.every((val, i, arr) => val.suit === arr[0].suit) && 
      differenceBetweenValues === 4
    ){
      return {rank: 9, score: this.formattedHand.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
    },initialValue)}
    } else{
      return false;
    }
  }

  isRoyalFlush(){
    const initialValue = 0;
    if (
      this.formattedHand.every((val, i, arr) => val.suit === arr[0].suit) && 
      this.formattedHand.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue.value;
      },initialValue) === 60
    ) {
      return {rank: 10, score: 100};
    } else {
      return false;
    }
  };

  compareWith(handTwo) {
    return Result.TIE;
  }
}

const Result = {
  WIN: 1,
  LOSS: 2,
  TIE: 3
};

const handOne = new PokerHand('AC 4S 5S 8C AH');
const handTwo = new PokerHand('4S 5S 8C AS AD');
const handThree = new PokerHand('4A 4H 4C 10S 10C');
const handFour = new PokerHand('5A 5H 5C 5S 6C');

console.log(handOne, 'divide', handTwo, 'divide', handThree, 'divide', handFour);

handOne.compareWith(handTwo);
