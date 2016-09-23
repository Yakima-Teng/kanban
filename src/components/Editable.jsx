import React from 'react'

export default class Editable extends React.Component {
  // constructor (props) {
  //   super(props)

  //   this.state = {
  //     editing: false
  //   }
  // }

  // render () {
  //   if (this.state.editing) {
  //     return this.renderEdit()
  //   }

  //   return this.renderNote()
  // }
  render () {
    // compared to the book, onDelete is explictly shown, in order to move it from ..props
    // because onDelete is not a valid html attribute
    // if just do like what the book says, you will encounter an error
    // like: Unknown props 'onDelete' on div tag
    const { value, onEdit, onValueClick, editing, onDelete, ...props } = this.props

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    )
  }

  renderEdit = () => {
    return <input className="field" type="text"
      ref={
        // e => e ? e.selectionStart = this.props.task.length : null
        e => e ? e.selectionStart = this.props.value.length : null
      }
      autoFocus={true}
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />
  }

  // renderNote = () => {
  //   // return <div onClick={this.edit}>{this.props.task}</div>
  //   const onDelete = this.props.onDelete

  //   return (
  //     <div onClick={this.edit}>
  //       <span className="task">{this.props.task}</span>
  //       {onDelete ? this.renderDelete() : null}
  //     </div>
  //   )
  // }
  renderValue = () => {
    // const onDelete = this.props.onDelete
    const { onDelete, ...rest } = this.props

    return (
      <div onClick={this.props.onValueClick}>
        <span className="value">{this.props.value}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    )
  }

  renderDelete = () => {
    const { onDelete, ...rest } = this.props
    return <button
      className="delete"
      onClick={onDelete}>x</button>
  }

  // edit = () => {
  //   this.setState({
  //     editing: true
  //   })
  // }

  checkEnter = e => {
    if (e.key === 'Enter') {
      this.finishEdit(e)
    }
  }

  finishEdit = e => {
    const {onEdit, ...rest} = this.props
    const value = e.target.value

    if (onEdit) {
      onEdit(value)

      // this.setState({
      //   editing: false
      // })
    }
  }
}
