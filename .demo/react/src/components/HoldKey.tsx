import { useRef } from 'react';
import { useHoldKey } from '@hooked-in/react';

const HoldKey = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const isHeld = useHoldKey(inputRef, 'Shift', 500);

	return (
		<section>
			<h2>
				<code>useDebounceValue</code>
			</h2>
			<p>
				Key <code>Shift</code> is held for 500ms: {String(isHeld)}
			</p>
			<input ref={inputRef} />
		</section>
	);
};

export default HoldKey;
