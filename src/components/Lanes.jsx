import React from 'react'
import Lane from './Lane.jsx'

// export default class Lanes extends React.Component {
//   render () {
//     return (
//       <div className="lanes">
//         lanes should go here
//       </div>
//     )
//   }
// }
export default ({ lanes }) => {
  return (
    <div className="lanes">{lanes.map(lane =>
      <Lane className="lane" key={lane.id} lane={lane} />
    )}</div>
  )
}
