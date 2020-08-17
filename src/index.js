import './styles.css';

const delay = ms => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1;
      if (success) {
        resolve(ms);
      }

      const error = 'Error happen, unlucky >_<';
      reject(error);
    }, ms);
  });
  return promise;
};

const logger = time => console.log(`Resolved after ${time}ms`);

// Вызовы функции для проверки
delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms

// Перепиши функцию toggleUserState() так, чтобы она не использовала callback - функцию callback,
//     а принимала всего два параметра allUsers и userName и возвращала промис.

const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const updatedUsers = allUsers.map(user => {
        if (user.name === userName) {
          user.active ? (user.active = false) : (user.active = true);
          return user;
        } else {
          return user;
        }
      });
      resolve(updatedUsers);
    }, 0);
  });
};

const logger1 = updatedUsers => console.table(updatedUsers);

/*
 * Сейчас работает так
 */
// toggleUserState(users, 'Mango', logger1);
// toggleUserState(users, 'Lux', logger1);

/*
 * Должно работать так
 */
toggleUserState(users, 'Mango').then(logger1);
toggleUserState(users, 'Lux').then(logger1);

// Перепиши функцию makeTransaction() так, чтобы она не использовала callback - функции onSuccess и onError,
//     а принимала всего один параметр transaction и возвращала промис.

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = transaction => {
  return new Promise((resolve, reject) => {
    const delay = randomIntegerFromInterval(200, 500);
    setTimeout(() => {
      const canProcess = Math.random() > 0.3;
      if (canProcess) {
        resolve(transaction.id, delay);
      } else {
        reject(transaction.id);
      }
    }, delay);
  });
};

const logSuccess = (id, time) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

/*
 * Работает так
 */
// makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
// makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);
// makeTransaction({ id: 72, amount: 75 }, logSuccess, logError);
// makeTransaction({ id: 73, amount: 100 }, logSuccess, logError);
/*
 * Должно работать так
 */
makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);

makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);

makeTransaction({ id: 72, amount: 75 }).then(logSuccess).catch(logError);

makeTransaction({ id: 73, amount: 100 }).then(logSuccess).catch(logError);
