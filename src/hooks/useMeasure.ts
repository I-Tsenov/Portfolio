import { useLayoutEffect, useRef, useState } from 'react';

function useMeasure(): [React.RefObject<HTMLElement | null>, DOMRect | undefined] {
    const ref = useRef<HTMLElement | null>(null);
    const [bounds, setBounds] = useState<DOMRect>();

    useLayoutEffect(() => {
        if (!ref.current) return;
        const observer = new ResizeObserver(() => {
            if (ref.current) setBounds(ref.current.getBoundingClientRect());
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, bounds];
}
export default useMeasure;
