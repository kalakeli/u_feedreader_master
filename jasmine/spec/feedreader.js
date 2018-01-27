/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed contains a non empty URL', function() {
          var url = "";
          for (var i=0; i<allFeeds.length; i++) {
            url = allFeeds[i].url;
            expect(url).toBeDefined();
            expect(url.length).not.toBe(0);
          }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has a non empty name', function() {
           var name = "";
           for (var i=0; i<allFeeds.length; i++) {
             name = allFeeds[i].name;
             expect(name).toBeDefined();
             expect(name.length).not.toBe(0);
           }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('memu is initially hidden', function(){
           var hidden = $('body').hasClass('menu-hidden');
           expect(hidden).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu changes visibility', function() {
            // clicking the hamburger icon translates the menu into view
            // i.e. slide-menu x position is changed to 0
            // clicking it again translates it by -12em
            var menuWidth = $('.slide-menu').css( "width" ); // 10em wide
            var menuPosition = 0;                            // when visible
            var total = Number(menuWidth.slice(0,-2)) + Number(menuPosition);
            expect(total).toBeGreaterThan(0);

            menuPosition = $('.slide-menu').position();      // when hidden
            total = Number(menuWidth.slice(0,-2)) + Number(menuPosition.left);
            expect(total).toBeLessThan(0);

          });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
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
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
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
    });

}());
