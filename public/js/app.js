'use strict';

// container
//   image
//   title
//     author "*"
//     posted "*'
//     views
//   text

function redditListener() {
  let responseDataArr = JSON.parse(this.responseText).data.children;
  console.log(responseDataArr[0].data.title);
  console.log(responseDataArr[0].data.selftext);
  console.log(responseDataArr[0].data.created);
  console.log(responseDataArr[0].data.num_comments);
  console.log('u/' + responseDataArr[0].data.author);
  console.log(responseDataArr[0].data.ups);

  let dataTitle = responseDataArr[0].data.title;
  let dataAuthor = 'u/' + responseDataArr[0].data.author;
  let dataCreated = responseDataArr[0].data.created;
  let dataLikes = responseDataArr[0].data.ups;
  let dataText = responseDataArr[0].data.selftext;
  //let dataCommentCnt = responseDataArr[0].data.num_comments;

  // make div to hold each post;
  let post = document.createElement('div');
  post.className = 'postContainers';
  content.appendChild(post);

  let postImage = document.createElement('img');
  postImage.className = 'postImages';
  postImage.src = 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/19/pinyon-jay-bird.jpg';
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
  postBullet1.innerHTML = '•';
  postDetail.appendChild(postBullet1);

  let postCreated = document.createElement('span');
  postCreated.className = 'postDetails';
  postCreated.innerHTML = dataCreated;
  postDetail.appendChild(postCreated);

  let postBullet2 = document.createElement('span');
  postBullet2.className = 'postDetailBullets';
  postBullet2.innerHTML = '•';
  postDetail.appendChild(postBullet2);

  let postLikes = document.createElement('span');
  postLikes.className = 'postDetails';
  postLikes.innerHTML = dataLikes;
  postDetail.appendChild(postLikes);

  let postText = document.createElement('div');
  postText.className = 'postTexts';
  postText.innerHTML = dataText;
  post.appendChild(postText);
}

const reddit = 'https://www.reddit.com/r/';
const redditReq = new XMLHttpRequest();
redditReq.addEventListener('load', redditListener);
redditReq.open('GET', reddit + 'pics.json');
redditReq.send();
