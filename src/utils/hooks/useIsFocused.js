import { useEffect, useState } from "react";

const useIsFocused = (ref) => {

    const [focus, setFocus] = useState(true)

    const callback = () => {
        if (ref?.current?.offsetHeight > 0) {
            setFocus(true)
        }
        else {
            setFocus(false)
        }
    }
    window.addEventListener('resize', callback)
    useEffect(() => {
        callback()
    }, [])
    return focus
}

export default useIsFocused;
