# Project Overview

The project is a web-based application that reads RSS feeds. It is started by opening the index.html file. To the top left is a hamburger icon. Clicking it opens a initially hidden menu offering different feeds. 10 feeds are loaded. Click a topic to open the feed in the same window.

## Test suites
[Jasmine](http://jasmine.github.io/) is used to test the application. The following test suites and subsequent tests were run to test the code.

### RSS Feeds
These first tests check the *allFeeds* variable in our application. The first test checks whether it is defined.
```javascript
it('are defined', function() {
    expect(allFeeds).toBeDefined();
    expect(allFeeds.length).not.toBe(0);
});
```

The second test loops through the feeds and checks first whether each object has a url field defined, then that it is not empty url. It does this by looping through the list of feeds
checking for the url; hence, if the parameter is missing, it can provide which
feed is the culprit
```javascript

  var i;
  function testURLinFeed(feed, nr) {
      it('the feed at position '+nr+' has a non-empty URL', function() {
          var url = feed.url;
          expect(url).toBeDefined();
          expect(url.length).not.toBe(0);
      });
  }
  // now loop through the list of feeds
  for (i=0; i<allFeeds.length; i++) {
    testURLinFeed(allFeeds[i], i);
  }

```

The third test loops through the feeds again and checks each object in the same way for an existing and  non-empty name field.
```javascript
  var i;
  function testNameinFeed(feed, nr) {
      it('the feed at position '+nr+' has a empty name', function() {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
      });
  }
  // now loop through the list of feeds
  for (i=0; i<allFeeds.length; i++) {
    testNameinFeed(allFeeds[i], i);
  }
```


### The menu
The second test suite is concerned with the menu. It checks first whether the menu is initially hidden. The application provides a hamburger icon to toggle the *menu-hidden* class for the body element. Initially the menu is supposed to be hidden, hence the check whether the menu-hidden class is already connected to the body element.
```javascript
it('memu is initially hidden', function(){
  var hidden = $('body').hasClass('menu-hidden');
  expect(hidden).toBe(true);
});
```

Next we check to ensure that the menu changes its visibility when the menu icon is clicked. Clicking the icon translates the menu into view (removing the class *.menu-hidden*).
Clicking it again translates it back out of the view by adding the class .menu-hidden
again. Clicking the icon is an event, therefore it cannot be part of the test
suite. Thus, we 'pretend' it was clicked by triggering the event.
```javascript
var menuIcon = $('.menu-icon-link');
beforeEach(function() {
  menuIcon.trigger( "click" );
});

it ("should show the menu when menuIcon is clicked.", function() {
  expect($('body').hasClass('menu-hidden')).toBe(false);
});
```
and ...

```javascript
var menuIcon = $('.menu-icon-link');
beforeEach(function() {
  menuIcon.trigger( "click" );
});

it ("should show the menu when menuIcon is clicked.", function() {
  expect($('body').hasClass('menu-hidden')).toBe(true);
});
```

### Initial Entries
Initially, at least one .entry element is provided within the .feed container. The data is provided asynchronously. I am employing the done() function which can be paired with the beforeEach() function.
Initially, the length of the feed list is set to 0. beforeEach() calls the function to load the feeds
and set the listLength variable to the length of entries. The expectation then is that the list length now is greater than 0 and it is tested.
```javascript
var listLength = 0;

beforeEach(function(done){
  loadFeed(0, function(){
    listLength = $(".feed .entry").length;
    done();
  });
});

it('list of feeds is not 0', function(done) {
  expect(listLength).toBeGreaterThan(0);
  done();
});
```


### New Feed Selection
The test ensures that the content changes when a new feed is loaded.
Running loadFeed with the first feedID serves a number of entries. Running it
again with the next feedID serves a new number of entries.  
The test thus takes the titles of the first items in each call and compares them.
To do so, loadFeed() needs to be called twice. 
```javascript
var firstItemTitle_call1 = "",
    firstItemTitle_call2 = "";

beforeEach(function(done){
  loadFeed(0, function() {
      firstItemTitle_call1 = $(".feed .entry")[0].innerText;
      loadFeed(1, function() {
          firstItemTitle_call2 = $(".feed .entry")[0].innerText;
          done();
      });
  });
});

it('content has changed due to new feed', function (done){
  expect(firstItemTitle_call1).not.toEqual(firstItemTitle_call2);
  done();
});
```
