import { Routes, Route } from 'solid-app-router';

import Home from "./pages/Home"
import Master from "./pages/Master"
import Manager from "./pages/Manager"
import Deck from "./pages/Deck"

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/game-master" element={<Master />} />
			<Route path="/character-manager" element={<Manager />} />
			<Route path="/deck-preview" element={<Deck />} />
		</Routes>
	);
}

export default App;
