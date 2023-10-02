/*global chrome*/
/*eslint no-undef: "error"*/

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    const {event, url } = data
    switch (event) {
        case 'fetchNews':
            console.log(url);
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    console.log("In background script");
                    console.log(json)
                    sendResponse(json)
                });
            break;
    }
    return true;
});

/* This is a script that runs in the background and makes the API calls to the NewsAPi */