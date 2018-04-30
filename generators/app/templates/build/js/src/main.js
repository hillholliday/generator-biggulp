'use strict';


let $body = $('body');


export default class Main {


    getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) { return null; }
        if (!results[2]) { return ''; }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Example event listener for this class
    onScroll() {
        // Ex.
        // Insert onscroll handler + code here
    }


    // Any event based methods can be invoked here
    eventListeners() {
        
    }

}


