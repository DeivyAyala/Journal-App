import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidtions = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setformValidation ] = useState({}) //Me diga si hay o no un error
    useEffect(() => {
        createValidators()
    }, [formState]) // Cada vez que cambie el inpt, nombre, email

    useEffect(() => {
      setFormState(initialForm) //Para que se vuleva a llamar si el esta inicial del formulario cambia 
    }, [initialForm])
    
    
    const isFormValid = useMemo(() => {
        
        for (const formValue of Object.keys(formValidation)) {
            if( formValidation[formValue] !== null ) return false; //Ya no se sigue ejecutando
        }
        return true
    }, [formValidation])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};

        for ( const formField of Object.keys( formValidtions ) ){
            // console.log(formField)
            const [fn, errorMessage = 'Este Campo es requerido'] = formValidtions[formField]; //Manda a llamar el arreglo de formValiations
            formCheckedValues[`${ formField }Valid`] = fn ( formState[formField] ) ? null : errorMessage;  //Crear una propiedad computada (displayNaameValid, emailValid, passwordValid)
        }

        setformValidation( formCheckedValues );
        // console.log({formCheckedValues})

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}