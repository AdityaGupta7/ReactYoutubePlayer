import React, { Component } from 'react';//because this file has JSX; { Component } is an ES6 piece of syntax
//import React and pull off a Component in variable called Component

/*const SearchBar = () => {//This is a functional component
  return <input />;
}*/
//The following is an ES6 class
class SearchBar extends Component {//give class SearchBar all the functionality that React.Component has
  //every class which is going to be exported must have a render function
  constructor(props){//this constructor is created to define state
    super(props); // super means we're calling parent method (of React.Component), not of SearchBar

    this.state = { term: '' }; //term records the changes that happen when user inputs into search bar.
    //see that the state is a javascript object "term", as we discussed. And only in the constructor function
    //we define the state (term object) like this.
  }
  render(){
    /*return <input onChange={this.onInputChange}/>;*/ // render must always return some JSX
    return(
      <div className="search-bar">
    <input
      value= {this.state.term} // the value of the input is no more provided by user's typing; but through the state
      //input's value changes only when the state changes. By doing this we get input's that instant's value at
      //any point of time
      onChange={(event) => this.onInputChange(event.target.value)} />
     </div>
  );// We are setting new state here
  }
  onInputChange(term){
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
  /*onInputChange(event){//we are using event object as argument
    console.log(event.target.value);//gets event's realtime value in cosole.log
  }*/
}



export default SearchBar; // this is so that we can use this SearchBar component in the 'main' or index.js
// we expicitly export only the components that we want to share, not the whole file

//state is plain javascript object that is used to record and react to user events. Each class component we
//define has its own state object. Whenever a component's state is changed, it re-renders and also forces all of
//its children to re-render as well. Example everytime SearchBar component's state changes render function is
//re-ran
//functional components do not have state; only class based components do. (goto line 11)
//{this.input.state}
