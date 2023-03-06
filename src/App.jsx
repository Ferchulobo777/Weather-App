import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityList from './components/CityList';
import nubes from '../src/video/nubes.mp4';

function App() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  useEffect(() => {
    const successCallback = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ latitude, longitude });
    };

    const errorCallback = (error) => {
      console.error(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);
  useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
      const apiKey = 'a1d9b60b16ca2b74fcd41493f649ab8e';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;

      axios.get(url).then((response) => {
        const country = response.data.sys.country;
        const city = response.data.name;
        const icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        const description = response.data.weather[0].description;
        const temperature = response.data.main.temp;
        const temp_min = response.data.main.temp_min;
        const temp_max = response.data.main.temp_max;
        const wind_speed = response.data.wind.speed;
        const humidity = response.data.main.humidity;
        const feels_like = response.data.main.feels_like;

        setWeatherData({
          country,
          city,
          icon,
          description,
          temperature,
          unit: 'C',
          temp_min,
          temp_max,
          wind_speed,
          humidity,
          feels_like,
        });
      });
    }
  }, [location]);
  const [weatherData, setWeatherData] = useState({
    country: '',
    city: '',
    icon: '',
    description: '',
    temperature: '',
    unit: 'C',
    temp_min: '',
    temp_max: '',
    wind_speed: '',
    humidity: '',
    feels_like: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [cityList, setCityList] = useState([]);

  ///CAMBIA LA UNIDAD DE LA TEMPERATURA///
  const toggleTemperatureUnit = () => {
    const newUnit = weatherData.unit === 'C' ? 'F' : 'C';
    let newTemperature;

    if (newUnit === 'C') {
      newTemperature = ((weatherData.temperature - 32) * 5) / 9;
    } else {
      newTemperature = (weatherData.temperature * 9) / 5 + 32;
    }

    // REDONDEA A DOS DECIMALES//
    newTemperature = Math.round(newTemperature * 100) / 100;

    setWeatherData({ ...weatherData, temperature: newTemperature, unit: newUnit });
  };
    ///BUSCA EL CLIMA ACTUAL DE UNA CIUDAD DETERMINADA POR EL USUARIO///
    const handleSearch = async (e) => {
      e.preventDefault();
      setSearchTerm(e.target.elements.search.value);
    
      if (location.latitude && location.longitude) {
        const apiKey = 'a1d9b60b16ca2b74fcd41493f649ab8e';
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;
    
        if (searchTerm !== '') {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`;
        }
    
        try {
          const response = await axios.get(url);
          const country = response.data.sys.country;
          const city = response.data.name;
          const icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
          const description = response.data.weather[0].description;
          const temperature = response.data.main.temp;
          const temp_min = response.data.main.temp_min;
          const temp_max = response.data.main.temp_max;
          const wind_speed = response.data.wind.speed;
          const humidity = response.data.main.humidity;
          const feels_like = response.data.main.feels_like;
    
          setWeatherData({
            country,
            city,
            icon,
            description,
            temperature,
            unit: 'C',
            temp_min,
            temp_max,
            wind_speed,
            humidity,
            feels_like,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
///AGREGA A LA LISTA DE CIUDADES//
  const handleAddToList = () => {
    setCityList([...cityList, weatherData]);
  };
///BORRA DE LA LISTA DE CIUDADES//
  const handleDeleteCity = (cityIndex) => {
    const newCityList = [...cityList];
    newCityList.splice(cityIndex, 1);
    setCityList(newCityList);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center relative xl:ml-96 2xl:mx-96 lg:ml-96 md:ml-60 sm:mx-12 min-[400px]:mx-12 min-[380px]:mx-8 md:w-full md:relative md:right-10">
    <video autoPlay loop muted className="fixed inset-0 w-full h-full z-0 object-cover">
      <source src={nubes} type="video/mp4" />
    </video>
    <div className="container mx-auto pt-4 relative z-10">
      <form onSubmit={handleSearch} className="mb-4 relative xl:ml-24 2xl:ml-36 lg:ml-20 md:mr-8 sm:ml-32 ">
        <input type="text" name="search" placeholder="Buscar una ciudad" className=" h-10 rounded-l-lg py-2 px-4 text-slate-900 font-semibold bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm xl:w-2/5 min-[380px]:w-3/5 xl:relative xl:right-24 sm:relative sm:right-32 sm:w-4/5 md:w-2/5 lg:w-2/6 lg:relative lg:right-16 placeholder:font-semibold placeholder:text-slate-300" />
        <button type="submit" className="px-4 bg-blue-500 h-10 md:w-30 text-white font-black rounded-r-lg border border-blue-500 hover:bg-blue-700 min min-[380px]:w-1/3 xl:w-1/6 xl:relative xl:right-24 sm:w-1/5 sm:relative sm:right-32 lg:w-2/12 lg:relative lg:right-16">
          Buscar
        </button>
      </form>
      {weatherData.city && (
        <div className="bg-white bg-opacity-20 w-full md:w-2/4 backdrop-filter backdrop-blur-sm p-4 rounded-md md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {weatherData.city}, {weatherData.country}
              </h2>
              <p className="text-lg md:text-xl mt-2 text-black font-bold">{weatherData.description}</p>
            </div>
            <div>
              <img src={weatherData.icon} alt={weatherData.description} className="h-20 md:h-24" />
              <p className="text-4xl font-extrabold mt-2 text-red-400">
                {weatherData.temperature}°{weatherData.unit}
              </p>
              <p className='font-semibold text-blue-700'>Mínima: {weatherData.temp_min}°{weatherData.unit}</p>
              <p className='font-semibold text-red-600'>Máxima: {weatherData.temp_max}°{weatherData.unit}</p>
              <p className='font-semibold text-green-500'>Vientos: {weatherData.wind_speed} km/h</p>
              <p className='font-semibold text-cyan-400'>Humedad: {weatherData.humidity}%</p>
              <p className='font-semibold text-orange-500'>Sensación térmica: {weatherData.feels_like}°{weatherData.unit}</p>
              <button onClick={toggleTemperatureUnit} className="text-sm font-medium min-[380px]:ml-8 hover:transform hover:scale-125 text-lg font-bold bg-blue-500 hover:bg-blue-700 text-white rounded-lg w-28 h-10 mt-2 min-[380px]:relative min-[380px]:left-0 ">
                Switch °{weatherData.unit}
              </button>
            </div>
          </div>
          <button onClick={handleAddToList} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg border border-blue-500 hover:bg-blue-700 font-bold focus:bg-blue-700 sm:ml-44 min-[400px]:ml-16 xl:ml-32 min-[380px]:ml-16 hover:transform hover:scale-125 md:relative md:right-20 lg:relative lg:right-4 xl:relative xl:right-28 min-[380px]:relative min-[380px]:right-1">
            Agregar a la lista
          </button>
        </div>
      )}
      <CityList cityList={cityList} onDeleteCity={handleDeleteCity} />
    </div>
  </div>
);
}

export default App;