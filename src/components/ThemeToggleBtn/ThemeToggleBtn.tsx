import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../features/Theme/themeSlice';
import { ReactComponent as MoonIcon } from '@assets/moon_icon.svg';
import { ReactComponent as SunIcon } from '@assets/sun_icon.svg';
import Toggle from '@components/Toggle';
// import Tooltip from '@components/Tooltip';
import type { RootState } from '@store/store';

// import styles from './ThemeToggleBtn.module.css'

const ThemeToggleBtn = () => {
    const mode = useSelector((state: RootState) => state.theme.mode);

    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    // Apply theme to <html> on update
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    return (
        // <Tooltip message={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
        <Toggle checked={mode === 'light'} onChange={handleToggle} onIcon={<SunIcon />} offIcon={<MoonIcon />} />
        // </Tooltip>
    );
};

export default ThemeToggleBtn;
