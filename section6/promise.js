const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);  // pending to resolved/fulfilled
        reject(new Error('message')); // pending to rejected
    }, 2000);
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));