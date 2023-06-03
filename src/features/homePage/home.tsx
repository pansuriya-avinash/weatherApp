import React, { useEffect, useMemo, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HttpService from 'shared/services/http.service';

const QUERY_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const LAT = 'lat=52.229676&';
const LON = 'lon=21.012229&';
const API_OPTIONS = 'units=metric&exclude=minutely,alerts&';
const API_KEY = 'appid=dbb76c5d98d5dbafcb94441c6a10236e';
const apiKey = 'f3691b18a7a9f34109b9d2f634be83aa';
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
	const [location, setLocation] = useState({ latitude: '', longitude: '' });
	useEffect(() => {
		getMyLocation();
	}, []);
	// const FILE = QUERY_URL + `${location.latitude}` + `${location.longitude}` + API_OPTIONS + API_KEY;

	// useEffect(() => {
	// 	const FILE = QUERY_URL + `${location.latitude}` + `${location.longitude}` + API_OPTIONS + API_KEY;
	// 	getLocationName();

	// 	fetch(FILE)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			// console.log('data:', data);
	// 			setData(data);
	// 			setDescription(data.current.weather[0].description);
	// 			setTemp(Math.round(data.current.temp));
	// 			setPressure(data.current.pressure);
	// 			setHumidity(data.current.humidity);

	// 			const main = data.current.weather[0].main;
	// 			seticonsFullyUrl({
	// 				today: iconBaseUrl + data?.current.weather[0].icon + iconFormat,
	// 				tomorrow: iconBaseUrl + data?.daily[0].weather[0].icon + iconFormat,
	// 				dAT: iconBaseUrl + data?.daily[1].weather[0].icon + iconFormat,
	// 				now: iconBaseUrl + data.daily[1].weather[0].icon + iconFormat,
	// 				plus1: iconBaseUrl + data.hourly[1].weather[0].icon + iconFormat,
	// 				plus2: iconBaseUrl + data.hourly[2].weather[0].icon + iconFormat,
	// 				plus3: iconBaseUrl + data.hourly[3].weather[0].icon + iconFormat,
	// 				plus4: iconBaseUrl + data.hourly[4].weather[0].icon + iconFormat,
	// 				plus5: iconBaseUrl + data.hourly[5].weather[0].icon + iconFormat
	// 			});

	// 			switch (main) {
	// 				case 'Snow':
	// 					setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')");
	// 					break;
	// 				case 'Clouds':
	// 					setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')");
	// 					break;
	// 				case 'Fog':
	// 					setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')");
	// 					break;
	// 				case 'Rain':
	// 					setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')");
	// 					break;
	// 				case 'Clear':
	// 					setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')");
	// 					break;
	// 				case 'Thunderstorm':
	// 					setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')");
	// 					break;
	// 				default:
	// 					setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')");
	// 					break;
	// 			}
	// 		});
	// }, [location]);
	// useEffect(() => {
	// 	if (data) {
	// 		seticonsFullyUrl({
	// 			today: iconBaseUrl + data?.current.weather[0].icon + iconFormat,
	// 			tomorrow: iconBaseUrl + data?.daily[0].weather[0].icon + iconFormat,
	// 			dAT: iconBaseUrl + data?.daily[1].weather[0].icon + iconFormat,
	// 			now: iconBaseUrl + data.daily[1].weather[0].icon + iconFormat,
	// 			plus1: iconBaseUrl + data.hourly[1].weather[0].icon + iconFormat,
	// 			plus2: iconBaseUrl + data.hourly[2].weather[0].icon + iconFormat,
	// 			plus3: iconBaseUrl + data.hourly[3].weather[0].icon + iconFormat,
	// 			plus4: iconBaseUrl + data.hourly[4].weather[0].icon + iconFormat,
	// 			plus5: iconBaseUrl + data.hourly[5].weather[0].icon + iconFormat
	// 		});
	// 	}
	// }, [data]);

	const getMyLocation = () => {
		const location = window.navigator && window.navigator.geolocation;

		if (location) {
			location.getCurrentPosition(
				(position) => {
					console.log('position:', position);

					setLocation({
						latitude: `lat=${position.coords.latitude}&`,
						longitude: `lon=${position.coords.longitude}&`
					});
					getData(`lat=${position.coords.latitude}&`, `lon=${position.coords.longitude}&`);
					getLocationName(`lat=${position.coords.latitude}&`, `lon=${position.coords.longitude}&`);
				},
				(error) => {
					// setLocation({ latitude: 'lat=52.229676&', longitude: 'lon=21.012229&' });
					console.log('error:', error);
				}
			);
		}
	};

	const getData = (lat: any, lon: any) => {
		const FILE = QUERY_URL + `${lat}` + `${lon}` + API_OPTIONS + API_KEY;

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
		fetch(`https://api.openweathermap.org/data/2.5/weather?${lat}${lon}appid=${apiKey}&units=metric`)
			.then((res) => res.json())
			.then((data) => {
				console.log('data:', data.name);
				setCityName(data.name);
			});
	};
	const handelcity = (e) => {
		console.log('e:', e);
	};

	return (
		<div className='container-xxl'>
			{data && (
				<section className='vh-100'>
					<div className='input-group mb-3 mt-3 d-flex  justify-content-end ml-2' onSubmit={handelcity}>
						<div className='form-outline search-bar'>
							<input id='search-focus' type='search' itemID='form1' className='form-control' />
							<label className='form-label' htmlFor='form1'>
								Search
							</label>
						</div>
						<button type='button' className='btn btn-primary'>
							<i className='fas fa-search'></i>
						</button>
					</div>
					<MDBContainer className='h-100'>
						<MDBRow className='justify-content-center align-items-center h-100'>
							<MDBCol md='9' lg='7' xl='5'>
								<MDBCard
									className='text-white bg-image shadow-4-strong'
									style={{
										backgroundImage:
											bgGif ?? 'url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)'
									}}
								>
									<MDBCardHeader className='p-4 border-0'>
										<div className='text-center mb-3'>
											<p className='h2 mb-1'>{cityName}</p>
											<p className='mb-1'>{description}</p>
											<p className='display-1 mb-1'>{temp}°C</p>
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
			)}
		</div>
	);
};
export default Home;
