import { Container, Row, Col, Modal} from "react-bootstrap";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AiFillPlaySquare } from "react-icons/ai";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import {GiPerson} from 'react-icons/gi'
import {FaGlobeAmericas} from 'react-icons/fa'
import {IoDocumentSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {TiStarburst} from 'react-icons/ti'
import {RiBarChart2Fill} from 'react-icons/ri'
import {BiDotsHorizontalRounded,BiMessageRoundedDetail} from 'react-icons/bi'


const CreatePostCard = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
      <>
    <Container>
      <Row>
        <Col md={3}>
          {/* <div className="createPost">CREATE POST</div> */}
        </Col>
        <Col md={6}>
          <Container className="createPost d-flex flex-column pt-2 pb-3">
            <div className='d-flex'>
                <CgProfile class='start-post-image'/>
            <button className="start-post flex-grow-1 text-left pl-3" onClick={handleShow}>
              Start a post
            </button>
            </div>
        
            
            <div className="d-flex justify-content-between">
              <button className='share-card-button'>
                <HiOutlinePhotograph className='post-card-icon'/>
                <span class='text-muted'>Photo</span>
              </button>
              <button className="share-card-button">
                <AiFillPlaySquare className='post-card-icon'/>
                <span class='text-muted'>Photo</span>
              </button>
              <button className="share-card-button">
                <HiOutlinePhotograph className='post-card-icon'/>
                <span class='text-muted'>Photo</span>
              </button>
              <button className="share-card-button">
                <HiOutlinePhotograph className='post-card-icon'/>
                <span class='text-muted'>Photo</span>
              </button>
            </div>
          </Container>
        </Col>
        <Col md={3}>
          {/* <div className="createPost ">CREATE POST</div> */}
        </Col>
      </Row>
    </Container>

<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
  <Modal.Title>Create a Post</Modal.Title>
</Modal.Header>
<Modal.Body>
    <div>
    <CgProfile className='modal-profile-rounded'/>
    <button className='post-dropdown mx-1 dropdown-toggle'><GiPerson/>Christian Ankobil</button>
<button className='post-dropdown mx-1 dropdown-toggle'><FaGlobeAmericas className='mr-1'/>Anyone</button>
    </div>
    <div class="form-group post-comment">
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" placeholder='What do you want to talk about?'></textarea>
  </div>
  <button className='add-hashtag mb-3'><span>Add hashtag</span></button>
  <div className='d-flex'>
      <div>
      <HiOutlinePhotograph className='share-icons'/>
      <AiFillPlaySquare className='share-icons'/>
       <IoDocumentSharp className='share-icons'/>
       <BsBriefcaseFill className='share-icons'/>
       <TiStarburst className='share-icons'/>
       <RiBarChart2Fill className='share-icons'/>
       <BiDotsHorizontalRounded className='share-icons'/>
      </div>
      <div >
      <button className='anyone-button'><BiMessageRoundedDetail className='share-icons'/>Anyone</button>
      </div>
      <div>
          <button className='post-button px-3 py-1 ml-5'><span>Post</span></button>
      </div>
  </div>
</Modal.Body>
{/* <Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="primary" onClick={handleClose}>
    Save Changes
  </Button>
</Modal.Footer> */}
</Modal>
</>

  );
};

export default CreatePostCard;
