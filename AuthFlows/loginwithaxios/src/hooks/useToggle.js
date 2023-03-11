import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initialValue) => {
    const [value, setValue] = useLocalStorage(key, initialValue);
    const toggle = () => setValue(prev => typeof value === 'boolean' ? value : !prev);
    return [value, toggle];
}

export default useToggle;