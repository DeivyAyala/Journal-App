
import Google from "@mui/icons-material/Google"
import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { AuthLoyaout } from "../layout/AuthLoyaout"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import {  startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth"
import { useMemo } from "react"

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)

  const {email, password, onInputChange, formState} = useForm(formData)

  const isAuthenticating = useMemo(() => status === 'checking', [status])  //* desabilita botones una vez se inicie con cuenta google

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log({email, password});
    //! No esta la accion a despachar el Thunk
    dispatch(startLoginWithEmailPassword(formState))

  }

  const onGoogleSingIn = () =>{
    // console.log('Ingresar con google')
    dispatch(startGoogleSingIn())
  }



  return (
    <AuthLoyaout title="Login">
      <form onSubmit={onSubmit}  className="animate__animated animate__fadeIn animate__faster"
      >
            <Grid container>

              <Grid item xs={12}  sx={{mt: 2 }}> {/* xs=12 (Cada pantalla mide 12 cuadros) 
               indica que un componente debe ocupar el ancho completo de su contenedor padre  */}
                <TextField 
                label="correo" 
                type="email" 
                placeholder="correo@google.com" 
                fullWidth //Tome todo el ancho psosible 
                name="email"
                value={email}
                onChange={onInputChange}
                />
              </Grid>

              <Grid item xs={12}  sx={{mt:2 }}>
                <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña" 
                fullWidth //Tome todo el ancho posible del contenido del padre
                name="password"
                value={ password }
                onChange={ onInputChange }
                />
              </Grid>
              <Grid 
              container
              display={!!errorMessage ? '' : 'none'}
              sx={{mt:1}}
              >{/* !! --> convierte el null en un booleando, para que no aparezca el alert  */}
                <Grid 
                  item 
                  xs={12}
                  > 
                    <Alert severity="error"> { errorMessage } </Alert>
                </Grid>
              </Grid>

               <Grid container spacing={ 2 } sx={{mb: 2, mt:1}}>  {/* Spacing = espacio entre los componentes hijos */}
                <Grid item xs={12} sm={6}>
                  <Button 
                  type="submit"  //* se debe colocar, sino no se envia el formulario 
                  variant="contained" 
                  disabled = {isAuthenticating}
                  fullWidth 
                  > 
                    Login
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button  
                  variant="contained" 
                  disabled = {isAuthenticating}
                  fullWidth 
                  onClick={ onGoogleSingIn }
                  > 
                    <Google/>
                    <Typography sx={{ml:1}}>Google</Typography>
                    
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row'  justifyContent='end'>
                <Link color="inherit" to="/auth/register">   {/* Color inherit-color heredador */}
                  Crear Una cuenta
                </Link>
              </Grid>

            </Grid>
          </form>
    </AuthLoyaout>
  )
}
