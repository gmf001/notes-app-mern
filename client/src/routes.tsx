import { Route, Routes } from 'react-router';
import Note from './pages/note';
import Home from './pages/home';

function routes() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/note/:id' element={<Note />} />
		</Routes>
	);
}

export default routes;
