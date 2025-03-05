import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false, 
        messageSaved: '',
        notes: [],
        active: null //Al principio
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 12345,
        //     imageUrls: [], // https://foto1.jpg,  https://foto3.jpg,  https://foto3.jpg
        // }
        
    },
    reducers: { //Todo en lo que va en los reducer siempre tiene que ser sincrono 

        savingNewNote: (state) =>{
            state.isSaving = true
        },
        addNewEmptyNote: (state, action) => { //Agregar una nota 
            state.notes.push( action.payload );
            state.isSaving = false
        },
        setActiveNote: (state, action) => { //Selecionar la nota activa
            state.active = action.payload;
            state.messageSaved = ''
        },
        setNotes: (state, action) => { //Cargar las notas 
            state.notes = action.payload
        },
        setSaving: (state) => { //Grabando las notas 
            state.isSaving = true;
            // TODO: mensaje de error..
            state.messageSaved = ''
        },
        updateNote: (state, action) => { //Actualizar una nota  //Payload == nota 
            state.isSaving = false
            state.notes = state.notes.map(note =>{ 
                if(note.id === action.payload.id){
                    return action.payload
                }
                return note 
            });
            //TODO: Mostrar mensaje de actualización

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) =>{ //!Subir el arreglo de imagenes al redux mas en active (note)
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]  //*Mantener las fotografias anteriores y concatenar las fotografias que se vana subir
            state.isSaving = false;
        },

        clearNotesLogout: (state) => { //Eliminar las notas una vez se cierra sesion
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null
        },

        deleteNoteById: (state, action) => { //Eliminar una nota 
            state.active = null
            state.notes = state.notes.filter(note => note.id !== action.payload); //Primero se elimina de redux
            if(state.active?.id === action.payload){ //Despues se la elimina del arreglo de notas 
                state.active = null
            }

        },
        
    }
});

// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById 
                } = journalSlice.actions;
