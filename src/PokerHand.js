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
    this.handScore = this.calculateHandScore(this.hand);
  }

  generateHand() {
    return this.hand.split(' ').map((x) => {
      let newVal;
      switch (x.split('')[0]) {
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
          newVal = parseInt(x.split('')[0]);
          break;
      }
      return { value: newVal, suit: x.split('')[1] }
    });
  }

  calculateHandScore() {
    
    return 'score';
  };


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

console.log(handOne, 'divide', handTwo);

handOne.compareWith(handTwo);

