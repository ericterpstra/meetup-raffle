var React = require('react');
var r = require('random-js')();
var accounting = require('accounting');

var Dollars = React.createClass({

    getStyle : function(i) {
        let o = -(360/this.props.n) * i;
        let a = this.props.a;

        return {
            'transform': `rotateX(${o}deg) translateZ(${a}px)`,
            width: this.props.s,
            height: this.props.s
        }
    },

    render: function() {
        return (
            <div className='photo' style={this.getStyle(this.props.i)}>
                <div className='photo-contain'>
                    <div className='caption'>
                        <p>{accounting.formatMoney((this.props.i+1) * r.integer(1000, 7000))}</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Dollars;