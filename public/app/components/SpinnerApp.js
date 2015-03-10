var React = require('react');
var TheSpinner = require('./TheSpinner');
var MeetupLoader = require('./MeetupLoader');

var SpinnerApp = React.createClass({

    getInitialState : function() {
        return {
            data : [],
            meetups : []
        }
    },

    componentWillMount : function() {
        MeetupLoader.fetchMemtechEvents(function(response){
            this.setState({
                meetups : response
            });

            if ( response.length ) {
               this.fetchMeetup(response[0].id)
            }

        }.bind(this));
    },

    fetchMeetup : function(meetupId) {
        MeetupLoader.fetch(meetupId, function(response){
            this.setState({
                data : response
            })
        }.bind(this));
    },

    render : function() {
        return (

            <TheSpinner spinnerItems={this.state.data} fetchMeetup={this.fetchMeetup} meetups={this.state.meetups} />

        );
    }
});

module.exports = SpinnerApp;