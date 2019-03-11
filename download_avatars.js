var request = require('request');
var secretReq = require('./secret');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${secretReq.GITHUB_TOKEN}`
    }
  };

  
  
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  var users = JSON.parse(result);
  for (var user of users) {
    console.log(user.avatar_url);
  }

  
  // console.log("Errors:", err);
  // console.log("Result:", result);
});

