import XY from './components/XY';
import DebounceValue from './components/DebounceValue';
import HoldKey from './components/HoldKey';
import './App.css';

function App() {
	return (
		<>
			<h1>@hooked-in/react</h1>
			<XY />
			<DebounceValue />
			<HoldKey />
		</>
	);
}

export default App;
