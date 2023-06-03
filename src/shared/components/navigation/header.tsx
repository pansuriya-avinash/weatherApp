import { Logo, Search } from 'shared/icons/icons';

const Header = () => {
	return (
		<div className='header-container'>
			<div className='header-details'>
				<div className='header-logo'>
					<Logo />
				</div>
				<div className='header-links'>
					<a className='active' href=''>
						Home
					</a>
					<a className='link' href=''>
						Canvas
					</a>
					<a className='link' href=''>
						About Us
					</a>
					<a className='link' href=''>
						Contact Us
					</a>
				</div>
			</div>
			<div className='header-btns'>
				<div className='header-search-bar'>
					<input type='text' placeholder='Search' />
					<Search className='search-icon' />
				</div>
				<button className='header-sign-up-btn' type='button'>
					Sign Up
				</button>
				<button className='header-login-btn' type='button'>
					Login
				</button>
			</div>
		</div>
	);
};
export default Header;
