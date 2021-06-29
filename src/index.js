import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { changeCode, changeNumber } from './inputSlice';
import { loadList, pushNewPhone } from './listSlice';
import store from './store'
import configData from './config.json';

import 'react-phone-input-2/lib/style.css'
import './index.css'

const client = new W3CWebSocket('ws://127.0.0.1:3000');


const App = () => {
  const code = useSelector((state) => state.input.code);
  const number = useSelector((state) => state.input.number);
  const list = useSelector((state) => state.list.value);
  const dispatch = useDispatch();

  const [inputErrorStatus, setInputErrorStatus] = useState(false);

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);

      if (dataFromServer.list) {
        dispatch(loadList(dataFromServer.list));
      }

      console.log('got reply! ', dataFromServer);
      if (dataFromServer.newPhone) {
        dispatch(pushNewPhone(dataFromServer.newPhone));
      }
    };
  });

  const onButtonHandle = () => {
    if (number.length < 3) {
      return setInputErrorStatus(true);
    }

    client.send(JSON.stringify({
      type: "message",
      msg: code + number,
    }));

    dispatch(changeNumber(""));
  }


  return (
    <div className="main">
      <div>
        <header className="header">Websocket Phone List</header>
        <div className="inputs">
          <select name="code"
            className="select"
            value={code}
            onChange={e => dispatch(changeCode(e.currentTarget.value))}
          >
            {configData.COUNTRIES.map((country, ind) => (
              <option value={country.code}
                key={ind}
                selected={ind === 0 ? true : false}
              >{country.name}</option>
            ))}
          </select>
          <div className="tel">
            <input name="tel"
              type="text"
              value={number}
              onChange={e => {
                setInputErrorStatus(false);
                dispatch(changeNumber(e.target.value.replace(/\D+/, '')));
              }}
              maxLength={10}
              style={{ border: !inputErrorStatus ? '1px solid #858585' : '1px solid red' }}
            />
            {inputErrorStatus &&
              <p className="error">Номер не короче 3х символов</p>
            }
          </div>
          <button className="send" onClick={onButtonHandle}>Отправить на сервер</button>
        </div>
        <div className="container">
        <header className="header-list">Номера телефонов:</header>
          <ul className="list">
            {list.map((item, ind) => (
              <li key={ind}>{"+" + item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>  
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));