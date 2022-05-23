import React from 'react';

import ReactDOM from 'react-dom/client';

import TwoPiRest from '../../lib/dist';

const elem = document.getElementById("App") as HTMLElement;
if (elem) {
  const root = ReactDOM.createRoot(elem);
  root.render(
    <React.StrictMode>
      <TwoPiRest />
    </React.StrictMode>
  );
}
