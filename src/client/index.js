import React from 'react';
import $ from 'jquery';
import sentiment from 'sentiment';
'use strict'


class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', tweets: [], last_calculated: 0 };
    }

    handleChange(key, event) {
        this.setState({ username:  event.currentTarget.value });
    }

    handleSearch(e) {
        e.preventDefault();
        console.log('handleSearch');
        let username = this.state.username;
        let self = this;
        $.ajax({
            url: '/v1/user/' + username + '/tweets',
            type: 'GET',
            data: {},
            success: function(data) {
                let last_calculated = data[data.length - 1].id
                let tweets = self.sentimentAnalysis(data);
                self.setState({ tweets: tweets, last_calculated: last_calculated });
                
            },
            error: function(err) {
                console.log('error', err)
                alert("This user does not exist! Try again.")
            }
        });
    }

    handleMore(e) {
        e.preventDefault();
        console.log('handleMore');
        let username = this.state.username;
        let self = this;
        $.ajax({
            url: '/v1/user/' + username + '/tweets',
            type: 'GET',
            data: { max_id: self.state.last_calculated },
            success: function(data) {
                let last_calculated = data[data.length - 1].id
                let tweets = self.state.tweets.concat(self.sentimentAnalysis(data));
                self.setState({ tweets: tweets , last_calculated: last_calculated });
                
            },
            error: function(err) {
                console.log('error', err)
                alert("This user does not exist! Try again.")
            }
        });
    }

    shouldComponentUpdate(nextState) {
        return this.state.tweets !== nextState.tweets;
    }

    sentimentAnalysis(tweets) {
        let temp_tweets = tweets;
        for (let i = 0; i < temp_tweets.length; i++) {
            temp_tweets[i] = { text: temp_tweets[i].text, sentiment: sentiment(temp_tweets[i].text) }
        }
        return temp_tweets;
    }

    render() {
        let tweets = this.state.tweets;
        let rows = [];
        let color;
        let sentAve = 0;
        tweets.forEach(function(tweet, index) {
            sentAve += tweet.sentiment.score;
            if (tweet.sentiment.score > 0) {
                color = {color: 'yellowGreen'};
            } else if (tweet.sentiment.score < 0) {
                color = {color: 'lightCoral'};
            } else {
                color = {color: 'grey'};
            }
            rows.push(
                <tr key={index} style={color}>
                    <td>{ tweet.text }</td>
                    <td>{ 'Score: ' + tweet.sentiment.score + ', Comparative: ' + 
                    (Math.round(tweet.sentiment.comparative * 1000) / 1000) }</td>
                </tr>
            );
        });
        sentAve = sentAve / tweets.length;

        return (
            <div>
                <div className="navBar">
                    <h1>Tweet Sentiments</h1>
                    <p>Does your Twitter presence make you seem pessimistic? Happy? Maybe emotionally 
                    unstable? <br/>Find out using sentiment analysis! <br/><br/>
                    We take your 200 latest tweets, filter out retweets and replies, and run them 
                    through <a href="https://github.com/thisandagain/sentiment">this open-source
                    sentiment analysis engine</a></p>
                    <form id="searchform" onSubmit={ this.handleSearch.bind(this) }>
                        <label className="bold" htmlFor="username">Username</label><br/>
                        <input type="text" name="username" id="username" value={ this.state.username } 
                            onChange={ this.handleChange.bind(this, 'username') }/>
                        <button className="button" type="submit" id="search">Search</button>
                    </form>
                    <div className="key">
                        <p><span className="bold">Score:</span> cumulative sum of 
                        <a href="http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010"> AFINN </a>
                         sentiment values<br/><span className="bold">Comparative:</span> Score / ( # of words )</p>
                    </div>
                    { this.state.tweets.length > 0 ?
                        <p>Based on their { this.state.tweets.length } latest original tweets,{'\n'}this user's 
                        average sentiment is {sentAve > 0 ? <span className="positive">positive</span> : 
                        <span className="negative">negative</span>} (Score: {Math.round(sentAve * 1000) / 1000}).
                        <br/><br/>
                        Click 'More' to view older tweets!</p>
                        : null
                    }
                </div>

                { 
                    this.state.tweets.length > 0 ?
                    (<div className="tweetTable">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Tweet</th>
                                    <th>Sentiment</th>
                                </tr>
                                { rows }
                            </tbody>
                        </table>
                        <button className="button" onClick={this.handleMore.bind(this)}> More </button>
                    </div>) : null
                }
            </div>
            
        );
    }
}

export default Landing;