const numbers = [1,2,3,4,5]
// const numbers = [17,19,21]
// const numbers = [5,5,5]

let acm= 0;
numbers.map(
    (value) => {
        if (value % 2 === 0) {
            acm = acm + 1;
        } else if (value % 2 !== 0 && value !== 5) {
            acm = acm  + 3
        } else {
            acm = acm + 5;
        }
    });

console.log(acm);