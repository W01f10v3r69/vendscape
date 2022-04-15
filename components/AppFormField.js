import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from './AppTextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({name, style, ...otherProps }) {
    const {setFieldTouched, handleChange, errors, touched} = useFormikContext();

    return (
        <>

            <AppTextInput 
            style={style}
            onChangeText= {handleChange(name)}
            onBlur={() => setFieldTouched(name) }
            {...otherProps}
            />

            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>

    );
}

export default AppFormField;