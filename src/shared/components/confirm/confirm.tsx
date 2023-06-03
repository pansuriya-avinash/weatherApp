import React, { useState } from 'react';
import { FormGroup, Modal } from 'react-bootstrap';

import CustomModal, { IModalProps } from '../modal/modal';
import Button from '../form/button';
import localizationConstants from 'shared/util/translation/constants';
import i18n from 'shared/util/localization';
import { string } from 'yup';

interface ICustomButtonsProps {
	type: 'default' | 'primary' | 'warning' | 'danger' | 'info' | undefined;
	callback: React.MouseEventHandler<any>;
	text: string;
	permission?: string[];
}
interface IConfirmComponentProps {
	message: string;
	handleConfirm: (reason?: string) => void;
	loading?: boolean;
	showReasonField?: boolean;
	reasonLabel?: string;
	submitBtnText?: string;
	cancelBtnText?: string;
	customButtons?: ICustomButtonsProps[];
}

const Confirm: React.FC<IModalProps & IConfirmComponentProps> = (props) => {
	const [reason, updateReason] = useState('');
	const [valid, setValid] = useState(true);
	const [loadingIndex, setLoadingIndex] = useState(-1);

	return (
		<CustomModal
			show={props.show}
			handleClose={props.handleClose}
			className={`${
				(!!props.customButtons && props.customButtons.length) > 0
					? 'confirm-wrapper-with-custom-buttons'
					: 'confirm-wrapper'
			} viral-confirm-modal`}
		>
			<div className='confirm-icon' data-testid='confirm-icon'>
				<i className='bx bxs-error-circle font--30px' />
				<h4 className='text-align-center m-0 ml-10 '>{props.message}</h4>
			</div>
			<br />
			{props.showReasonField && (
				<FormGroup
					className='d-flex align-items-center justify-content-center'
					style={{ flexDirection: 'column' }}
				>
					{/* {!!props.reasonLabel && <label htmlFor="block-reason" style={{ fontSize: '16px', marginBottom: '1rem' }}>{props.reasonLabel}</label>} */}
					<textarea
						style={{ resize: 'none', maxWidth: '100%' }}
						id='block-reason'
						value={reason || ''}
						onChange={(e) => {
							updateReason(e.target.value);
							setValid(string().required().isValidSync(e.target.value));
						}}
						className='form-control'
						placeholder={props.reasonLabel || i18n.t(localizationConstants.reason)}
						rows={3}
					/>
					{!valid && !reason && (
						<p className='error'>
							<>{i18n.t(localizationConstants.requiredFieldValidation, { field: i18n.t('reason') })}</>
						</p>
					)}
				</FormGroup>
			)}
			<Modal.Footer className='modal-footer-area text-align-center flex-center'>
				<Button
					type='button'
					btnType='primary'
					className='button-size--medium font--14px font-weight--500 line-height--20px mt-12 mr-13 height--40px'
					onClick={props.handleClose}
				>
					{props.cancelBtnText || localizationConstants.no}
				</Button>
				<Button
					className='button-size--medium font--14px font-weight--500 line-height--20px mt-12 height--40px  bg--purple color-white'
					btnType='default'
					loading={loadingIndex === -1 && props.loading}
					onClick={() => {
						setLoadingIndex(-1);
						if (!props.showReasonField) {
							props.handleConfirm(reason);
						} else {
							setValid(string().required().isValidSync(reason));
							valid && !!reason && props.handleConfirm(reason);
						}
					}}
				>
					{props.submitBtnText || localizationConstants.yes}
				</Button>
			</Modal.Footer>
		</CustomModal>
	);
};

export default Confirm;
