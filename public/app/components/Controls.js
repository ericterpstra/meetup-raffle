var React = require('react');

var Controls = React.createClass({

    onChangeMeetup: function(e) {
        this.props.fetchMeetup(e.target.value);
    },

    render: function(){

        let meetups = this.props.meetups.map((meetup) => <option value={meetup.id}>{meetup.name}</option>);

        return(
            <div className='photo-controls'>

                <button onClick={this.props.onSpin}>Spin!</button>

                <div>
                    <label>Meetup ID:</label>
                    <select onChange={this.onChangeMeetup}>
                        {meetups}
                    </select>
                </div>

                <div>
                    <label>Photo Size: </label>
                    <input type='range'
                           min='50'
                           max='250'
                           value={this.props.lengthOfSide}
                           onChange={this.props.onChangeLengthOfSide}
                           step='10' />
                </div>

            </div>
        )
    }

});

module.exports = Controls;