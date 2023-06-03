import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from '../translate';
import localizationConstants from 'shared/util/translation/constants';

const NotFound: React.FC = () => {
	return (
		<div className='middle-box text-center animated fadeInDown'>
			<h1>404</h1>
			<h3 className='font-bold'>
				<Translate text={localizationConstants.pageNotFound} />
			</h3>

			<div className='error-desc'>
				<Translate text={localizationConstants.notFoundMsg} />
				<form className='form-inline m-t'>
					<Link to='/'>
						<button type='submit' className='btn btn-primary'>
							<Translate text={localizationConstants.home} />
						</button>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default NotFound;
