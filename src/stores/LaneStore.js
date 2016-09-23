import uuid from 'node-uuid'
import alt from '../libs/alt.js'
import LaneActions from '../actions/LaneActions.js'

class LaneStore {
  constructor () {
    this.bindActions(LaneActions)

    this.lanes = []
  }
  create (lane) {
    const lanes = this.lanes

    lane.id = uuid.v4()
    lane.notes = lane.notes || []

    this.setState({
      lanes: lanes.concat(lane)
    })
  }
}

export default alt.createStore(LaneStore, 'LaneStore')
