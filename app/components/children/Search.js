// Include React 
var React = require('react');

var Search = React.createClass({

	getInitialState: function(){
		return {
			topic: "",
			start: "",
			end: ""
		}
	},

	handleChange: function(event){
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);

	},

	handleClick: function(){
		this.props.setTerm(this.state.topic, this.state.start, this.state.end);
	},

	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-info">
				<div className="panel-heading">
					<h2 className="panel-title text-center">Search for and save articles of interest</h2>
				</div>
				<div className="panel-body text-center">

						<form>
							<div className="form-group">
								<h4 className=""><strong>Topic: </strong></h4>
								<input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>
								<br />

								<h4 className=""><strong>Start Year: </strong></h4>
								<input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
								<br />

								<h4 className=""><strong>End Year: </strong></h4>
								<input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>
								<br />
								
								<button type="button" className="btn btn-info" onClick={this.handleClick}>Search</button>
							</div>

						</form>
				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Search;