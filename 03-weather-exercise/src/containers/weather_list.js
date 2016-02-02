import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  constructor(props) {
    super(props);
  }

  renderWeather(cityData) {
    const name = cityData.city.name;
    const temperatures = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={ name }>
        <td>
          <GoogleMap lon={lon} lat={lat} />
        </td>
        <td><Chart color={'red'} data={temperatures}/></td>
        <td><Chart color={'green'} data={pressures}/></td>
        <td><Chart color={'orange'} data={humidities}/></td>
      </tr>
    );

  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Cidade</th>
            <th>Temperatura</th>
            <th>Pressão</th>
            <th>Umidade</th>
          </tr>
        </thead>
        <tbody>
          { this.props.weather.map(this.renderWeather) }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather }; // EM ES6 é o mesmo que escrever { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);
