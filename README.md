# twitter-proj
## This is a small, one-page app I made using React, Node.js, Express, and [Twit (a JavaScript library for the Twitter API)](https://github.com/ttezel/twit)

#### Installation instructions
1. Clone this repo and `cd` in.
* Make sure to ask me for the Consumer Secret if you don't have it! Any and all requests to the Twitter API must be authenticated, so I have [registered this app](https://apps.twitter.com/) through Twitter.
2. Call `npm prune && npm i` to install dependencies.
3. Call `webpack` to transpile ES6 and bundle modules.
4. Call `npm start`
5. Open your browser and go to `http://localhost:8080/#/`

#### Design commentary
I kept the functionality of the page minimal and focused on making sure my code was clean, efficient, and focused. I achieved this by making a number of decisions:
1. I created a `Twit` instance in my server to simplify the API requests; as all requests must be authenticated (the app is registered), I can't simply run AJAX calls directly from my client-side code to the endpoints. Unfortunately, this means that each Twitter API request requires two AJAX calls (one from client to server, another from server to Twitter endpoint).
2. I kept it to just one React component. The functionality is simple, and I considered splitting it up into NavBar and Table components, but I found there wasn't a great way to do so while still keeping it visually intuitive; I kept the navigation bar visually fixed even while the table scrolls, but both components would need to keep track of the same data in order to show individual results on one side and aggregate data on the other. Splitting the components into two would have required putting the same state information into two different components and re-rendering everything at the same time anyway.
3. I stuck to analyzing aggregate texts by username only; I considered trying some data analysis to figure out any sentiment trends over the course of a day (i.e. more positive content at night), but found that the data returned by the `/statuses/user_timeline` API call contained only a UTC timestamp, with no offset information that would make the timestamp any useful at all.
4. I split the page into a fixed left-hand nav and scrollable table on the right. This allowed me to render more tweets by clicking "More" at the bottom of the page, while still keeping an eye on the aggregate data in the nav (which changes each time more tweets are loaded).
5. I had the option of keeping retweets and/or replies and analyzing those as well, but decided not to because RT's are inherently other users' sentiments, and replies are not so much the user's organic thoughts but their responses to other users' tweets.
6. I color-coded each tweet by sentiment to give a clear visual image of which tweets, and what proportion of them, were positive or negative. I chose green for positive, red for negative, and grey for neutral tweets because all three colors contrast well with one another, and green is a universal color for "go" while red is more alarming.
7. I deliberately chose not to analyze hashtags along with the text of the tweet because of potential syntactic "messiness", as well as a desire to avoid massive blocks ThatLookLikeThis and appear to be one word (although they are obviously not). Also personally, I've noticed that a lot of hashtag use is deliberately ironic. 

I've also taken out most console logs for clarity's sake.
