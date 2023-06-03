import React, { PropsWithChildren } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'shared/components/form/button';
import { Translate } from '../translate';
import { CloseIcon } from 'shared/icons/icons';

export interface IModalProps extends PropsWithChildren {
	show: boolean;
	handleClose: () => void | undefined;
	className?: string;
	modalTitle?: string;
	modalTitle2?: string | JSX.Element;
	modalTitle3?: string | JSX.Element;
	dataTestId?: string;
	footer?: JSX.Element | boolean;
	loading?: boolean;
	restrictCloseOnEscape?: boolean;
	closeOnOutSideClick?: boolean;
}

const CustomModal: React.FC<IModalProps> = (props) => {
	return (
		<Modal
			show={props.show}
			onHide={() => (props.closeOnOutSideClick ? props.handleClose() : false)}
			onEscapeKeyDown={props.handleClose}
			className={`${props.className || ''} fadeIn `}
			keyboard={!props.restrictCloseOnEscape ?? true}
		>
			{props.modalTitle ? (
				<Modal.Header closeButton>
					<Modal.Title>
						<Translate text={props.modalTitle} />
						&nbsp;&nbsp;{props.modalTitle2}
						{props.modalTitle3}
					</Modal.Title>
				</Modal.Header>
			) : (
				<Button className='modal-close-btn' onClick={props.handleClose}>
					<span>
						<CloseIcon />
					</span>
					<span className='sr-only'>{/* <Translate text={localizationConstants.close} /> */}</span>
				</Button>
			)}
			<Modal.Body>{props.children}</Modal.Body>
			{!!props.footer && <Modal.Footer>{props.footer}</Modal.Footer>}
		</Modal>
	);
};

export default CustomModal;
