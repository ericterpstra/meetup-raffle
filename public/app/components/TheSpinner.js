var React = require('react');
var Photo = require('./spinitems/Photo');
//var Dollars = require('./spinitems/Dollars');
var Controls = require('./Controls');
var r = require('random-js')();
var TweenMax = require('gsap');

var TheSpinner = React.createClass({

    gapWidth: 10,

    photos: [],

    getInitialState : function() {
        return {
            numberOfSides : 1,
            inradius: 1,
            lengthOfSide: 1,
            winner: -1
        }
    },

    componentWillReceiveProps : function(nextProps) {
        let numberOfSides = nextProps.spinnerItems.length;
        let lengthOfSide = 100;
        let inradius = this.getInradius(lengthOfSide, numberOfSides, this.gapWidth);
        let num = nextProps.spinnerItems.length;

        this.setState({
            numberOfSides : nextProps.spinnerItems.length,
            inradius: inradius,
            lengthOfSide: lengthOfSide,
            winner: -1
        });
    },

    render: function() {

        let photos = this.props.spinnerItems.map(
                (photo, i) => <Photo src={photo.url}
                                     index={photo.id}
                                     angle={photo.angle}
                                     numItems={this.props.spinnerItems.length}
                                     inradius={this.state.inradius}
                                     lengthOfSide={this.state.lengthOfSide}
                                     caption={photo.caption}
                                     winner={this.state.winner}
                    />
        );

        return (
            <div className='photospinner'>

                <div ref='photocontainer' className='photocontainer' style={this.getContainerStyle()}>
                    <div ref='spinner' className='photoset' style={this.getPhotosetStyle()}>
                        {photos}
                    </div>
                </div>

                <Controls meetups={this.props.meetups}
                          onSpin={this.onSpin}
                          onChangeLengthOfSide={this.onChangeLengthOfSide}
                          fetchMeetup={this.props.fetchMeetup}
                          lengthOfSide={this.state.lengthOfSide} />

            </div>
        );

    },

    getContainerStyle : function() {
        return {
            perspectiveOrigin : '50% 180px',
            perspective : (this.state.inradius * 2) + 'px'
        }
    },

    getPhotosetStyle : function() {
        return {
            width : this.state.lengthOfSide,
            height : this.state.lengthOfSide
        }

    },

    getInradius : function(len, num, gapWidth) {
        return (len / 2) * (1 / Math.tan( Math.PI / num )) + gapWidth;
    },

    onSpin : function() {
        let spinner = this.refs.spinner.getDOMNode();
        let winnerIndex = r.integer(0, this.props.spinnerItems.length-1);
        let winnerAngle = this.props.spinnerItems[winnerIndex].angle;
        let rotation =  (720 + (360-winnerAngle)) + 'deg';


        TweenMax.set(spinner, {
            rotationY:0,
            onComplete: function() {
                TweenMax.to(spinner, 2, {
                    rotationY:rotation,
                    ease:Back.easeOut,
                    onComplete: function() {
                        this.setState({
                            winner : winnerIndex
                        })
                    }.bind(this)
                });
            }.bind(this)
        });

    },

    onChangeLengthOfSide: function(e) {
        let val = e.target.value;

        this.setState({
            winner: -1,
            lengthOfSide : val,
            inradius: this.getInradius(val, this.props.spinnerItems.length, this.gapWidth)
        })
    }
});

module.exports = TheSpinner;
