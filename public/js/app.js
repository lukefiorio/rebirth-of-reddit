'use strict';

function redditListener() {
  console.log(JSON.parse(this.responseText));
}

const redditReq = new XMLHttpRequest();
redditReq.addEventListener('load', redditListener);
redditReq.open('GET', 'https://www.reddit.com/r/dogs.json');
redditReq.send();
