var express = require('express');
var request = require('superagent');
var moment = require('moment');
//var Promise = require('bluebird');
var fs = require('fs');

//Promise.promisifyAll(fs);
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/meetup', function(req, res) {
    var meetupId = req.query.meetupid;

    // Otherwise get new data and write to file.
    var filePath = './meetupcache/' + meetupId;

    // Check cache for file with same name as meetupId
    fs.exists(filePath, function(fileExists){

        // and has mTime within 15 minutes of now...
        fs.stat(filePath, function(err, stats){
            var diff = 9999;
            if(stats) {
                var mTime = moment(stats.mtime);
                diff = moment().diff(mTime,'minutes');
            }

            if( !fileExists || diff > 15 ) {
                doMeetupRequest(meetupId, filePath, res);
            } else {
                returnCachedFile(filePath, res);
            }
        });
    });

});

function doMeetupRequest(meetupId, filePath, res) {
    request
        .get('https://api.meetup.com/2/rsvps')
        .query({
            key: process.env.MEETUP,
            'event_id' : meetupId,
            order : 'name'
        })
        .end(function(meetupResults){
            if(meetupResults.ok){
                fs.writeFile(filePath, meetupResults.text, function(err) {
                    //console.log("Sending Data directly From Meetup!");
                    res.json(meetupResults.body);
                });
            } else {
                res.send('Error: ' + meetupResults.text);
            }
        });
}

function returnCachedFile(filePath, res) {
    fs.readFile(filePath, 'utf8', function(err, data){
        if(err) {
            res.send('error reading file');

        } else {
            //console.log('Sending Data from Cached File!!');
            res.json(JSON.parse(data));
        }
    });
}

app.get('/meetups', function(req, res) {
    var startTime = moment().subtract(3,'days').unix() * 1000;
    var endTime = moment().add(8,'days').unix() * 1000;
    request
        .get('https://api.meetup.com/2/events')
        .query({
            key: process.env.MEETUP,
            status: 'upcoming,past',
            'group_urlname': 'memphis-technology-user-groups',
            time: [startTime, endTime].join()
        })
        .end(function(meetupResults){
            if(meetupResults.ok){
                var results = meetupResults.body.results;
                var fixedResults = results.map(function(meetup){
                    return {
                        id: meetup.id,
                        name: meetup.name,
                        time: meetup.time,
                        utcOffset: meetup.utc_offset
                    }
                });
                res.json(fixedResults);
            } else {
                res.send('Error: ' + meetupResults.text);
            }
        });
});

app.listen(process.env.PORT || 3000);