import {useCommaInput} from '@hooked-in/react'

const Comma = () => {
    const props = useCommaInput('')

	return (
		<section>
			<h2>
				<code>useComma</code>
			</h2>
			<p>
                Value formatted: {props.value}
			</p>
			<input {...props} />
		</section>
	);
};

export default Comma;
