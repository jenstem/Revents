// import './styles.css'

import { Container } from "semantic-ui-react"
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import NavBar from "./nav/NavBar"
import { useState } from "react"

// When looking for a place to store state, App is a good place if you want to pass
// state to both your NavBar and your EventDashboard
function App() {
  // useState is a hook [value, function to set the state] = useState(false)
  const [formOpen, setFormOpen] = useState(false);

  return (
    // fragment is the single parent
    <>
    {/* the NavBar and the EventDashboard are the two children */}
      <NavBar setFormOpen={setFormOpen}/>
      <Container className="main">
        {/* passing formOpen hook down to EventDashboard */}
      <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen}/>
      </Container>
    </>
  )
}

export default App
