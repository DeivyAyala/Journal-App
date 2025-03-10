import { CircularProgress, Grid } from '@mui/material'


export const ChekingAuth = () => { //! APARECE EL CIRCULO DE CARGANDO 
  return (
    <Grid 
    container
    spacing={0}
    direction="column"
    alignItems='center'
    justifyContent='center'
    sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding:4}}
    >

        <Grid item
            direction='row'
            justifyContent='center'
            >
                <CircularProgress color='warning'/>

        </Grid>
    </Grid>
  )
}
