import { Row, Col, Container, Dropdown, Image } from 'react-bootstrap';
import linkedInLonger from '../Assets/linkedinLonger.png';
import { Component } from 'react';

import './Footer.css';

class Footer extends Component {
	render() {
		return (
			<div className='footer container-fluid'>
				<Row className='row'>
					<ul>
						<Image src={linkedInLonger} className='linkedInLonger' />
					</ul>
				</Row>
				<Row md={5} sm={2} className='justify-content-between'>
					<Col>
						<ul>
							<small>About</small>
						</ul>
						<ul>
							<small>Community Guidelines</small>
						</ul>
						<ul>
							<Dropdown>
								<Dropdown.Toggle
									variant='link'
									className='m-0 p-0 text- text-black-50'>
									<small>Privacy & Terms </small>
								</Dropdown.Toggle>
								<Dropdown.Menu className='super-colors'>
									<Dropdown.Item eventKey='1'>Privacy Policy</Dropdown.Item>
									<Dropdown.Item eventKey='2'>User Agreement</Dropdown.Item>
									<Dropdown.Item eventKey='3'>Cookie Policy</Dropdown.Item>
									<Dropdown.Item eventKey='4'>Copyright Policy</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</ul>
						<ul>
							<small>Sales Solutions</small>
						</ul>
						<ul>
							<small>Safety Center</small>
						</ul>
						<ul>
							<small className='text-muted'>LinkedIn Corporation © 2020</small>
						</ul>
					</Col>
					<Col md={2}>
						<ul>
							<small>Accessibility</small>
						</ul>
						<ul>
							<small>Careers</small>
						</ul>
						<ul>
							<small>Ad Choices</small>
						</ul>
						<ul>
							<small>Mobile</small>
						</ul>
					</Col>
					<Col md={2}>
						<ul>
							<small>Talent Solutions</small>
						</ul>
						<ul>
							<small>Marketing Solutions</small>
						</ul>
						<ul>
							<small>Advertising</small>
						</ul>
						<ul>
							<small>Small Business</small>
						</ul>
					</Col>
					<Col md={3}>
						<ul>
							<Row>
								<small className='ml-3'>
									<div>Questions</div>

									<small>Visit our Help Center</small>
								</small>
							</Row>
						</ul>
						<ul>
							<Row>
								<small className='ml-3'>
									<div>Manage your account and privacy</div>

									<small>Go to your Settings</small>
								</small>
							</Row>
						</ul>
					</Col>
					<Col>
						<ul id='language'>
							<small>Select Language</small>
							<select className='form-select footer-select' defaultValue='0'>
								<option value='0'>English (English)</option>
								<option value='1'>Italian</option>
								<option value='2'>French</option>
								<option value='3'>German</option>
							</select>
						</ul>
					</Col>
					<Col></Col>
				</Row>
			</div>
		);
	}
}

export default Footer;
