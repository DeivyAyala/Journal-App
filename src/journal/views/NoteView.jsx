import  SaveOutlined  from "@mui/icons-material/SaveOutlined"
import  UploadOutlined  from "@mui/icons-material/UploadOutlined"
import 'sweetalert2/dist/sweetalert2.css'
import { Button, Grid, Grid2, IconButton, TextField, Typography } from "@mui/material"
import { ImageGalery } from "../components/imageGalery"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadigFiles } from "../../store/journal"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { useForm } from "../../hooks/useForm"
import Swal from "sweetalert2"
import  DeleteOutline  from "@mui/icons-material/DeleteOutline"


export const NoteView = () => {
    const dispatch = useDispatch()
    const { active: note, messageSaved, isSaving} = useSelector(state => state.journal)
    const {body, title, date, onInputChange, formState} = useForm( note )

    const dateString = useMemo(()=>{
        const newDate = new Date( date );
        return  newDate.toUTCString()
    }, [date])

    const fileInputRef = useRef(); //* Referencia de HTML

    useEffect(() => {
      dispatch(setActiveNote(formState))

    }, [formState])
    
    useEffect(() => {
        if( messageSaved.length > 0){
            Swal.fire('Nota Actualizada', messageSaved, 'success') //! Para la alerta.
        }
        
      
    }, [messageSaved])  
    

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }
    
    const onFileInputChange = ({target}) => {
        // console.log(target.files)
        if(target.files === 0) return
        // console.log('Subiendo archivos')
        dispatch(startUploadigFiles(target.files))
    }

    const onDelete = () =>{
        dispatch( startDeletingNote() )
    }

  return (
    <Grid 
        className="animate__animated animate__fadeIn animate__faster"
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{
            bt:1, mr:280}} 
        
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight={5}>{dateString}</Typography>
        </Grid>
        <Grid item>
            <input
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={onFileInputChange}
                style={{display:'none'}}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }

            >
                <UploadOutlined/>
            </IconButton>

            <Button 
                onClick={onSaveNote }
                color="primary" 
                sx={{padding:2}}
                disabled={ isSaving }
                
            >
                <SaveOutlined sx={{fontSize:30, mr:1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label= 'Titulo'
                sx={{border:'none', mb : 1}}
                title="title"
                name="title"
                value={title}
                onChange={onInputChange}
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline   
                placeholder="¿Qué sucedio en el dia de hoy?"
                minRows={ 5 } // Para que sea mas grande el input
                name="body"
                title="body"
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={onDelete}
                sx={{mt:2 }}
                color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>

        {/* Galeria de imagenes  */}

        <ImageGalery 
            images = { note?.imageUrls || []}
        />

    </Grid>
  )
}
