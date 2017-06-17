// Include React
var React = require("react");
var axios = require("axios");

// Here we include all of the sub-components
var Search = require("./children/Search");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");


// Creating the Main component
var Main = React.createClass({

  getInitialState: function() {
    return {
      topic: "",
      start: "",
      end: "",
      results: [],
      saved: []
    }
  },

  // The moment the page renders get the saved articles
  componentDidMount: function(){
    axios.get('/api/saved')
      .then(function(response){
        this.setState({
          saved: response.data
        });
      }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function(prevProps, prevState){

    if(prevState.topic != this.state.topic){
      console.log("UPDATED!");

      helpers.runQuery(this.state.topic, this.state.start, this.state.end)
        .then(function(data){
          console.log(data);
          if (data != this.state.results)
          {
            this.setState({
              results: data
            })
          }
        }.bind(this))
    }
  },

  // This function allows childrens to update the parent.
  setTerm: function(articleTopic, startYear, endYear){
    this.setState({
      topic: articleTopic,
      start: startYear,
      end: endYear
    })
  },

  getArticle: function(){
    axios.get('/api/saved')
      .then(function(response){
        this.setState({
          saved: response.data
        });
      }.bind(this));
  },

  saveArticle: function(title, date, url){
    helpers.postArticle(title, date, url);
    this.getArticle();
  },

  deleteArticle: function(article){
    axios.delete('/api/saved/' + article._id)
      .then(function(response){
        this.setState({
          saved: response.data
        });
        return response;
      }.bind(this));

    this.getArticle();
  },


  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">NYT Article Search!</h2>
            <p className="text-center">
              <em>Search for and annotate articles of interest.</em>
            </p>
          </div>
        </div>
        <Search />
        
      </div>
    )
  }
});

module.exports = Main;

            // setTerm = {this.setTerm}
        // <Results results = {this.state.results}
        //   SaveArticle={this.saveArticle}/>
        // <Saved savedArticles={this.state.saved} 
        //   deleteArticle={this.deleteArticle}/>
