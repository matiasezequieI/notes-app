import React, { useState } from 'react';
import { LoginModalProps } from '../interfaces/LoginModalProps';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../interfaces/LoginCredentials';
import * as NotesApi from '../network/notes_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import TextInputField from './form/TextInputField';
import styleUtils from '../styles/utils.module.css';
import { UnauthorizedError } from '../errors/HttpErrors';

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
	const { register, handleSubmit, formState: {errors, isSubmitting } } = useForm<LoginCredentials>();
	
	const [errorText, setErrorText] = useState<string | null>(null);

	const onSubmit = async (credentials: LoginCredentials) => {
		try {
			const user = await NotesApi.login(credentials);
			onLoginSuccessful(user);
		} catch (error) {
			if(error instanceof UnauthorizedError) {
				setErrorText(error.message);
			} else {
				alert(error);
			}
			console.error(error);
		}
	};

	return (
		<Modal show onHide={onDismiss}>
			<Modal.Header closeButton>
				<Modal.Title>
          Log In
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<TextInputField
						name='username' 
						label='Username'
						type='text'
						placeholder='Username'
						register={register}
						registerOptions={{ required: true }}
						error={errors.username}
					/>
					<TextInputField
						name='password' 
						label='Password'
						type='password'
						placeholder='Password'
						register={register}
						registerOptions={{ required: true }}
						error={errors.password}
					/>

					{
						errorText && 
						<Alert variant='danger'>
							{errorText }
						</Alert>
					}
					<Button type='submit' disabled={isSubmitting} className={styleUtils.width100}>
            Log In
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;