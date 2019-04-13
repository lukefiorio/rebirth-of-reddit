'use strict';

function redditListener() {
  let responseDataArr = JSON.parse(this.responseText).data.children;
  console.log(responseDataArr[0].data.title);
  console.log(responseDataArr[0].data.selftext);
}

const redditReq = new XMLHttpRequest();
redditReq.addEventListener('load', redditListener);
redditReq.open('GET', 'https://www.reddit.com/r/pics.json');
redditReq.send();
