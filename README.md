# twitter-proj
## This is a small, one-page app I made using React, Node.js, Express, and Twit (a JavaScript library for the Twitter API)

#### Installation instructions
1. Clone this repo and `cd` in.
* Make sure to ask me for the Consumer Secret if you don't have it! Any and all requests to the Twitter API must be authenticated, so I have [registered this app](https://apps.twitter.com/) through Twitter.
2. Call `npm prune && npm i` to install dependencies.
3. Call `webpack` to transpile ES6 and bundle modules.
4. Call `npm start`
5. Open your browser and go to `http://localhost:8080/#/`

#### Design commentary
I kept the functionality of the page minimal and focused on making sure my code was clean, efficient, and focused. I achieved this by making a number of decisions:
1. I stuck to analyzing aggregate texts by username only; I considered trying some data analysis to figure out any sentiment trends over the course of a day (i.e. more positive content at night), but found that the data returned by the `/statuses/user_timeline` API call contained only a UTC timestamp, with no offset information that would make the timestamp any useful at all.
2. I split the page into a fixed left-hand nav and scrollable table on the right. This allowed me to render more tweets by clicking "More" at the bottom of the page, while still keeping an eye on the aggregate data in the nav (which changes each time more tweets are loaded).
3. I had the option of keeping retweets and/or replies and analyzing those as well, but decided not to because RT's are inherently other users' sentiments, and replies are not so much the user's organic thoughts but their responses to other users' tweets.
4. I color-coded each tweet by sentiment to give a clear visual image of which tweets, and what proportion of them, were positive or negative. I chose green for positive, red for negative, and grey for neutral tweets because all three colors contrast well with one another, and green is a universal color for "go" while red is more alarming.
5. I deliberately chose not to analyze hashtags along with the text of the tweet because of potential syntactic "messiness", as well as a desire to avoid massive blocks ThatLookLikeThis and appear to be one word (although they are obviously not). Also personally, I've noticed that a lot of hashtag use is deliberately ironic.