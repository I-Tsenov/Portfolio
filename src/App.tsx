import React from 'react';
import AppRouter from './routes/router';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Main from './layouts/Main/Main';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
	return (
		<Router>
			<Header />
			<Main>
				<AppRouter />
			</Main>
			<Footer />
		</Router>
	);
};

export default App;