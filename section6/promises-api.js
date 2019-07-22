// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

// // use Error object to include error stack
// const p = Promise.reject(new Error('reason for rejection...'));
// // do not do this...
// // const p = Promise.reject('reason for rejection...');
// p.catch(error => console.log(error));

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation 1...');
        resolve(1);
    }, 2000)
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation 2...');
        resolve(2);
    }, 2000)
});

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));