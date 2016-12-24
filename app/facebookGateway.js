var graph = require('fbgraph');
var _ = require('lodash');
var config = require('../config/config'); // load the contest variables

function setAccessToken(accessToken) {
  graph.setAccessToken(accessToken);
}

function getPostShares(postId){
  return new Promise(function(resolve, reject) {
    graph.get(postId+'/sharedposts?limit=100000', function(err, res) {
      err ? reject(err) : resolve(res);
    });
  });
}

function getPostComments(postId){
  return new Promise(function(resolve, reject) {
    graph.get(postId+'/comments?fields=from&limit=100000', function(err, res) {
      err ? reject(err) : resolve(res);
    });
  });
}

function getPostReactions(postId){
  return new Promise(function(resolve, reject) {
    graph.get(postId+'/reactions?limit=100000', function(err, res) {
      err ? reject(err) : resolve(res);
    });
  });
}

function getPostLikes(postId){
  return new Promise(function(resolve, reject) {
    graph.get(postId+'/likes?limit=100000', function(err, res) {
      err ? reject(err) : resolve(res);
    });
  });
}

function getPagePosts(pageId){
  return new Promise(function(resolve, reject) {
    graph.get(pageId+'/posts', function(err, res) {
      err ? reject(err) : resolve(res);
    });
  });
}

function getPages() {
  return new Promise(function(resolve, reject) {
    graph.get('me/accounts', function(err, res) {
      err ? reject(err) : resolve(res);
    });
  });
}

function getPageData(accessToken) {
  graph.setVersion("2.8");
  setAccessToken(accessToken);
  let postId;
  let reactionsNames;
  let commentsNames; 
  getPages()
    .then(function(pages){
      var pageId = config.facebookContest.pageId;
      var page = _.find(pages.data, {id: pageId});
      var pageToken = page.access_token;
      setAccessToken(pageToken);
      return getPagePosts(pageId);
    })
    .then(function(posts){
      postId = config.facebookContest.postId;
      return getPostReactions(postId);
    })
    .then(function(reactions){
      reactionsNames = reactions.data.map(function(reaction){
        return `${reaction.name} - http://www.facebook.com/${reaction.id}`;
      })
      return getPostComments(postId);
    })
    .then(function(comments) {
      commentsNames = comments.data.map(function(comment){
        return `${comment.from.name} - http://www.facebook.com/${comment.from.id}`;
      })
      let reactionsAndCommentsNames = _.union(reactionsNames, commentsNames);
      reactionsAndCommentsNames.forEach((name, i) => {
        console.log(`${i+1} ${name}`);
      })
      //return getPostShares(postId);
    })
    .then(function(shares){
      //to be implemented
    })
    .catch(function(err) {
      console.log('Error:'+JSON.stringify(err, null, 4));
    });
}

module.exports = {
  getPageData: getPageData,
};