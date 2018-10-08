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
    if (this.isRoyalFlush()){
      return {rank: 10, score: null};
    } else if (this.isStraightFlush()){
      return {rank: 9, score: this.isStraightFlush()}
    } else {
      return 'high card';
    }
    
  };

  isRoyalFlush(){
    const initialValue = 0;
    return (
      this.formattedHand.every((val, i, arr) => val.suit === arr[0].suit) && 
      this.formattedHand.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue.value;
      },initialValue) === 60
    )
  };

  isStraightFlush() {
    const initialValue = 0;
    const sortedHand = this.formattedHand.map((x) => {return x.value}).sort((a, b)=>{return a-b});
    console.log(sortedHand, 'sorted');
    const differenceBetweenValues = sortedHand[sortedHand.length -1] - sortedHand[0];
    if(
      this.formattedHand.every((val, i, arr) => val.suit === arr[0].suit) && 
      differenceBetweenValues === 4
    ){
      return this.formattedHand.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.value;
    },initialValue);
    } else{
      return false;
    }
  }

  compareWith(handTwo) {
    // console.log(this.handScore, handTwo.handScore)
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
const handThree = new PokerHand('AC KC QC JC 10C');
const handFour = new PokerHand('10C 9C 8C 7C 6C');
const handFive = new PokerHand('7C 6C 5C 4C 3C');

console.log(handOne, 'divide', handTwo, 'divide', handThree, 'divide', handFour, 'divide', handFive);

handOne.compareWith(handTwo);
