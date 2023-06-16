import { Note as NoteModel } from '../models/note';

interface NoteProps {
  note: NoteModel,
  onDeleteNoteClicked: (note: NoteModel) => void,
	className?: string,
}

export default NoteProps;