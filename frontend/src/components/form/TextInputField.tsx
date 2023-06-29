import React from 'react';
import { TextInputFieldProps } from '../../interfaces/TextInputFieldProps';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

const TextInputField = ({ name, label, register, registerOptions, error, ...props }: TextInputFieldProps) => {
	return (
		<FormGroup className='mb-3' controlId={`${name}-input`}>
			<FormLabel>{label}</FormLabel>
			<FormControl
				{...props}
				{...register(name, registerOptions)}
				isInvalid={!!error}
			/>
			<Form.Control.Feedback type="invalid">
				{error?.message}
			</Form.Control.Feedback>
		</FormGroup>
	);
};

export default TextInputField;