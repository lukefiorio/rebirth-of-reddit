'use strict';

//const moment = require('moment');

function getRedditPage(threadName) {
  function redditListener() {
    contentArea.innerHTML = '';
    let responseDataArr = JSON.parse(this.responseText).data.children;
    let defaultImg = 'https://i.redd.it/rq36kl1xjxr01.png';

    for (let i = 0; i < responseDataArr.length; i++) {
      let dataTitle = responseDataArr[i].data.title;
      if (dataTitle.length === 0) {
        dataTitle = '[Untitled]';
      }
      let dataAuthor = 'u/' + responseDataArr[i].data.author;
      let dataCreated = responseDataArr[i].data.created;
      let dataLikes = responseDataArr[i].data.ups.toLocaleString('en-US');
      let dataText = responseDataArr[i].data.selftext;
      let dataImage = responseDataArr[i].data.url;

      let timeElapsed = moment(dataCreated * 1000).fromNow();

      // container div to hold each post;
      let post = document.createElement('div');
      post.className = 'postContainers';
      contentArea.appendChild(post);

      let postImage = document.createElement('img');
      postImage.className = 'postImages';
      postImage.src = dataImage;
      postImage.onerror = function() {
        postImage.src = defaultImg;
      };
      post.appendChild(postImage);

      let postTitle = document.createElement('div');
      postTitle.className = 'postTitles';
      postTitle.innerHTML = dataTitle;
      post.appendChild(postTitle);

      let postDetail = document.createElement('div');
      postDetail.className = 'postDetailContainers';
      post.appendChild(postDetail);

      let postAuthor = document.createElement('span');
      postAuthor.className = 'postDetails';
      postAuthor.innerHTML = dataAuthor;
      postDetail.appendChild(postAuthor);

      let postBullet1 = document.createElement('span');
      postBullet1.className = 'postDetailBullets';
      postBullet1.innerHTML = ' • ';
      postDetail.appendChild(postBullet1);

      let postCreated = document.createElement('span');
      postCreated.className = 'postDetails';
      postCreated.innerHTML = timeElapsed;
      postDetail.appendChild(postCreated);

      let postBullet2 = document.createElement('span');
      postBullet2.className = 'postDetailBullets';
      postBullet2.innerHTML = ' • ';
      postDetail.appendChild(postBullet2);

      let postLikes = document.createElement('span');
      postLikes.className = 'postDetails';
      postLikes.innerHTML = dataLikes + ' likes';
      postDetail.appendChild(postLikes);

      let postText = document.createElement('div');
      postText.className = 'postTexts';
      postText.innerHTML = dataText;
      post.appendChild(postText);
    }
  }

  const reddit = 'https://www.reddit.com/r/';
  const redditReq = new XMLHttpRequest();
  redditReq.addEventListener('load', redditListener);
  redditReq.open('GET', reddit + threadName + '.json');
  redditReq.send();
}

let menuClass = document.getElementsByClassName('menu');
// dont include the final 'RANDOM' button in this event listener
for (let i = 0; i < menuClass.length - 1; i++) {
  menuClass[i].addEventListener('click', function() {
    getRedditPage(this.dataset.thread);
  });
}

let randomPage = function() {
  let pageArr = ['data', 'hawaii', 'food', 'hockey', 'travel', 'apples', 'laundry'];
  let randomIndex = Math.floor(Math.random() * pageArr.length);
  return pageArr[randomIndex];
};

menu4.addEventListener('click', function() {
  getRedditPage(randomPage());
});

// load default page
getRedditPage('pics');
