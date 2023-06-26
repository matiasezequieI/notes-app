import { Note } from '../models/note';

interface AddEditNoteDialogProps {
  noteToEdit?: Note,
  onDismiss: () => void,
  onNoteSaved: (note: Note) => void, 
}

export default AddEditNoteDialogProps;