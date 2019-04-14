'use strict';

function getRedditPage() {
  function redditListener() {
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

      // calcluate time since posting
      let timeStamp = Math.floor(new Date().getTime() / 1000.0);
      let secondsElapsed = timeStamp - dataCreated;
      let minutesElapsed = secondsElapsed / 60;
      let hoursElapsed = minutesElapsed / 60;
      let daysElapsed = hoursElapsed / 24;
      let monthsElapsed = daysElapsed / (365.25 / 12);
      let yearsElapsed = monthsElapsed / 12;
      let timeElapsed;

      if (yearsElapsed >= 2) {
        timeElapsed = `${Math.floor(yearsElapsed)} years ago`;
      } else if (yearsElapsed >= 1) {
        timeElapsed = `${Math.floor(yearsElapsed)} year ago`;
      } else if (monthsElapsed >= 2) {
        timeElapsed = `${Math.floor(monthsElapsed)} months ago`;
      } else if (monthsElapsed >= 1) {
        timeElapsed = `${Math.floor(monthsElapsed)} month ago`;
      } else if (daysElapsed >= 2) {
        timeElapsed = `${Math.floor(daysElapsed)} days ago`;
      } else if (daysElapsed >= 1) {
        timeElapsed = `${Math.floor(daysElapsed)} day ago`;
      } else if (hoursElapsed >= 2) {
        timeElapsed = `${Math.floor(hoursElapsed)} hours ago`;
      } else if (hoursElapsed >= 1) {
        timeElapsed = `${Math.floor(hoursElapsed)} hour ago`;
      } else if (minutesElapsed >= 2) {
        timeElapsed = `${Math.floor(minutesElapsed)} minutes ago`;
      } else if (minutesElapsed >= 1) {
        timeElapsed = `${Math.floor(minutesElapsed)} minute ago`;
      } else if (secondsElapsed >= 2) {
        timeElapsed = `${Math.floor(secondsElapsed)} seconds ago`;
      } else if (secondsElapsed >= 1) {
        timeElapsed = `${Math.floor(secondsElapsed)} second ago`;
      }

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
  redditReq.open('GET', reddit + 'pics.json');
  redditReq.send();
}

// default page loaded;
getRedditPage();
menu1.addEventListener('click', getRedditPage);
