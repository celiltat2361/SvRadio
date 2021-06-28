import { useEffect } from 'react';

const OutsideClick = (callback, ref) => {
    const handleClickOutside = (e) => {
        if (ref && ref.current && !ref.current.contains(e.target)) {
        callback();
        return;
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });
};

export default OutsideClick;