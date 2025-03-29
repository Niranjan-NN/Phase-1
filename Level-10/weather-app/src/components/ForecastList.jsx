const ForecastList = ({ weather }) => {
    if (!weather) return null;
  
    return (
      <div className="p-4 mt-4 bg-gray-100 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Next 5 Days Forecast</h2>
        <div className="grid grid-cols-2 gap-4">
          {weather.list.slice(0, 5).map((day, index) => (
            <div key={index} className="p-2 bg-white rounded shadow text-center">
              <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
              <p className="text-xl">{day.main.temp}°C</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ForecastList;
  