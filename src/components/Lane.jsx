import AltContainer from 'alt-container'
import React from 'react'
import Notes from './Notes.jsx'
import NoteActions from '../actions/NoteActions.js'
import NoteStore from '../stores/NoteStore.js'
import LaneActions from '../actions/LaneActions.js'
import Editable from './Editable.jsx'
import {DropTarget} from 'react-dnd'
import ItemTypes from '../constants/itemTypes.js'

const noteTarget = {
  // hover (targetProps, monitor) {
  //   const targetId = targetProps.lane.id
  //   const sourceProps = monitor.getItem()
  //   const sourceId = sourceProps.id

  //   console.log(`source: ${sourceId}, target: ${targetId}`)
  // }
  hover (targetProps, monitor) {
    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.id

    if (!targetProps.lane.notes.length) {
      // console.log('source', sourceId, 'target', targetProps)
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      })
    }
  }
}

@DropTarget(ItemTypes.NOTE, noteTarget, connect => {
  return {
    connectDropTarget: connect.dropTarget()
  }
})
export default class Lane extends React.Component {
  render () {
    // const {lane, ...props} = this.props
    const {connectDropTarget, lane, ...props} = this.props

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header" onClick={this.activateLaneEdit}>
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <Editable
            className="lane-name"
            editing={lane.editing}
            value={lane.name}
            onEdit={this.editName} />
          <div className="lane-delete">
            <button onClick={this.deleteLane}>x</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            // notes: () => NoteStore.getState().notes || []
            notes: () => NoteStore.getNotesByIds(lane.notes)
          }}
        >
          <Notes
            onValueClick={this.activateNoteEdit}
            onEdit={this.editNote}
            onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    )
  }
  editNote (id, task) {
    // Don't modify if trying set an empty value
    if (!task.trim()) {
      NoteActions.update({id, editing: false})
      return
    }

    NoteActions.update({id, task, editing: false})
  }
  // addNote () {
  //   NoteActions.create({ task: 'New task' })
  // }
  // deleteNote(id, e) {
  //   e.stopPropagation()

  //   NoteActions.delete(id)
  // }
  addNote = (e) => {
    // If note is added, avoid opening lane name edit by stopping event bubbling in this case
    e.stopPropagation()

    const laneId = this.props.lane.id
    const note = NoteActions.create({ task: 'New task' })

    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    })
  }
  deleteNote = (noteId, e) => {
    e.stopPropagation()

    const laneId = this.props.lane.id

    LaneActions.detachFromLane({ laneId, noteId })
    NoteActions.delete(noteId)
  }
  // editName = (name) => {
  //   const laneId = this.props.lane.id

  //   console.log(`edit lane ${laneId}`)
  // }
  // activateLaneEdit = () => {
  //   const laneId = this.props.lane.id

  //   console.log(`activate note ${laneId} edit`)
  // }
  // activateNoteEdit (id) {
  //   console.log(`activate note ${id} edit`)
  // }
  editName = (name) => {
    const laneId = this.props.lane.id

    // Don't modify if trying set an empty value
    if (!name.trim()) {
      LaneActions.update({id: laneId, editing: false})

      return
    }

    LaneActions.update({id: laneId, name, editing: false})
  }
  deleteLane = () => {
    const laneId = this.props.lane.id

    console.log('deleteLane')

    LaneActions.delete(laneId)
  }
  activateLaneEdit = () => {
    const laneId = this.props.lane.id

    LaneActions.update({id: laneId, editing: true})
  }
  activateNoteEdit = (id) => {
    NoteActions.update({id, editing: true})
  }
}
