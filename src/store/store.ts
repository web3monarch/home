import { atom, createStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const store = createStore();

export const atomDarkMode = atomWithStorage<boolean>('darkMode', true);
export const atomTheme = atom((get) => get(atomDarkMode) ? 'dark' : 'light');

export default store;
