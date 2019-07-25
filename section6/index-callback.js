console.log('before');
getUser(1, (user) => {
    console.log('User', user);
    getRepositories(user.gitHubUserName, (repos) => {
        console.log('Repos', repos);
        getCommits(repos[0], (commits) => {
            console.log('Commits', commits);
        })
    })
});
console.log('after');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('retrieve id & username from database... 2 seconds');
        callback({ id: id, gitHubUserName: 'rudy' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('retrieve git repositories... 2 seconds');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('retrieve commits... 2 seconds');
        callback(['commits']);
    }, 2000);
}