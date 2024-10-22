// // FileName: Navb.js 
  
// import React from "react"; 
  
// const Nav = ({ setLibraryStatus, libraryStatus }) => { 
//     return ( 
//         <nav> 
//             <h1>  Music Player</h1> 
//             <button 
//                 onClick={() => { 
//                     setLibraryStatus(!libraryStatus); 
//                 }} 
//             > 
//                 <h4>Library</h4> 
//             </button> 
//         </nav> 
//     ); 
// }; 
  
// export default Nav; 

import React, { Component } from "react";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.toggleLibraryStatus = this.toggleLibraryStatus.bind(this);
    }

    toggleLibraryStatus() {
        const { setLibraryStatus, libraryStatus } = this.props;
        setLibraryStatus(!libraryStatus);
    }

    render() {
        return (
            <nav>
                <h1>Music Player</h1>
                <button onClick={this.toggleLibraryStatus}>
                    <h4>Library</h4>
                </button>
            </nav>
        );
    }
}

export default Nav;
