import XY from './components/XY';
import DebounceValue from './components/DebounceValue';
import HoldKey from './components/HoldKey';
import Comma from './components/Comma';
import './App.css';

function App() {
	return (
		<>
			<h1>@hooked-in/react</h1>
			<Comma />
			<XY />
			<DebounceValue />
			<HoldKey />
		</>
	);
}

export default App;
