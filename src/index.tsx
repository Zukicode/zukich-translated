import ReactDOM from 'react-dom/client';

import 'styles/index.scss';

import { App } from 'components/App/App';

import { store } from 'features/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
