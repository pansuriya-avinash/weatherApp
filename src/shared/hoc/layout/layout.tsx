import { PropsWithChildren } from 'react';
import Header from 'shared/components/navigation/header';

const Layout: React.FC<PropsWithChildren> = (props) => {
	return (
		<div id='wrapper'>
			<div id='page-wrapper' className='full--width'>
			<div className='page-container'>
					<Header />
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
