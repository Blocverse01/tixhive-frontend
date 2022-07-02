import React from "react";

export default function useWatchHandleChange(name, watch, handleChange) {
    let changingValue = "";
    if (watch) {
        changingValue = watch(name);
    }
    React.useEffect(() => {
        handleChange({ target: { name: name, value: changingValue } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changingValue]);
}