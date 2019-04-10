"use strict";
var $ = function (id) { return document.getElementById(id); };

var imageCache = [];
var imageCounter = 0;
var timer;

var runSlideShow = function() {
    imageCounter = (imageCounter + 1) % imageCache.length;  // clever use of %
    var image = imageCache[imageCounter];
    $("image").src = image.src;
    $("caption").firstChild.nodeValue = image.title;
};

window.onload = function () {           // runs first time page is loaded from the server
    var listNode = $("image_list");    // the ul element

    //var links = [];  // no need to tell JA its an array, it will figure it out for itself!
    //links = listNode.getElementsByTagName("a");  
    
    var links = listNode.getElementsByTagName("a");  // the 4 li elements in the ul,  links is now an array
    
    // Preload images, copy title properties, and store in array  (kind of a goofy place to store the image file names!)
    var i, link, image;
    for ( i = 0; i < links.length; i++ ) {
        link = links[i];
        image = new Image();
        image.src = link.getAttribute("href");
        image.title = link.getAttribute("title");
        imageCache[imageCache.length] = image;  // arrays start with 0, so this adds an element to the end
    }

    // Attach start and pause event handlers
    $("start").onclick = function() {
        // disable start button, enable pause button,
        // run slide show, and start timer to change 
        // slide every 2 seconds
        runSlideShow();
        timer = setInterval(runSlideShow, 2000);  // using built in timer "setInterval" and passing in a callback function
        $("start").setAttribute("disabled", "true");
        $("pause").removeAttribute("disabled");
    };
    $("pause").onclick = function() {
        // cancel timer, disable pause button,
        // and enable start button
        clearInterval(timer);
        $("start").removeAttribute("disabled");
        $("pause").setAttribute("disabled", "true");
    };
};