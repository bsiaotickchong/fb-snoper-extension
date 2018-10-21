'use strict';

var curr_num_posts = 0;

function getAllPosts() {
    var posts = document.querySelectorAll('[data-testid="fbfeed_story"]');  // for normal 
    if (posts.length == 0) {
        posts = document.querySelectorAll('[class="_4-u2 _4-u8"]');
    }

    return posts;
}

function getNumPosts() {
    var list = getAllPosts();
    return list.length;
}

function checkIfShouldAddButtons() {
    var new_num_posts = getNumPosts();
    if (curr_num_posts < new_num_posts) {
        return true;
    }

    return false;
}

function addBetButtonsWhereMissing() {
    // get the posts
    var posts = getAllPosts();

    var popup_template = document.createElement("div");
    popup_template.id = "betPopUp";
    var t = document.createTextNode("My thingy");
    popup_template.appendChild(t);

    posts.forEach(post => {
        // create the button 
        // var link = document.createElement('a');
        var btn = document.createElement("button");
        var t = document.createTextNode("Snopes");
        // link.appendChild(btn);
        btn.appendChild(t);
        btn.id = "btnBet";

        var att = document.createAttribute("onclick");
        att.value = "window.open('https://snopes.com', '_blank');";
        btn.setAttributeNode(att); 
        var cls = document.createAttribute("class");
        cls.value = "btnSnopes";
        btn.setAttributeNode(cls);

        tippy('#btnBet', { interactive: true, content: "Search on Snopes!"});

        // add the button to the like bar
        var likeBar = post.querySelector('[class="_ipo"]');
        if (likeBar != null && post.querySelector('[id="btnBet"]') == null){
            likeBar.prepend(btn);
            // btn.addEventListener("click", showSnopesWindow);
        } 
    });
}

setInterval(function() {
    if (checkIfShouldAddButtons()) {
        addBetButtonsWhereMissing();
    }
}, 1000);



