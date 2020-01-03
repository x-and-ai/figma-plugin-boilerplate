import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { registerLogger } from '../lib/logger';

registerLogger('UI');

logD('Sample debug log');
logI('Sample info log');
logW('Sample warning log');
logE('Sample error log');

ReactDOM.render(<App />, document.getElementById('plugin-container'));
