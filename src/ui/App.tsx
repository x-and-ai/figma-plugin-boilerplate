import React, { FC, useRef } from 'react';

import logo from './logo.svg';

const App: FC = () => {
  const countTextRef = useRef<HTMLInputElement>(null);
  const defaultCountValue = '3';

  const onCreate = (): void => {
    const count = parseInt(
      countTextRef.current ? countTextRef.current.value : defaultCountValue,
      10,
    );
    window.parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
  };

  const onCancel = (): void => {
    window.parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  return (
    <div>
      <img src={logo} alt="logo" />
      <h2>Rectangle Creator</h2>
      <p>
        Count: <input ref={countTextRef} defaultValue={defaultCountValue} />
      </p>
      <button className="button button--primary" id="create" type="button" onClick={onCreate}>
        Create
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default App;
