import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

function loadScript(url) {
  if (!document.querySelector(`script[src="${url}"]`)) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}

const API_KEY = 'AIzaSyBcK4Zz2W_loxS4kmS5KZ2iujrHdN9WMvE';
const CALLBACK_NAME = 'initMap';

if (!window.google) {
  window[CALLBACK_NAME] = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
    serviceWorker.register();
  };
  
  loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`);
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
  serviceWorker.register();
}
