var reqwest = require('reqwest');


function fetchMemtechEvents(cb) {
    reqwest({
        url: '/meetups',
        method: 'get',
        contentType: 'application/json',
        success: function (meetups) {
            cb( meetups );
        },
        error: function(resp) {
            console.log('error');
        }
    });
}

// Get individual meetup

function getPhoto(userObj){
    if (userObj['member_photo'] && userObj.member_photo.photo_link) {
        return userObj.member_photo.photo_link;
    }

    return 'http://lorempixel.com/300/300/cats';
}

function processResults(response) {
    let len = response.results.length;
    return response.results
            .filter( user => user.response === "yes")
            .map( (user, i, arr) => { return {
                id: i,
                angle: (360/arr.length) * i,
                url: getPhoto(user),
                caption: user.member.name
            } } );
}


function fetch(id, cb) {
    reqwest({
        url: '/meetup',
        method: 'get',
        data: [{ name: 'meetupid', value:id }],
        contentType: 'application/json',
        success: function (resp) {
            cb( processResults(resp) );
        },
        error: function(resp) {

            console.log('error');
        }
    });
}

 module.exports = {
     fetch, fetchMemtechEvents
 };