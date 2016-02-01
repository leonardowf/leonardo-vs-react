import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';

class WeatherList extends Component {
  constructor(props) {
    super(props);
  }

  renderWeather(cityData) {
    const name = cityData.city.name;
    const temperatures = cityData.list.map(weather => weather.main.temp);

    return (
      <tr key={ name }>
        <td>
          { name }
        </td>
        <td>
          <Sparklines height={120} width={180} data={temperatures}>
            <SparklinesLine color={'red'} />
          </Sparklines>
        </td>
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
