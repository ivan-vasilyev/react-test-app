import React, { Component } from 'react';
import InputColor from './components/InputColor';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderInputColor = this.renderInputColor.bind(this);

    this.state = {
      colors: {
        first: {
          label: 'Цвет №1',
          value: ''
        },
        second: {
          label: 'Цвет №2',
          value: ''
        }
      },
      style: {
        background: 'linear-gradient(#ffffff, #ff9900)'
      },
      errors: {}
    }
  }

  handleChange(e) {
    const colors = Object.assign({}, this.state.colors, {
      [e.target.name]: {
        value: e.target.value.trim(),
        label: e.target.placeholder
      }
    });
    this.setState(Object.assign({}, this.state, { colors }));
  }

  renderInputColor(name, color, error) {
    return <InputColor
      label={color.label}
      name={name}
      key={color.label}
      value={color.value}
      error={error}
      onChange={this.handleChange}
    />
  }

  validate(colors) {
    this.setState(Object.assign({}, this.state, { errors: {} }));

    let errors = {};

    Object.keys(colors).forEach(name => {
      const value = colors[name].value;
      const regColor = /^#[a-zA-Z0-9]{3,6}/;
      if (!regColor.test(value)) {
        errors[name] = 'Код цвета должен начинаться с символа # и содержать от 3 до 6 букв или цифр.';
      }

      if (value.length !== 4 && value.length !== 7) {
        errors[name] = 'Неверный формат цвета. Введите цвет в формате #XXXXXX';
      }

      if (!value.startsWith('#')) {
        errors[name] = 'Цвет должен начинаться с #.';
      }

      if (value === '') {
        errors[name] = 'Поле не должно быть пустым.';
      }
    });

    if (Object.keys(errors).length === 0) {
      return true;
    }

    this.setState(Object.assign({}, this.state, {
      errors
    }));
    return false;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validate(this.state.colors)) {
      return;
    };

    const { first, second } = this.state.colors;
    this.setState(Object.assign({}, this.state, {
      style: {
        background: `linear-gradient(${first.value}, ${second.value})`
      },
      errors: {}
    }));
  }

  render() {
    const { style, colors, errors } = this.state;

    return (
      <div className="container-fluid" style={style}>
        <div className="row">
          <div className="col-md-12">
            <form className="form-signin" onSubmit={this.handleSubmit}>
              <h3 className="form-signin-heading">Введите цвет в формате #XXXXXX</h3>
              {Object.keys(colors).map(name => this.renderInputColor(name, colors[name], errors[name]))}
              <button className="btn btn-lg btn-success btn-block" type="submit">GO!</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
