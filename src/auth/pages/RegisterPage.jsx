
import Google from "@mui/icons-material/Google"
import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { AuthLoyaout } from "../layout/AuthLoyaout"
import { useForm } from "../../hooks/useForm"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreateingUserWithEmailPassword } from "../../store/auth/thunks"

const formData = {
  
  email: '',
  password: '',
  displayName: ''
}

const formValidtions ={
  email: [(value) => value.includes('@') , 'El correo debe tener una @'],
  password: [(value) => value.length >= 6 , 'El pasword debe tener mas de 6 caracteres'],
  displayName: [(value) => value.length >= 2 , 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubmitted, setformSubmitted] = useState(false) //Para que al inicio no tenga los mensajes de error 

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo( () => status === 'cheking', [status] );

  const {
    formState, displayName,  email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidtions);

  // console.log(displayNameValid)

  const onSubmit = (e) => {
    e.preventDefault()
    setformSubmitted(true)

    if(!isFormValid) return
    // console.log(formState)
    dispatch(startCreateingUserWithEmailPassword({email, password, displayName}))

  }

  return (
    <AuthLoyaout title="Crear Cuenta">
    <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster" >
            <Grid container>

              <Grid item xs={12}  sx={{mt: 2 }}> {/* xs=12 (Cada pantalla mide 12 cuadros) 
               indica que un componente debe ocupar el ancho completo de su contenedor padre  */}
                <TextField 
                label="Nombre Completo " 
                type="text" 
                placeholder="Escribe tu nombre " 
                fullWidth //Tome todo el ancho posible del contenido del padre
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                //*Validaciones 
                error = {!!displayNameValid && formSubmitted  }
                helperText = {displayNameValid}

                />
              </Grid>

              <Grid item xs={12}  sx={{mt: 2 }}> 
                <TextField 
                label="correo" 
                type="email" 
                name="email"
                fullWidth  
                value={email}
                onChange={onInputChange}
                placeholder="correo@google.com" 
                //*Validaciones 
                error = {!!emailValid && formSubmitted}
                helperText = {emailValid}
               
                />
              </Grid>

              <Grid item xs={12}  sx={{mt:2 }}>
                <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña" 
                fullWidth 
                name="password"
                value={ password }
                onChange={ onInputChange }
                //*Validaciones 
                error = {!!passwordValid && formSubmitted }
                helperText = {passwordValid}
                />
              </Grid>
                
              
            
               <Grid container spacing={ 2 } sx={{mb: 2, mt:1}}>  {/* Spacing = espacio entre los componentes hijos */}
                <Grid 
                    item 
                    xs={12}
                    display={!!errorMessage ? '' : 'none'} 
                  > 
                    <Alert severity="error"> { errorMessage } </Alert> {/* Imprime el mensaje de error que esta en el state */}
                    
                  </Grid>
                <Grid item xs={12}>
                  <Button 
                  disabled = {isCheckingAuthentication}
                  variant="contained" 
                  type="submit"
                  fullWidth 
                  > 
                    Crear Cuenta
                  </Button>
                </Grid>

              </Grid>

              <Grid container direction='row'  justifyContent='end'>
                <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
                <Link color="inherit" to="/auth/login">   {/* Color inherit-color heredador */}
                  Ingresar
                </Link>
              </Grid>

            </Grid>
          </form>
    </AuthLoyaout>
  )
}
