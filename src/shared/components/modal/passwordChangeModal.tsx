import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from 'shared/components/form/button';
import CustomModal from 'shared/components/modal/modal';
import { Formik } from 'formik';
import { Input } from '../form/inputTypes';
import { ILogout } from 'features/login/interface/login';
import { changePasswordValidationSchema } from 'shared/constants/validation-schema';
// import { challengeError } from 'features/challenges/components/constants';

interface IProps {
	loading: boolean;
	show: boolean;
	handleClose: () => void;
	handleUpdatePassword: (data: ILogout) => any;
	className: string;
}

const PasswordChangeModal: React.FC<IProps> = (props) => {
	const [initialValues, setInitialValues] = useState({});
	const handleSubmit = (formData) => {
		toast.promise(props.handleUpdatePassword(formData), {
			loading: 'Changing Password...',
			success: <b>Password Changed Successfully.</b>,
			error: <b>Could not changed password.</b>
		});
	};
	return (
		<CustomModal show={props.show} handleClose={props.handleClose} className={props.className}>
			<h1>Password Change</h1>
			<div className='view-challenge-modal-wrapper'>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					enableReinitialize
					validationSchema={changePasswordValidationSchema}
					validateOnChange={false}
					validateOnBlur={false}
					validateOnMount={false}
				>
					{({ setFieldValue, handleSubmit, values, errors }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className='add-challenge-modal-wrapper'>
									<div className='form-group '>
										<Input
											type='text'
											name='oldPassword'
											placeholder='Start typing...'
											setFieldValue={setFieldValue}
											showLabels
											className='full-width input-field'
											config={{
												name: 'oldPassword',
												type: 'text',
												label: 'Old Password'
											}}
										/>
										{/* {!values.oldPassword &&
											challengeError(errors, 'oldPassword', 'Old Password  is required.')} */}
									</div>
									<div className='form-group '>
										<Input
											type='text'
											name='newPassword'
											placeholder='Start typing...'
											setFieldValue={setFieldValue}
											showLabels
											className='full-width input-field'
											config={{
												name: 'newPassword',
												type: 'text',
												label: 'New Password'
											}}
										/>
										{/* {!values.newPassword &&
											challengeError(errors, 'newPassword', 'New Password  is required.')} */}
									</div>
									<div className='d-flex mt-12'>
										<Button
											type='button'
											btnType='primary'
											className='button-size--medium font--14px font-weight--500 line-height--20px mt-12 mr-13 height--40px width-214px'
											onClick={() => props.handleClose()}
										>
											Cancel
										</Button>
										<Button
											btnType='default'
											type='submit'
											disabled={props.loading}
											className='button-size--medium font--14px font-weight--500 line-height--20px mt-12 height--40px width-214px bg--purple color-white'
											onClick={handleSubmit}
										>
											Update
										</Button>
									</div>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
		</CustomModal>
	);
};
export default PasswordChangeModal;
