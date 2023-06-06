import React, { useEffect, useMemo, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Chart from './componet/chart';

const QUERY_URL = 'https://api.openweathermap.org/data/2.5/onecall?';

const API_OPTIONS = '&exclude=minutely,alerts&';
const TIME_NOW = new Date().getHours();

// Icons
let iconBaseUrl = 'http://openweathermap.org/img/wn/';
let iconFormat = '.png';

const Home = () => {
	const [data, setData] = useState(undefined);
	const [description, setDescription] = useState(undefined);
	const [temp, setTemp] = useState(undefined);
	const [pressure, setPressure] = useState(undefined);
	const [humidity, setHumidity] = useState(undefined);
	const [bgGif, setBGGif] = useState(undefined);
	const [iconsFullyUrl, seticonsFullyUrl] = useState({
		today: '',
		tomorrow: '',
		dAT: '',
		now: '',
		plus1: '',
		plus2: '',
		plus3: '',
		plus4: '',
		plus5: ''
	});
	const [cityName, setCityName] = useState('');
	const [location, setLocation] = useState({});
	const [searchData, setSearchData] = useState('');
	const [forecastData, setForecastData] = useState([]);

	useEffect(() => {
		getMyLocation();
	}, []);

	const getMyLocation = () => {
		const location = window.navigator && window.navigator.geolocation;

		if (location) {
			location.getCurrentPosition(
				(position) => {
					console.log('position:', position);

					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					});
					getData(`lat=${position.coords.latitude}&`, `lon=${position.coords.longitude}&`);
					getLocationName(`lat=${position.coords.latitude}&`, `lon=${position.coords.longitude}&`);
					getForcast(position.coords.latitude, position.coords.longitude);
				},
				(error) => {
					// setLocation({ latitude: 'lat=52.229676&', longitude: 'lon=21.012229&' });
					console.log('error:', error);
				}
			);
		}
	};

	const getData = (lat: any, lon: any) => {
		const FILE = QUERY_URL + `${lat}` + `${lon}` + API_OPTIONS + process.env.REACT_APP_API_KEY;

		fetch(FILE)
			.then((res) => res.json())
			.then((data) => {
				// console.log('data:', data);
				setData(data);
				setDescription(data.current.weather[0].description);
				setTemp(Math.round(data.current.temp));
				setPressure(data.current.pressure);
				setHumidity(data.current.humidity);

				const main = data.current.weather[0].main;
				seticonsFullyUrl({
					today: iconBaseUrl + data?.current.weather[0].icon + iconFormat,
					tomorrow: iconBaseUrl + data?.daily[0].weather[0].icon + iconFormat,
					dAT: iconBaseUrl + data?.daily[1].weather[0].icon + iconFormat,
					now: iconBaseUrl + data.daily[1].weather[0].icon + iconFormat,
					plus1: iconBaseUrl + data.hourly[1].weather[0].icon + iconFormat,
					plus2: iconBaseUrl + data.hourly[2].weather[0].icon + iconFormat,
					plus3: iconBaseUrl + data.hourly[3].weather[0].icon + iconFormat,
					plus4: iconBaseUrl + data.hourly[4].weather[0].icon + iconFormat,
					plus5: iconBaseUrl + data.hourly[5].weather[0].icon + iconFormat
				});

				switch (main) {
					case 'Snow':
						setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')");
						break;
					case 'Clouds':
						setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')");
						break;
					case 'Fog':
						setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')");
						break;
					case 'Rain':
						setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')");
						break;
					case 'Clear':
						setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')");
						break;
					case 'Thunderstorm':
						setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')");
						break;
					default:
						setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')");
						break;
				}
			});
	};
	const getLocationName = (lat: any, lon: any) => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?${lat}${lon}appid=${process.env.REACT_APP_GEO_LOCATION_KEY}&units=metric`
		)
			.then((res) => res.json())
			.then((data) => {
				setCityName(data.name);
			});
	};
	const handelcity = () => {
		fetch(
			`https://api.openweathermap.org/geo/1.0/direct?q=${searchData}&appid=${process.env.REACT_APP_GEO_LOCATION_KEY}&units=metric`
		)
			.then((res) => res.json())

			.then((data) => {
				console.log('data:', data[0]);
				getData(`lat=${data[0].lat}&`, `lon=${data[0].lon}&`);
				getForcast(data[0].lat, data[0].lon);
				setCityName(data[0].name);
			});
	};
	const getForcast = (latitude: any, longitude: any) => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&${process.env.REACT_APP_API_KEY}`
		)
			.then((res) => res.json())

			.then((data) => {
				setForecastData(data.list);
			});
	};

	return (
		<div className='waether-section'>
			{data && (
				<div className='waether-wrapper'>
					<div className=' mb-3  d-flex  justify-content-end ml-2 search-bar'>
						<div>
							<input
								className=' search-input'
								placeholder='Search.....'
								onChange={(e) => {
									setSearchData(e.target.value);
								}}
							/>
						</div>
						<button type='submit' className='btn btn-primary' onClick={handelcity}>
							<i className='fas fa-search'></i>
						</button>
					</div>
					<div className='d-flex  waether-wrapper-div'>
						<section className='half-width 	'>
							<MDBContainer className='h-100'>
								<MDBRow className='justify-content-center align-items-center h-100'>
									<MDBCol md='12' lg='12' xl='6'>
										<MDBCard
											className='text-white bg-image shadow-4-strong'
											style={{
												backgroundImage:
													bgGif ??
													'url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)'
											}}
										>
											<MDBCardHeader className='p-4 border-0'>
												<div className='text-center mb-3'>
													<p className='h2 mb-1'>{cityName}</p>
													<p className='mb-1'>{description}</p>
													<p className='display-1 mb-1'>{(temp - 273.15).toFixed(2)}°C</p>
													<span className=''>Pressure: {pressure}</span>
													<span className='mx-2'>|</span>
													<span className=''>Humidity: {humidity}%</span>
												</div>
											</MDBCardHeader>

											<MDBCardBody className='p-4 border-top border-bottom mb-2'>
												<MDBRow className='text-center'>
													<MDBCol size='2'>
														<strong className='d-block mb-2'>Now</strong>
														<img src={iconsFullyUrl.now} className='' alt='' />
														<strong className='d-block'>{data?.hourly[0].temp}°</strong>
													</MDBCol>

													<MDBCol size='2'>
														<strong className='d-block mb-2'>{TIME_NOW + 1}</strong>
														<img src={iconsFullyUrl.plus1} className='' alt='' />
														<strong className='d-block'>{data?.hourly[1].temp}°</strong>
													</MDBCol>

													<MDBCol size='2'>
														<strong className='d-block mb-2'>{TIME_NOW + 2}</strong>
														<img src={iconsFullyUrl.plus2} className='' alt='' />
														<strong className='d-block'>{data?.hourly[2].temp}°</strong>
													</MDBCol>

													<MDBCol size='2'>
														<strong className='d-block mb-2'>{TIME_NOW + 3}</strong>
														<img src={iconsFullyUrl.plus3} className='' alt='' />
														<strong className='d-block'>{data?.hourly[3].temp}°</strong>
													</MDBCol>

													<MDBCol size='2'>
														<strong className='d-block mb-2'>{TIME_NOW + 4}</strong>
														<img src={iconsFullyUrl.plus4} className='' alt='' />
														<strong className='d-block'>{data?.hourly[4].temp}°</strong>
													</MDBCol>

													<MDBCol size='2'>
														<strong className='d-block mb-2'>{TIME_NOW + 5}</strong>
														<img src={iconsFullyUrl.plus5} className='' alt='' />
														<strong className='d-block'>{data?.hourly[5].temp}°</strong>
													</MDBCol>
												</MDBRow>
											</MDBCardBody>

											<MDBCardBody className='px-5'>
												<MDBRow className='align-items-center'>
													<MDBCol lg='5'>
														<strong>Today</strong>
													</MDBCol>

													<MDBCol lg='2' className='text-center'>
														<img className='w-100' src={iconsFullyUrl.today} alt='' />
													</MDBCol>

													<MDBCol lg='3' className='text-end'>
														{temp}°
													</MDBCol>
												</MDBRow>

												<MDBRow className='align-items-center'>
													<MDBCol lg='5'>
														<strong>Tomorrow</strong>
													</MDBCol>

													<MDBCol lg='2' className='text-center'>
														<img className='w-100' src={iconsFullyUrl.tomorrow} alt='' />
													</MDBCol>

													<MDBCol lg='3' className='text-end'>
														{Math.round(data?.daily[0].temp.day) ?? undefined}°
													</MDBCol>
												</MDBRow>

												<MDBRow className='align-items-center'>
													<MDBCol lg='5'>
														<strong>Day after tommorow</strong>
													</MDBCol>

													<MDBCol lg='2' className='text-center'>
														<img className='w-100' src={iconsFullyUrl.dAT} alt='' />
													</MDBCol>

													<MDBCol lg='3' className='text-end'>
														{Math.round(data?.daily[1].temp.day) ?? undefined}°
													</MDBCol>
												</MDBRow>
											</MDBCardBody>
										</MDBCard>
									</MDBCol>
								</MDBRow>
							</MDBContainer>
						</section>
						<section className='half-width 	'>
							<Chart forecastData={forecastData} />
						</section>
					</div>
				</div>
			)}
		</div>
	);
};
export default Home;
