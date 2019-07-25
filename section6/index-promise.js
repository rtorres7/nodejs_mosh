console.log('before');

getUser(1)
    .then(user => getRepositories(user.gitHubUserName))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('commits', commits))
    .catch(err => console.log('error', err.message));

console.log('after');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('retrieve id & username from database... 2 seconds');
            resolve({ id: id, gitHubUserName: 'rudy' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('retrieve git repositories... 2 seconds');
            resolve(['repo1', 'repo2', 'repo3']);
            //reject(new Error('could not retrieve repos...'));
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('retrieve commits... 2 seconds');
            resolve(['commit']);
        }, 2000);
    });
}