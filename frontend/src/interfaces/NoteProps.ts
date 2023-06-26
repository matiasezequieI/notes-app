import { Note as NoteModel } from '../models/note';

interface NoteProps {
  note: NoteModel,
  onNoteClicked: (note: NoteModel) => void,
  onDeleteNoteClicked: (note: NoteModel) => void,
	className?: string,
}

export default NoteProps;