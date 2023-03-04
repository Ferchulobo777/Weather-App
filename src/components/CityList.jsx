import React from 'react';
import PropTypes from 'prop-types';

function CityList({ cityList, onDeleteCity }) {
  return (
    <div className='grid grid-cols-1 grid-rows-2'>
      <div>
        <h2 className='w-36 h-10 mt-2 mb-2 bg-blue-500 text-white font-semibold rounded-lg border border-blue-500 hover:bg-blue-700 font-bold focus:bg-blue-700 cursor-pointer flex items-center justify-center xl:ml-40 2xl:ml-60 lg:ml-36 md:ml-16 sm:ml-52 min-[400px]:ml-20'>Lista de Ciudades</h2>
        <ul>
          {cityList.map((city, index) => (
            <li key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-4 rounded-md shadow-xl mb-2 flex flex-col md:w-2/4 md:h-1/2">
              <div>
                <strong>{city.city}, {city.country}</strong>
                <button className="bg-red-500 bg-opacity-80  w-16 backdrop-filter backdrop-blur-md p-1 rounded-md shadow-md hover:bg-red-600 text-white hover:text-black flex float-right font-bold focus:bg-red-700" onClick={() => onDeleteCity(index)}>Borrar</button>
              </div>
              <div className="flex items-center">
                <img className="w-10 h-10" src={city.icon} alt={city.description} />
                <span className="ml-4 text-lg text-black font-bold">{city.temperature}&deg;{city.unit}</span>
                <span className="ml-4 text-lg text-black font-bold">{city.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

CityList.propTypes = {
  cityList: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      unit: PropTypes.oneOf(['C', 'F']).isRequired,
    })
  ).isRequired,
  onDeleteCity: PropTypes.func.isRequired,
};

export default CityList;