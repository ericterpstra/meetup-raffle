var React = require('react');
var TweenMax = require('gsap');

var Photo = React.createClass({

    getStyle : function(i) {
        let o = this.props.angle;
        let a = this.props.inradius;

        return {
            'transform': `rotateX(${o}deg) translateZ(${a}px)`,
            width: this.props.lengthOfSide,
            height: this.props.lengthOfSide
        }
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.index == nextProps.winner) {
            let winner = this.refs.photocontainer.getDOMNode();
            TweenMax.to(winner, 1, {
                scale: '1.5',
                ease: Bounce.easeOut,
                onComplete: function() {
                    this.reverse();
                }
            });
        }
    },

    render: function() {
        return (
            <div ref='photocontainer' className='photo' style={this.getStyle(this.props.index)}>
                <div ref='photo' className='photo-contain'>
                    <div className='caption'><p>{this.props.caption}</p></div>
                    <img src={this.props.src} />
                </div>
            </div>
        );
    }
});

module.exports = Photo;