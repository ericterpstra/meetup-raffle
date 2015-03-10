var React = require('react');
var TweenMax = require('gsap');

var Photo = React.createClass({

    getStyle : function() {
        //'transform': `rotateY(${o}deg) translateZ(${a}px)`,
        return {
            width: this.props.lengthOfSide,
            height: this.props.lengthOfSide
        }
    },

    componentDidMount : function() {
        this.setRotation();
    },

    componentDidUpdate : function() {
        this.setRotation();
    },

    componentWillReceiveProps(nextProps) {
        //this.setRotation();
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
            <div ref='photocontainer' className='photo' style={this.getStyle()}>
                <div ref='photo' className='photo-contain'>
                    <div className='caption'><p>{this.props.caption}</p></div>
                    <img src={this.props.src} />
                </div>
            </div>
        );
    },

    setRotation : function() {
        let o = this.props.angle;
        let a = this.props.inradius;
        let c = this.refs.photocontainer.getDOMNode();

        TweenMax.set(c,{
            rotationY: `${o}deg`,
            transformOrigin: '50% 50% -' + a + 'px',
            z: `${a}px`
        });
    }


});

module.exports = Photo;