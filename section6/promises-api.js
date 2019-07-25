const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));

// // use Error object to include error stack
// const p = Promise.reject(new Error('reason for rejection...'));
// // do not do this...
// // const p = Promise.reject('reason for rejection...');
// p.catch(error => console.log(error));