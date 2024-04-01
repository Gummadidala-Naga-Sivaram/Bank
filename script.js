'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Naga Siva Ram',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: '20580',

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-02-29T17:01:17.194Z',
    '2024-03-06T23:36:17.929Z',
    '2024-03-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'kota Chaitanya',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: '205C6',

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'kota Narshima',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: '20595',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'kotteboyina Eswar',
  movements: [430, 1000, 700, 50, 90, 100, -500, -300],
  interestRate: 1,
  pin: '205B5',

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// console.log(account1.movements);
////////////////////////////////////////////////////////
const displayMovements = function (acc, sort = false) {
  containerMovements.textContent = 0; // or we can use
  // containerMovements.innerHTML = ' ';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
    <div class="movements__date"> ${displayDate}</div>
   
          <div class="movements__value">${mov.toFixed(2)}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('beforeend', html);
  });
};
////////////////////////////////////////////////////////////////
// displayMovements(account1.movements);
// const l = [];
//////////////////////////////////////////////////////////////////////
/* adding username property to accounts array*/
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
    // acc.username = username;
    // l.push(username);
  });
  // return l;
};
createUsernames(accounts);
//////////////////////////////////////////////////////////
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} EUR`;
};
// calcDisplayBalance(account1.movements);
///////////////////////////////////////////////////////////////////
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}Euro`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}Euro`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposite => (deposite * acc.interestRate) / 100)
    .reduce((acc, val) => acc + val, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}`;
}; // calcDisplaySummary(account1.movements);
///////////////////////////////////////////////////////////////////////
const updateUI = function (acc) {
  displayMovements(acc);
  //display balance
  calcDisplayBalance(acc);
  console.log(acc);
  //display summary
  calcDisplaySummary(acc);
};
////////////////////////////////////////////////////////////////////
/* Event handlers*/
/////////////////////////////////////////////////////////////////////
let currenAccount, timer;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // prevent form form submitting.
  currenAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currenAccount);
  if (currenAccount && currenAccount.pin === inputLoginPin.value) {
    // Display UI and Welcome meassage
    labelWelcome.textContent = `Welcome Back , ${
      currenAccount.owner //.split(' ')[0]
    }`;
    document.querySelector('.app').style.opacity = 1;
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currenAccount);
    // clear filds
    inputLoginPin.value = inputLoginUsername.value = ' ';
    inputLoginPin.blur();
  }
});
///////////////////////////////////////////////////////////////////
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(acc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    currenAccount.balance >= amount &&
    receiverAcc.username !== currenAccount.username
  ) {
    currenAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Add transfer Date
    currenAccount.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date());

    // update UI
    updateUI(currenAccount);
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});
//////////////////////////////////////////////////////////////////
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currenAccount.username === inputCloseUsername.value &&
    currenAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currenAccount.username
    );
    accounts.splice(index, 1);
    inputCloseUsername.value = inputClosePin.value = ' ';
    //Hide UI
    containerApp.style.opacity = 0;
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(Number(inputLoanAmount.value));
  if (amount > 0 && currenAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movements
    setTimeout(function () {
      currenAccount.movements.push(amount);
      currenAccount.movementsDates.push(new Date());
      updateUI(currenAccount);
    }, 3000);
  }
  clearInterval(timer);
  timer = startLogOutTimer();
  inputLoanAmount.value = '';
});
/////////////////////////////////////////////
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currenAccount, !sorted);
  sorted = !sorted;
});

const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const min = `${now.getMinutes()}`.padStart(2, 0);

labelDate.textContent = `${day}/${month}/${year} , ${hour}:${min}`;

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days Ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year} `;
  }
};

const startLogOutTimer = function () {
  // set time to 5 min
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min} : ${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'log in to get started';
      containerApp.style.opacity = 0;
    }
    time = time - 1;
  };
  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
  // call time to every second
  // In each call print remainig time in ui
  // when 0 seconds , stop timer and log out
};

/////////////////////////////////////////////////

///////////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

/*const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0)); //23

console.log('siva'.at(0));*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*for (let movement of movements) {
  if (movement > 0) {
    console.log(`${movement}`);
  } else {
    console.log(`not ${movement}`);
  }
}
/* how for Each method works */
/*movements.forEach(function (movement) {
  // higher order function && callback function
  console.log('heyy hii ' + movement);
});*/

/* */
/*for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`${i} is index of ${movement}`);
  } else {
    console.log(`not ${movement}`);
  }
}

movements.forEach(function (mov, i, arrv) {
  // higher order function && callback function
  console.log(`${i + 1} and ${mov} and ${arrv}`);
});*/
/* forEach with map and sets  */

/*const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (val, key, map) {
  console.log(`${key} : ${val}`);
});*/
/*  with sets*/
/*const currenciesUnique = new Set(['a', 'a', 'b', 'c', 'c', 'd ']);
currenciesUnique.forEach(function (val, value, map) {
  console.log(`${val}: ${value}`); // sets doesnot have keys and values and indexes.
});*/

/*const calcAverageHumanAge = function (ages) {
  const humanages = ages.map(function (x) {
    return x <= 2 ? 2 * x : 16 + x * 4;
  });
  console.log(humanages);

  const adults = ages.filter(function (x) {
    return x >= 18;
  });
  console.log(adults);

  const average = ages.reduce(function (acc, val) {
    return acc + val;
  }, 0);
  console.log(average / adults.length);
};

calcAverageHumanAge([5, 2, 4, 18, 19, 1]);*/
/* chaining concept*/
/*

const total = movements
  .filter(function (y) {
    return y >= 0;
  })
  .map(function (z) {
    return z * 2;
  })
  .reduce(function (acc, val) {
    return acc + val;
  }, 0);
console.log(total);*/
/* find method */
/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawl = movements.find(mov => mov > 0);
console.log(firstWithdrawl);

console.log(accounts);

const accName = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(accName);*/

/*const arr = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(arr.flat());

const accountMovements = accounts.map(acc => acc.movements);
const allMovements = accountMovements.flat();
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance); // or we can write

const overalBalance1 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, val) => acc + val, 0);
console.log(overalBalance1); // or we can write using flat method

const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, val) => acc + val, 0);
console.log(overalBalance2); // or we can write using flat method*/
console.log(23 === 23.0); // true

console.log(0.1 + 0.2 === 0.3); //false

console.log(+' 23 ');
let num = parseFloat('3.14'); // num will be 3.14

// base 10 - 0 to 9
// base 2 - 0 to 1

// ------------------------------------------------------//
