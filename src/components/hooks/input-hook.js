import { useState } from 'react'

// This custom hook is used in SignUp component
export const useInput = initialValue => {
    const [value, setValue] = useState(initialValue)

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value)
            }
        }
    }
}
