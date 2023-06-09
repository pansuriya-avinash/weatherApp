import React, { useEffect, useMemo, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Chart from './componet/chart';
import { ToastContainer, toast } from 'react-toastify';

import Clouds from '../../assets/images/Clouds.gif';
import Fog from '../../assets/images/fog.gif';
import Rain from '../../assets/images/rain.gif';
import Clear from '../../assets/images/clear.gif';
import Thunderstorm from '../../assets/images/Thunderstorm.gif';

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
	const [bgGif, setBGGif] = useState({ cardBackground: '', appBackground: '' });
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
		getData();
		// getMyLocation();
		getLocationName();
		getForcast();
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
					getData(position.coords.latitude, position.coords.longitude);
					getLocationName(position.coords.latitude, position.coords.longitude);
					getForcast(position.coords.latitude, position.coords.longitude);
				},
				(error) => {
					// setLocation({ latitude: 'lat=52.229676&', longitude: 'lon=21.012229&' });
					console.log('error:', error);
				}
			);
		}
	};

	const getData = (lat?: any, lon?: any) => {
		const latitude = lat ? lat : 28.6517178;
		const longitude = lon ? lon : 77.2219388;
		const FILE = QUERY_URL + `lat=${latitude}&` + `lon=${longitude}&` + API_OPTIONS + process.env.REACT_APP_API_KEY;

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
						setBGGif({
							cardBackground: "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')",
							appBackground: "url('https://media.tenor.com/hy3P2YB4ocAAAAAC/bonne-nuit.gif')"
						});
						break;
					case 'Clouds':
						setBGGif({
							cardBackground: "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')",
							appBackground:
								"url('https://i.pinimg.com/originals/85/db/41/85db411e5bebff00b8a21f6d29d8c394.gif')"
						});
						break;
					case 'Fog':
						setBGGif({
							cardBackground: "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')",
							appBackground: "url('https://media.tenor.com/5ImWLS5QAJgAAAAC/foggy-fog.gif')"
						});
						break;
					case 'Rain':
						setBGGif({
							cardBackground: "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')",
							appBackground: "url('https://giffiles.alphacoders.com/105/105451.gif')"
						});
						break;
					case 'Clear':
						setBGGif({
							cardBackground: "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')",
							appBackground:
								"url('https://i.pinimg.com/originals/63/e5/45/63e545d079b27feee41103aa014a3ea5.gif')"
						});
						break;
					case 'Thunderstorm':
						setBGGif({
							cardBackground: "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')",
							appBackground: "url('https://media.tenor.com/6de-2dIt8RsAAAAM/storm-coming.gif')"
						});
						break;
					default:
						setBGGif({
							cardBackground: "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')",
							appBackground:
								"url('https://i.pinimg.com/originals/63/e5/45/63e545d079b27feee41103aa014a3ea5.gif')"
						});
						break;
				}
			});
	};
	const getLocationName = (lat?: any, lon?: any) => {
		const latitude = lat ? lat : 28.6517178;
		const longitude = lon ? lon : 77.2219388;
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_GEO_LOCATION_KEY}&units=metric`
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
				console.log('object', data.cod);
				if (data.cod >= 400) {
					toast.error(`can not found city`, {
						position: toast.POSITION.BOTTOM_RIGHT
					});
				}
				getData(data[0].lat, data[0].lon);
				getForcast(data[0].lat, data[0].lon);
				setCityName(data[0].name);
			});
	};
	const getForcast = (lat?: any, lon?: any) => {
		const latitude = lat ? lat : 28.6517178;
		const longitude = lon ? lon : 77.2219388;
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&${process.env.REACT_APP_API_KEY}`
		)
			.then((res) => res.json())

			.then((data) => {
				setForecastData(data.list);
			});
	};
	const handelcurrentLocation = () => {
		getMyLocation();
	};

	return (
		<div className='waether-section'>
			{data && (
				<div
					className='waether-wrapper'
					style={{
						background: bgGif.appBackground ?? 'url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)'
					}}
				>
					<div className='background-opacity'>
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
							<button type='submit' className='btn btn-primary mr-5' onClick={handelcity}>
								<i className='fas fa-search'></i>
							</button>
							<button className='btn btn-primary ml-5' onClick={handelcurrentLocation}>
								<i className='fa fa-map-marker' aria-hidden='true' />
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
														bgGif.cardBackground ??
														'url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)'
												}}
											>
												<MDBCardHeader className='p-4 border-0'>
													<div className='text-center mb-3'>
														<p className='h2 mb-1'>{cityName}</p>
														<p className='mb-1'>{description}</p>
														<p className='display-1 mb-1'>{(temp - 273.15).toFixed(0)}°C</p>
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
															<strong className='d-block'>
																{(data?.hourly[0].temp - 273.15).toFixed(2)}°
															</strong>
														</MDBCol>

														<MDBCol size='2'>
															<strong className='d-block mb-2'>{TIME_NOW + 1}</strong>
															<img src={iconsFullyUrl.plus1} className='' alt='' />
															<strong className='d-block'>
																{(data?.hourly[1].temp - 273.15).toFixed(2)}°
															</strong>
														</MDBCol>

														<MDBCol size='2'>
															<strong className='d-block mb-2'>{TIME_NOW + 2}</strong>
															<img src={iconsFullyUrl.plus2} className='' alt='' />
															<strong className='d-block'>
																{(data?.hourly[2].temp - 273.15).toFixed(2)}°
															</strong>
														</MDBCol>

														<MDBCol size='2'>
															<strong className='d-block mb-2'>{TIME_NOW + 3}</strong>
															<img src={iconsFullyUrl.plus3} className='' alt='' />
															<strong className='d-block'>
																{(data?.hourly[3].temp - 273.15).toFixed(2)}°
															</strong>
														</MDBCol>

														<MDBCol size='2'>
															<strong className='d-block mb-2'>{TIME_NOW + 4}</strong>
															<img src={iconsFullyUrl.plus4} className='' alt='' />
															<strong className='d-block'>
																{(data?.hourly[4].temp - 273.15).toFixed(2)}°
															</strong>
														</MDBCol>

														<MDBCol size='2'>
															<strong className='d-block mb-2'>{TIME_NOW + 5}</strong>
															<img src={iconsFullyUrl.plus5} className='' alt='' />
															<strong className='d-block'>
																{(data?.hourly[5].temp - 273.15).toFixed(2)}°
															</strong>
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
															{(temp - 273.15).toFixed(2)}°
														</MDBCol>
													</MDBRow>

													<MDBRow className='align-items-center'>
														<MDBCol lg='5'>
															<strong>Tomorrow</strong>
														</MDBCol>

														<MDBCol lg='2' className='text-center'>
															<img
																className='w-100'
																src={iconsFullyUrl.tomorrow}
																alt=''
															/>
														</MDBCol>

														<MDBCol lg='3' className='text-end'>
															{(Math.round(data?.daily[0].temp.day) - 273.15).toFixed(
																2
															) ?? undefined}
															°
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
															{(Math.round(data?.daily[1].temp.day) - 273.15).toFixed(
																2
															) ?? undefined}
															°
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
						<ToastContainer />
					</div>
				</div>
			)}
		</div>
	);
};
export default Home;
