import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<UserProvider>
					<App />
				</UserProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
