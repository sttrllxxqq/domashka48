function getMoney(userData, bankData) {
    return new Promise((resolve, reject) => {
      const viewBalance = confirm('View card balance?');
      
      if (viewBalance) {
        const currency = prompt('Enter the currency for which you want to view the balance:');
        while (!userData.hasOwnProperty(currency)) {
          currency = prompt('Invalid currency. Please enter a valid currency:');
        }
        console.log(`Balance is: ${userData[currency]} ${currency}`);
        resolve(userData);
      } else {
        const availableCurrencies = Object.keys(userData).filter(curr => bankData[curr].max > 0);
        const currency = prompt('Enter the currency for withdrawal:');
  
        while (!userData.hasOwnProperty(currency) || !availableCurrencies.includes(currency)) {
          currency = prompt('Invalid currency or currency not available. Please enter a valid currency:');
        }
  
        const maxWithdrawal = bankData[currency].max;
        const minWithdrawal = bankData[currency].min;
        const amount = parseInt(prompt(`Enter the amount to withdraw (min: ${minWithdrawal}, max: ${maxWithdrawal}):`), 10);
  
        if (amount > maxWithdrawal) {
          console.log(`The entered amount is greater than the allowed maximum. Maximum withdrawal amount: ${maxWithdrawal}`);
          reject({ userData, bankData });
        } else if (amount < minWithdrawal) {
          console.log(`The entered amount is less than the allowed minimum. Minimum withdrawal amount: ${minWithdrawal}`);
          reject({ userData, bankData });
        } else {
          userData[currency] -= amount;
          console.log(`Here are your cash: ${amount} ${currency} ${bankData[currency].img}`);
          resolve(userData);
        }
      }
    })
    .then(() => {
      console.log('Thank you, have a nice day 😊');
    })
    .catch(() => {
      console.log('Thank you, have a nice day 😊');
    });
  }


  let userData = {
    'USD': 1000,
    'EUR': 900,
    'UAH': 15000,
    'BIF': 20000,
    'AOA': 100
  };
  
  let bankData = {
    'USD': {
      max: 3000,
      min: 100,
      img: '💵'
    },
    'EUR': {
      max: 1000,
      min: 50,
      img: '💶'
    },
    'UAH': {
      max: 0,
      min: 0,
      img: '💴'
    },
    'GBP': {
      max: 10000,
      min: 100,
      img: '💷'
    }
  };
  
  getMoney(userData, bankData);