import Typography from '@mui/material/Typography'
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { IconButton } from '@mui/material';
import  AddOutlined  from '@mui/icons-material/AddOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';


export const JournalPage = () => {

  const {isSaving, active } = useSelector(state => state.journal)

  const dispatch = useDispatch()


  const onClickNewNote = () => {
    dispatch( startNewNote() )
  }
  
  return (
    <JournalLayout isNothingSelected={!active}>
      {
        // (active != null) ? <NoteView/> : <NothingSelectedView/>
        (!!active)? <NoteView /> : <NothingSelectedView/>
      }


        <IconButton

          onClick={onClickNewNote}
          size='large'
          disabled = { isSaving }
          sx={{
            color:'while',
            backgroundColor:'error.main',
            ':hover': {backgroundColor: 'error.main', opacity: 0.9},
            position: 'fixed',
            right: 50,
            bottom: 50

          }}
        >
          <AddOutlined sx={{fontSize:40}}/>
        </IconButton>

    </JournalLayout>
  )
}
