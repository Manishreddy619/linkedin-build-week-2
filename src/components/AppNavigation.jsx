import {
  Nav,
  Navbar,
 
} from "react-bootstrap";
import linkedInLogo from "../Assets/LinkedIn-logo.png";
import { FaHome } from "react-icons/fa";
import {
  BsFillPeopleFill,
  BsBriefcaseFill,
  BsFillBellFill,
  BsGrid3X3Gap,
} from "react-icons/bs";
import { AiFillMessage, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Component } from "react";
import { getFilteredProfiles } from "../Utilities/fetches";
import {Link} from 'react-router-dom'


//Header
class AppNavigation extends Component {
  state = {
    show: false,
    name: this.props.name,
    jobTitle: this.props.jobTitle,
    profilePicture: this.props.profilePicture,
    userID: this.props.userID,
    searchInput: "",
    searchResults: [],
    showSearchResults: false,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  search = async () => {
    const results = await getFilteredProfiles(this.state.searchInput)
    this.setState({
      searchResults: results
    })
  }


  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.searchInput !== prevState.searchInput){
      this.search()
      console.log(this.state.searchResults)
    }

    if (this.props.name !== prevProps.name) {
      this.setState({
        name: this.props.name,
        jobTitle: this.props.jobTitle,
        userID: this.props.userID,
      });
    }

    if (this.props.profilePicture !== prevState.profilePicture) {
      this.setState({ profilePicture: this.props.profilePicture });
    }

    if (this.state.searchInput.length !== prevState.searchInput.length) {
      this.state.searchInput.length !== 0
        ? this.setState({ showSearchResults: true })
        : this.setState({ showSearchResults: false });
    }
  };

  componentDidMount = async () => {
  await getFilteredProfiles(this.state.searchResults);
  }

  searchInputTextHandler = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    return (
      <>
        
          <Navbar expand="lg" fixed="top" className='container' >
            <Navbar.Brand href="#">
              <img src={linkedInLogo} alt="LinkedIn-logo" id="linkedIn-logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="mr-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                

                
                  <div className='search-container'>
                  <AiOutlineSearch className='search-icon'/>
                  <input
                    type="text"
                    placeholder="Search"
                    className="mr-2 searchbar"
                    onChange={this.searchInputTextHandler}
                    value={this.state.searchInput}
                  ></input>
                  <div className='search-results-container swing-in-top-fwd'>
                      {this.state.searchResults.length > 0 &&
                        this.state.searchResults.map(user=><div key={user.id}>
                          <Link to={'/profile/'+user._id}>
                          <strong href="/">{user.name} </strong> 
                          <strong>{user.surname}</strong>
                          <small> · 1st · </small>
                          <small>{user.title}</small>
                          </Link>
                          </div> )}
                  </div>
                  </div>
                  
                  
                  
                


              </Nav>

              <Nav>
                <Nav.Link
                  href="#action1"
                  className="d-flex flex-column align-items-center "
                >
                  <FaHome className="Navbaricon" />
                  <small>Home</small>
                </Nav.Link>
                <Nav.Link
                  href="#action1"
                  className="d-flex flex-column align-items-center"
                >
                  <BsFillPeopleFill className="Navbaricon" />
                  <small>My Network</small>
                </Nav.Link>
                <Nav.Link
                  href="#action1"
                  className="d-flex flex-column align-items-center mx-2"
                >
                  <BsBriefcaseFill className="Navbaricon" />
                  <small>Jobs</small>
                </Nav.Link>
                <Nav.Link
                  href="#action1"
                  className="d-flex flex-column align-items-center mx-2"
                >
                  <AiFillMessage className="Navbaricon" />
                  <small>Messaging</small>
                </Nav.Link>
                <Nav.Link
                  href="#action1"
                  className="d-flex flex-column align-items-center mx-2"
                >
                  <BsFillBellFill className="Navbaricon" />
                  <small>Notifications</small>
                </Nav.Link>
                <Nav.Link
                  href="#action1"
                  className="d-flex flex-column align-items-center mx-2"
                >
                  <CgProfile className="Navbaricon" />
                  <small>Me</small>
                </Nav.Link>
                <Nav.Link
                  href="#action1"
                  className="d-flex flex-column align-items-center mx-2"
                >
                  <BsGrid3X3Gap className="Navbaricon" />
                  <small>Work</small>
                </Nav.Link>
                <Nav.Link
                  href="#action1"
                  className="d-flex flex-column align-items-center mx-2"
                >
                  <small>Try Premium</small>
                  <small>For Free</small>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        

        {/*Footer*/}


      </>
    );
  }
}

export default AppNavigation;
