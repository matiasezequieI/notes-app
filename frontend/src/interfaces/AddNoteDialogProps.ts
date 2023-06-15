import { Note } from '../models/note';

interface AddNoteDialogProps {
  onDismiss: () => void,
  onNoteSaved: (note: Note) => void, 
}

export default AddNoteDialogProps;