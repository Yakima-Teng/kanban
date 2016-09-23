// import uuid from 'node-uuid'
import AltContainer from 'alt-container'
import React from 'react'
import Notes from './Notes.jsx'
import NoteActions from '../actions/NoteActions.js'
import NoteStore from '../stores/NoteStore.js'

export default class App extends React.Component {
  // constructor (props) {
  //   super(props)

  //   // this.state = {
  //   //   notes: [
  //   //     {
  //   //       id: uuid.v4(),
  //   //       task: 'Learn Webpack'
  //   //     },
  //   //     {
  //   //       id: uuid.v4(),
  //   //       task: 'Learn React'
  //   //     },
  //   //     {
  //   //       id: uuid.v4(),
  //   //       task: 'Do laundry'
  //   //     }
  //   //   ]
  //   // }
  //   this.state = NoteStore.getState()
  // }
  // componentDidMount () {
  //   NoteStore.listen(this.storeChanged)
  // }
  // componentWillUnmount () {
  //   NoteStore.unlisten(this.storeChanged)
  // }
  // storeChanged = state => {
  //   // Without a property initializer, 'this' wouldn't point at the right context
  //   // because it defaults to 'undefined' in strict mode
  //   this.setState(state)
  // }
  render () {
    // const notes = this.state.notes

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
          <AltContainer
            stores={[NoteStore]}
            inject={{
              notes: () => NoteStore.getState().notes
            }}
          >
            <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
          </AltContainer>
      </div>
    )
  }
  // We are using an experimental feature known as property initializer here.
  // It allows us to bind the method 'this' to point at our *App* instance.

  // Alternatively we could 'bind' at 'constructor' using a line,
  // such as this.addNote = this.addNote.bind(this)
  // addNote = () => {
  //   this.setState({
  //     notes: this.state.notes.concat([{
  //       id: uuid.v4(),
  //       task: 'New task'
  //     }])
  //   }, () => {
  //     console.log('added one task')
  //   })
  // }
  addNote () {
    NoteActions.create({task: 'New task'})
  }

  // editNote = (id, task) => {
  //   // Don't modify if trying set an empty value
  //   if (!task.trim()) {
  //     return
  //   }

  //   const notes = this.state.notes.map(note => {
  //     if (note.id === id && task) {
  //       note.task = task
  //     }

  //     return note
  //   })

  //   this.setState({notes})
  // }
  editNote (id, task) {
    // Don't modify if trying set an empty value
    if (!task.trim()) {
      return
    }

    NoteActions.update({id, task})
  }

  // deleteNote = (id, e) => {
  //   e.stopPropagation()

  //   this.setState({
  //     notes: this.state.notes.filter(note => note.id !== id)
  //   })
  // }
  deleteNote (id, e) {
    e.stopPropagation()

    NoteActions.delete(id)
  }
}
