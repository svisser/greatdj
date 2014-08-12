 /**
  * @jsx React.DOM
  */

var React = require('react');
var request = require('superagent');

var SearchResults = require('./SearchResults');
var ResultsComponent = require('./ResultsComponent');

var API_KEY = 'AIzaSyBtZzG2fInuoAsvrLfYi9jIsLgSdoE4JTs';

var SearchComponent = React.createClass({
  getInitialState: function() {
    var initial = []; //[{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/3hHKfgxUr2-UmWLGcUdOQwn27BY\"","id":{"kind":"youtube#video","videoId":"HkMNOlYcpHg"},"snippet":{"publishedAt":"2014-06-08T23:10:03.000Z","channelId":"UCrDkAvwZum-UTjHmzDI2iIw","title":"PSY - HANGOVER feat. Snoop Dogg M/V","description":"PSY - HANGOVER feat. Snoop Dogg M/V] #PSY #HANGOVER Available on iTunes @ http://smarturl.it/PsyHangoveriT More about PSY@ ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/HkMNOlYcpHg/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/HkMNOlYcpHg/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/HkMNOlYcpHg/hqdefault.jpg"}},"channelTitle":"officialpsy","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/wf0LJQjaPs-1XeEo71y0o7XUqL8\"","id":{"kind":"youtube#video","videoId":"ASO_zypdnsQ"},"snippet":{"publishedAt":"2013-04-13T11:59:04.000Z","channelId":"UCrDkAvwZum-UTjHmzDI2iIw","title":"PSY - GENTLEMAN M/V","description":"Watch HANGOVER feat. Snoop Dogg M/V @ http://youtu.be/HkMNOlYcpHg ▷ NOW available on iTunes: http://smarturl.it/PsyGentlemaniT ▷ Official PSY Online ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/ASO_zypdnsQ/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/ASO_zypdnsQ/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/ASO_zypdnsQ/hqdefault.jpg"}},"channelTitle":"officialpsy","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/j8FMFxtV9EdEahQJS1OEARxXA28\"","id":{"kind":"youtube#video","videoId":"9bZkp7q19f0"},"snippet":{"publishedAt":"2012-07-15T07:46:32.000Z","channelId":"UCrDkAvwZum-UTjHmzDI2iIw","title":"PSY - GANGNAM STYLE (강남스타일) M/V","description":"Watch HANGOVER feat. Snoop Dogg M/V @ http://youtu.be/HkMNOlYcpHg PSY - Gangnam Style (강남스타일) ▷ Available on iTunes: ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/9bZkp7q19f0/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg"}},"channelTitle":"officialpsy","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/7JpwlFLHC7rfyhVDmFCZ-L-gsgA\"","id":{"kind":"youtube#video","videoId":"IdmsyqYDjGI"},"snippet":{"publishedAt":"2012-10-12T13:09:31.000Z","channelId":"UCunAnZRwW2a_tUnqfPb9f5w","title":"Psy [CAŁY FILM]","description":"Dawni funkcjonariusze UB po weryfikacji rozpoczynają pracę w policji. Franz, który w starym systemie robił karierę dzięki małżeństwu z córką ministra, musi s...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/IdmsyqYDjGI/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/IdmsyqYDjGI/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/IdmsyqYDjGI/hqdefault.jpg"}},"channelTitle":"TheRoman02","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/nDz3LpPeKIODC00tYgzjwP_MitE\"","id":{"kind":"youtube#video","videoId":"9wkwL-TKyqA"},"snippet":{"publishedAt":"2014-08-07T17:00:26.000Z","channelId":"UCHEf6T_gVq4tlW5i91ESiWg","title":"PSY - GANGNAM STYLE (REACT: Lyric Breakdown)","description":"SUBSCRIBE to the REACT Channel: http://goo.gl/47iJqh Watch all episodes of LYRIC BREAKDOWN: http://goo.gl/s1hBwq All REACT channel videos from this ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/9wkwL-TKyqA/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/9wkwL-TKyqA/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/9wkwL-TKyqA/hqdefault.jpg"}},"channelTitle":"React","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/efZEF45cVopdc04XX2SHmOKBwXw\"","id":{"kind":"youtube#video","videoId":"XkY82MYzI1M"},"snippet":{"publishedAt":"2014-08-07T08:41:59.000Z","channelId":"UC6ZHTAY56DsfN5DipUEMnug","title":"[2014] 현대카드 슈퍼콘서트 21 CITYBREAK 2014 - PSY 인터뷰","description":"PSY가 CITYBREAK 2014에 출연하는 이유.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/XkY82MYzI1M/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/XkY82MYzI1M/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/XkY82MYzI1M/hqdefault.jpg"}},"channelTitle":"HyundaiCardWeb","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/4XQ-qBgVsVptUKdQgaNGgrLuZgE\"","id":{"kind":"youtube#video","videoId":"A9WSiEDeu0I"},"snippet":{"publishedAt":"2013-03-18T13:56:22.000Z","channelId":"UCuCOb31U3AZ_V5bgb4YyclA","title":"PSY II Ostatnia Krew Cały Film","description":"PSY II Ostatnia Krew Cały Film PSY II Ostatnia Krew Cały Film PSY II Ostatnia Krew Cały Film PSY II Ostatnia Krew Cały Film PSY II Ostatnia Krew Cały Film PS.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/A9WSiEDeu0I/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/A9WSiEDeu0I/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/A9WSiEDeu0I/hqdefault.jpg"}},"channelTitle":"","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/_fTI3lQwZkFFwgbGmjOlCX1gkT0\"","id":{"kind":"youtube#video","videoId":"wcLNteez3c4"},"snippet":{"publishedAt":"2012-08-14T15:00:06.000Z","channelId":"UCrDkAvwZum-UTjHmzDI2iIw","title":"PSY (ft. HYUNA) 오빤 딱 내 스타일","description":"Watch HANGOVER feat. Snoop Dogg M/V @ http://youtu.be/HkMNOlYcpHg 6TH STUDIO ALBUM [PSY 6甲] ▷ NOW available on iTunes: ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/wcLNteez3c4/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/wcLNteez3c4/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/wcLNteez3c4/hqdefault.jpg"}},"channelTitle":"officialpsy","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/HrpEnWcS_OVsRDNe0RXENL5OMBI\"","id":{"kind":"youtube#video","videoId":"myI4wvaLI2w"},"snippet":{"publishedAt":"2013-05-25T12:30:01.000Z","channelId":"UCk7Y3SO84AJWMyY7ub6HtZQ","title":"PSY - GENTLEMAN + Gangnam Style @ Singapore Social Live","description":"PSY - GENTLEMAN + Gangnam Style @ Singapore Social Live 05/24/2013.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/myI4wvaLI2w/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/myI4wvaLI2w/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/myI4wvaLI2w/hqdefault.jpg"}},"channelTitle":"LeeAeRu","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/8z2_RntJdPPTUhjccAO_b4HJJ_Q\"","id":{"kind":"youtube#video","videoId":"LryZmYnjVkc"},"snippet":{"publishedAt":"2014-06-09T04:30:19.000Z","channelId":"UCa6vGFO9ty8v5KZJXQxdhaw","title":"Psy, Snoop Dogg & Jimmy Kimmel Karaoke","description":"Psy, Snoop and Jimmy surprise patrons at a karaoke bar and sing for them. SUBSCRIBE to get the latest #KIMMEL: http://bit.ly/JKLSubscribe Watch the latest Me ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/LryZmYnjVkc/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/LryZmYnjVkc/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/LryZmYnjVkc/hqdefault.jpg"}},"channelTitle":"JimmyKimmelLive","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/Ja4HAJOUxKUNoxAT8jwk7SDhZto\"","id":{"kind":"youtube#video","videoId":"UmHdefsaL6I"},"snippet":{"publishedAt":"2010-10-21T01:53:50.000Z","channelId":"UCrDkAvwZum-UTjHmzDI2iIw","title":"PSY - RIGHT NOW M/V","description":"PSY's \"RIGHT NOW\" MV from PSY's newest album [PSYFIVE]. Enjoy!! ▷ Now Available on iTunes: http://smarturl.it/psyfive ▷ PSY's Products on eBay: ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/UmHdefsaL6I/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/UmHdefsaL6I/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/UmHdefsaL6I/hqdefault.jpg"}},"channelTitle":"officialpsy","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/XuuN87YpANxThhdV32-SBoMxVuM\"","id":{"kind":"youtube#video","videoId":"CH1XGdu-hzQ"},"snippet":{"publishedAt":"2012-10-23T21:13:55.000Z","channelId":"UCL_KDAcWKxMaoQPaly-hpjg","title":"PSY- Gangnam Style (Official Music Video)","description":"Share funny stories about this video here.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/CH1XGdu-hzQ/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/CH1XGdu-hzQ/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/CH1XGdu-hzQ/hqdefault.jpg"}},"channelTitle":"DanceGangnamStyle","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/xmZWsDhhwqS09hZ9pjIm-zdjIOA\"","id":{"kind":"youtube#video","videoId":"zw78uKWAqZI"},"snippet":{"publishedAt":"2014-01-07T06:58:17.000Z","channelId":"UCrDkAvwZum-UTjHmzDI2iIw","title":"PSY - GENTLEMAN '2013 PSY CONCERT 달밤에체조 (GYMNASTICS BY THE MOONLIGHT)'","description":"PSY - GENTLEMAN '2013 PSY CONCERT 달밤에체조 (GYMNASTICS BY THE MOONLIGHT)'] Dec 20, 2013 ~ Dec 24, 2013 @ Olympic Park Gymnastics ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/zw78uKWAqZI/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/zw78uKWAqZI/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/zw78uKWAqZI/hqdefault.jpg"}},"channelTitle":"officialpsy","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/aWEfaItT3Ggxe7lXDKWxkoC4ZMs\"","id":{"kind":"youtube#video","videoId":"Rs4MeQq8Gg0"},"snippet":{"publishedAt":"2014-06-15T19:01:10.000Z","channelId":"UC0v-tlzsn0QZwJnkiaUSJVQ","title":"Teens React to PSY - Hangover feat. Snoop Dogg","description":"PSY Bonus Reactions : http://goo.gl/c8Y1wf SUBSCRIBE! New vids every Sun/Thu/Sat: http://goo.gl/aFu8C Watch all episodes of REACT http://goo.gl/4iDVa ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/Rs4MeQq8Gg0/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/Rs4MeQq8Gg0/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/Rs4MeQq8Gg0/hqdefault.jpg"}},"channelTitle":"TheFineBros","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/jPu8jvcDVkace10CrtfCKktyk5E\"","id":{"kind":"youtube#video","videoId":"QZmkU5Pg1sw"},"snippet":{"publishedAt":"2012-09-11T03:33:08.000Z","channelId":"UCp0hYYBW6IMayGgR-WeoCvQ","title":"Surprise! Britney Learns 'Gangnam Style' from Psy!","description":"Korean pop star and YouTube sensation Psy gave Britney Spears a surprise visit on the show, and taught her his famous horse dance!","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/QZmkU5Pg1sw/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/QZmkU5Pg1sw/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/QZmkU5Pg1sw/hqdefault.jpg"}},"channelTitle":"TheEllenShow","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/9_HelFVbLRsLlQT0xRTufnzuzoA\"","id":{"kind":"youtube#video","videoId":"QTOGVmpE3X4"},"snippet":{"publishedAt":"2013-06-29T16:50:03.000Z","channelId":"UCHIWw2MFSHiG2R08-Q1xXBQ","title":"Psy (1992) (Cały Film - Full HD)","description":"Psy (1992) Reżyseria: Władysław Pasikowski Scenariusz: Władysław Pasikowski Główne role: Bogusław Linda, Marek Kondrat, Janusz Gajos, Cezary Pazura, ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/QTOGVmpE3X4/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/QTOGVmpE3X4/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/QTOGVmpE3X4/hqdefault.jpg"}},"channelTitle":"PrawidzwePsy","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/JFZ6uk59b1plLVKpvjESo_YRMVk\"","id":{"kind":"youtube#video","videoId":"rX372ZwXOEM"},"snippet":{"publishedAt":"2012-08-30T02:18:52.000Z","channelId":"UCrDkAvwZum-UTjHmzDI2iIw","title":"PSY - GANGNAM STYLE @ Summer Stand Live Concert","description":"6TH STUDIO ALBUM [PSY 6甲] ▷ NOW available on iTunes: http://smarturl.it/psy6gap1 ▷ Official PSY Online Store US & International ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/rX372ZwXOEM/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/rX372ZwXOEM/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/rX372ZwXOEM/hqdefault.jpg"}},"channelTitle":"officialpsy","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/IpYXD65xUlr9l0UtdoAmBZBH20I\"","id":{"kind":"youtube#video","videoId":"_3_WgAMXAv4"},"snippet":{"publishedAt":"2013-02-06T13:38:37.000Z","channelId":"UC7FBVDOnNtRVSf_ju_mk7eQ","title":"ZOMBIE PSY","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/_3_WgAMXAv4/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/_3_WgAMXAv4/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/_3_WgAMXAv4/hqdefault.jpg"}},"channelTitle":"fabianoribeiro1","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/Zuve0L8daKSOJVtze8qa_5a2hBs\"","id":{"kind":"youtube#video","videoId":"eOnfDb8RxXU"},"snippet":{"publishedAt":"2013-04-15T07:07:08.000Z","channelId":"UCmJyp7qrztjH8GVCJxoM8xQ","title":"Deadpool vs Gentleman - A PSY Parody","description":"Deadpool shows everyone that he's a total Gentleman. D-Piddy as Deadpool https://www.facebook.com/deadpool.vs https://twitter.com/_dpiddy Sam Park as ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/eOnfDb8RxXU/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/eOnfDb8RxXU/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/eOnfDb8RxXU/hqdefault.jpg"}},"channelTitle":"MercWithTheMoves","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"gMjDJfS6nsym0T-NKCXALC_u_rM/qc5skmIDriYZjqVlN29Xz9iCKHU\"","id":{"kind":"youtube#video","videoId":"hLffvZvIMew"},"snippet":{"publishedAt":"2013-06-11T17:53:37.000Z","channelId":"UCRBE0K9Ns2w1EnXUX0r0p9w","title":"PSY GENTLEMAN & Gangnam style in Moscow HD","description":"PSY GENTLEMAN & Gangnam style in Moscow HD.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/hLffvZvIMew/default.jpg"},"medium":{"url":"https://i.ytimg.com/vi/hLffvZvIMew/mqdefault.jpg"},"high":{"url":"https://i.ytimg.com/vi/hLffvZvIMew/hqdefault.jpg"}},"channelTitle":"","liveBroadcastContent":"none"}}]
    return {videos: initial};
  },

  videoEnqueued: function(id, title, type){
    var evt = new CustomEvent('enqueue',
      {'detail': {
        'type': type,
        'title': title,
        'videoId': id,
      }
    });
    window.dispatchEvent(evt);
  },

  playNowHandler: function(id, title, type){
    var evt = new CustomEvent('playNow',
      {'detail': {
        'type': type,
        'title': title,
        'videoId': id,
      }
    });
    window.dispatchEvent(evt);
  },

  handleSubmit: function(e){
    e.preventDefault();

    var q = this.refs.query.getDOMNode().value.trim(),
        that = this;

    var videoDef = this.refs.hd.getDOMNode().checked ? 'high' : 'any';

    request
      .get('https://www.googleapis.com/youtube/v3/search')
      .query({
        key: API_KEY,
        part: 'snippet',
        q: q,
        type: 'video',
        maxResults: 20,
        videoDefinition: videoDef
      })
      .end(function(err, response){
        that.setState({videos: response.body.items});
      });

  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <span className="logo">GREAT DJ<span className="it">!</span></span>
          <input type="text" ref="query" />
          <input type="submit" value="Search" />
          <input type="checkbox" value="HD Only" ref="hd" id="hd-checkbox" /><label htmlFor="hd-checkbox"> HD Only </label>
        </form>
        <SearchResults videos={this.state.videos} enqueueHandler={this.videoEnqueued} playNowHandler={this.playNowHandler} />
      </div>
    );
  },
});

React.renderComponent(
  <SearchComponent />,
  document.getElementById('search-component')
);

module.exports = SearchComponent;

