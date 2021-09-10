import React from 'react';
import './InputOption.css';
const InputOption = ({ title, Icon, color }) => {
	return (
		<div className='inputOption'>
			<Icon style={{ color: color }} className='icon' />
			<h6>{title}</h6>
		</div>
	);
};

export default InputOption;
