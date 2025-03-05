import  TurnedInNot  from "@mui/icons-material/TurnedInNot"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"


export const SideBarItem = ({id, title = '', body, date, imageUrls = []}) => {
    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title
    }, [title])

    const newBody = useMemo(()=>{
        return body.length > 40 
            ? body.substring(0,40) + '...'
            :title
    }, [body])

    const dispatch = useDispatch()

    const onClickNote = () => {
        dispatch(setActiveNote({id, title, body, date, imageUrls}))
    }

  return (
    <ListItem 
        disablePadding
    >
        <ListItemButton onClick={onClickNote}>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={newBody}/> 
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
