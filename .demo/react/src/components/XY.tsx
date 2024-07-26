import { useXY } from '@hooked-in/react';

const XY = () => {
    const {x, y} = useXY();

    return (
        <section>
            <h2><code>useXY</code></h2>
            <p>Cursor position is {x}, {y}.</p>
        </section>
      )
}

export default XY;