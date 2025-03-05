import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNOtes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = ( ) =>{
    return async( dispatch, getState) =>{

        //Todo: tarea dispatch
        dispatch(savingNewNote())

        //! console.log(getState()) --> Tenemos todo el estado
        //uid
        const { uid } = getState().auth;


        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection( FirebaseDB, `${ uid }/jounral/notes` )) //!Tener la referencia al punto donde quiero insetar la nota

        await setDoc(newDoc, newNote) //!Referencia al documento donde quiero instar, el objedo donde lo quiero grabar
        //! FireBAse en las reglas -->request.auth != null

        // console.log({setDocResp, newDoc}) Verificar si el nuevo documento fue insertado 
        
        newNote.id = newDoc.id; //Estoy creando la propiedad id en la nota


        //!Dispatch 
        //dispatch ( newNote )
        dispatch(addNewEmptyNote(newNote)) //Insertammos la nota al redux  

        //dispatch( activeNote )
        dispatch(setActiveNote(newNote)) //Activamos la nota en redux

    }

}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;
        if(!uid) throw new Error('EL UID del usuario no existe')
        
        const notes = await loadNotes(uid);

        dispatch(setNotes(notes))

    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        
        dispatch(setSaving())

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

       

        const noteToFirestore = {...note }
        delete noteToFirestore.id  //Eliminar una propiedad 
        // console.log(noteToFirestore)

        const docRef = doc( FirebaseDB, `${ uid }/jounral/notes/${ note.id }` )
        await setDoc(docRef, noteToFirestore, {merge: true} ) //!Mage, si hay campos que estoy enviando aca y no estan en la BD, se mantengan 

        dispatch(updateNote( note ))

    }   
}

export const startUploadigFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving())
        // console.log(files)
        // await fileUpload( files[0] )

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ))
        }
        const photosUrls =  await Promise.all(fileUploadPromises);
        // console.log(photosUrls)
        dispatch(setPhotosToActiveNote( photosUrls ))
    }
}

export const startDeletingNote  = () =>{
    return async(dispatch, getState) =>{
        const {uid} = getState().auth;
        const { active:note } = getState().journal
        // console.log({uid, note})

        const docRef = doc( FirebaseDB, `${ uid }/jounral/notes/${ note.id }` ) 
        const resp = await deleteDoc(docRef)
        
        dispatch(deleteNoteById(note.id))


    }
}