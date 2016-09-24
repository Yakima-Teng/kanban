import React from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from '../constants/itemTypes.js'

const noteSource = {
  // beginDrag (props) {
  //   console.log('begin dragging note', props)

  //   return {}
  // }
  beginDrag (props) {
    return {
      id: props.id
    }
  },
  isDragging (props, monitor) {
    return props.id === monitor.getItem().id
  }
}

const noteTarget = {
  // hover (targetProps, monitor) {
  //   const sourceProps = monitor.getItem()

  //   console.log('dragging note', sourceProps, targetProps)
  // }
  hover (targetProps, monitor) {
    const targetId = targetProps.id
    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.id

    if (sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId})
    }
  }
}

// @DragSource(ItemTypes.NOTE, noteSource, connect => {
//   return {
//     connectDragSource: connect.dragSource()
//   }
// })
@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    // map isDragging() state to isDragging prop
    isDragging: monitor.isDragging()
  }
})
@DropTarget(ItemTypes.NOTE, noteTarget, connect => {
  return {
    connectDropTarget: connect.dropTarget()
  }
})
export default class Note extends React.Component {
  // render () {
  //   const {connectDragSource, connectDropTarget, id, onMove, ...props} = this.props

  //   return connectDragSource(connectDropTarget(
  //     <li {...props}>{props.children}</li>
  //   ))
  // }
  render () {
    const {connectDragSource, connectDropTarget, isDragging, onMove, id, ...props} = this.props

    return connectDragSource(connectDropTarget(
      <li style={{
        opacity: isDragging ? 0 : 1
      }}>{props.children}</li>
    ))
  }
}

// export default ({ task }) => <div>{ task }</div>
// export default class Note extends React.Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       editing: false
//     }
//   }

//   render () {
//     if (this.state.editing) {
//       return this.renderEdit()
//     }

//     return this.renderNote()
//   }

//   renderEdit = () => {
//     return <input className="field" type="text"
//       ref={
//         e => e ? e.selectionStart = this.props.task.length : null
//       }
//       autoFocus={true}
//       defaultValue={this.props.task}
//       onBlur={this.finishEdit}
//       onKeyPress={this.checkEnter} />
//   }

//   renderNote = () => {
//     // return <div onClick={this.edit}>{this.props.task}</div>
//     // const onDelete = this.props.onDelete
//     const {onDelete, ...rest} = this.props

//     return (
//       <div onClick={this.edit}>
//         <span className="task">{this.props.task}</span>
//         {onDelete ? this.renderDelete() : null}
//       </div>
//     )
//   }

//   renderDelete = () => {
//     const {onDelete, ...rest} = this.props

//     return <button
//       className="delete-note"
//       onClick={onDelete}>x</button>
//   }

//   edit = () => {
//     this.setState({
//       editing: true
//     })
//   }

//   checkEnter = e => {
//     if (e.key === 'Enter') {
//       this.finishEdit(e)
//     }
//   }

//   finishEdit = e => {
//     const value = e.target.value

//     if (this.props.onEdit) {
//       this.props.onEdit(value)

//       this.setState({
//         editing: false
//       })
//     }
//   }
// }
