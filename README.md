# Project Overview

The project is a web-based application that reads RSS feeds. It is started by opening the index.html file. To the top left is a hamburger icon. Clicking it opens a initially hidden menu offering different feeds. 10 feeds are loaded. Click a topic to open the feed in the same window.


## Testing the project?

[Jasmine](http://jasmine.github.io/) is used to test the code. Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development". This is when developers write tests first, before they ever start developing their application.


## Test suites

The following test suites and subsequent tests were run to test the code.

### RSS Feeds
These first tests check the *allFeeds* variable in our application. The first test checks whether it is defined.
```javascript
it('are defined', function() {
    expect(allFeeds).toBeDefined();
    expect(allFeeds.length).not.toBe(0);
});
```

The second test loops through the feeds and checks first whether each object has a url field defined, then that it is not empty url.
```javascript
it('each feed contains a non empty URL', function() {
  var url = "";
  for (var i=0; i<allFeeds.length; i++) {
    url = allFeeds[i].url;
    expect(url).toBeDefined();
    expect(url.length).not.toBe(0);
  }
});
```

The third test loops through the feeds again and checks each object in the same way for an existing and  non-empty name field.
```javascript
it('each feed has a non empty name', function() {
  var name = "";
  for (var i=0; i<allFeeds.length; i++) {
    name = allFeeds[i].name;
    expect(name).toBeDefined();
    expect(name.length).not.toBe(0);
  }
});
```


### The menu
The second test suite is concerned with the menu. It checks first whether the menu is initially hidden. The application provides a hamburger icon to toggle the *menu-hidden* class for the body element. Initially the menu is supposed to be hidden, hence the check whether the menu-hidden class is already connected to the body element.
```javascript
it('memu is initially hidden', function(){
  var hidden = $('body').hasClass('menu-hidden');
  expect(hidden).toBe(true);
});
```

Next we check to ensure that the menu changes its visibility when the menu icon is clicked. Clicking the icon translates the menu into view (setting x to 0). Clicking it again translates it out of the view by a given number of em. Plus, we know that the menu has a given width.
Therefore, adding menu width and position value needs to be negative for a hidden menu and positive for a visible menu.
```javascript
it('menu changes visibility', function() {
  var menuWidth = $('.slide-menu').css( "width" ); // does not change
  var menuPosition = 0;                            // when visible
  var total = Number(menuWidth.slice(0,-2)) + Number(menuPosition);
  expect(total).toBeGreaterThan(0);

  menuPosition = $('.slide-menu').position();      // when hidden
  total = Number(menuWidth.slice(0,-2)) + Number(menuPosition.left);
  expect(total).toBeLessThan(0);
});  
```

### Initial Entries
The third test suite is concerned with the initial setup. Initially, at least one .entry element is provided within the .feed container. The data is provided asynchronously. I am employing the done() function which can be paired with the beforeEach() function.
Initially, the length of the feed list is set to 0. beforeEach() calls the function to load the feeds - loadFeed() - and sets the list length to 1. The expectation then is that the list length now is greater than 0 and it is tested.
```javascript
var listLength = 0;

beforeEach(function(done){
  loadFeed(0, function(){
    listLength = 1;
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
Each entry in the feed list is appended to the container, which holds the class
name '.feed'. It depends on the asynchronous function loadFeed(), so done() in
combination with beforeEach() is used.
To make sure that the content can actually change, a callback function is used
in beforeEach() to ensure that the feed list length is greater than 0.
When the feeds are read they are appended to the container holding the class
'entry' so, if everything went right, there should a number of elements with the
class 'entry'. If this is the case, the initially false viewChanged variable is
set to true and the expectation is met.
```javascript
var listLength = 0;
var viewChanged = false;

beforeEach(function(done){
  loadFeed(0, function(){
    listLength = 1;
    done();
  });
});

it('view has changed due to new feed', function (done){
  if (listLength>0) {
    if(document.getElementsByClassName('entry').length>0) {
      viewChanged = true;
    }
  }
  expect(viewChanged).toBe(true);
  done();
});
```
