import { useState } from 'react';

function useToggle(initial = false) {
    const [value, setValue] = useState(initial);
    const toggle = () => setValue((v) => !v);
    return [value, toggle] as const;
}

export default useToggle;
