import React from 'react'
import Note from './Note.jsx'
import Editable from './Editable.jsx'
import LaneActions from '../actions/LaneActions.js'

export default ({ notes, onValueClick, onEdit, onDelete }) => {
  return (
    <ul className="notes">{notes.map(note =>
      // <li className="note" key={note.id}>
      //   <Editable
      //     editing={note.editing}
      //     value={note.task}
      //     onValueClick={onValueClick.bind(null, note.id)}
      //     onEdit={onEdit.bind(null, note.id)}
      //     onDelete={onDelete.bind(null, note.id)} />
      // </li>
      <Note
        className="note"
        id={note.id}
        key={note.id}
        editing={note.editing}
        onMove={LaneActions.move}
      >
        <Editable
          editing={note.editing}
          value={note.task}
          onValueClick={onValueClick.bind(null, note.id)}
          onEdit={onEdit.bind(null, note.id)}
          onDelete={onDelete.bind(null, note.id)} />
      </Note>
    )}</ul>
  )
}
