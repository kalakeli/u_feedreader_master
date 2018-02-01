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

    describe('RSS Feeds', function() {
        var i;
        /* The test ensures that the allFeeds variable has been defined and is
         * not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The 2nd test checks the correctness of each url in each feed. It does
         * so by wrapping 'it' in a for loop to see which url might fail.
         */
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


        /* The 3rd test checks the name in each feed. It does
         * so by wrapping 'it' in a for loop to see which url might fail.
         */
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

    });


    describe('The menu', function() {
        var menuIcon = $('.menu-icon-link');
        var i=0;

        /* check that the menu is initially hidden, i.e. the body has the class
         * 'menu-hidden'
         */
         it('memu is initially hidden', function(){
           var hidden = $('body').hasClass('menu-hidden');
           expect(hidden).toBe(true);
         });

         it('menu toggles correctly', function() {
           menuIcon.trigger('click'); // click once
           expect($('body').hasClass('menu-hidden')).toBe(false);
           menuIcon.trigger('click'); // click again
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });


    /* test suite  "Initial Entries" */
    describe('Initial Entries', function() {
        /* test that after loadFeed completes its work, there is at least
         * a single .entry element within the .feed container.
         */
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
    });


    describe('New Feed Selection', function() {
        /* this test checks that the content actually changes when a new feed is
         * loaded. The test loads a feed, saves the content, then loads another
         * one. After loading the second feed, done() is called to finish the
         * function.
         * I compare the titles of the first entry in each result, which
         * should be unequal since they are from different feeds.
         */
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
    });

}());
