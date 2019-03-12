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
   // cb(err, body);
    var users = JSON.parse(body);
    for (var user of users) {
      cb(user.avatar_url, `./avatars/${user.login}.jpeg`);
      console.log(user.login);
  }
});

}
  
  


// getRepoContributors("jquery", "jquery", function(err, result);

  
//   // console.log("Errors:", err);
//   // console.log("Result:", result);
// });


function downloadImageByURL(url, filePath) {
  var fs = require('fs');        
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Downloading');
      response.headers['jpeg']               
    })
    .on('end', function (end) {
      console.log('Nice job! Downloaded.')
    })
    .pipe(fs.createWriteStream(filePath));
}    

// console.log("Errors:", err);
// console.log("Result:", result);


getRepoContributors('jquery', 'jquery', downloadImageByURL)