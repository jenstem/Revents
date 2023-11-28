// import './styles.css'

import { Container } from "semantic-ui-react"
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import NavBar from "./nav/NavBar"
import { useState } from "react"
import { AppEvent } from "../types/event";

// When looking for a place to store state, App is a good place if you want to pass
// state to both your NavBar and your EventDashboard
function App() {
  // useState is a hook [value, function to set the state] = useState(false)
  const [formOpen, setFormOpen] = useState(false);

  // selectedEvent is an AppEvent or null, need to have an alternative when using null
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  // need to specify null
  function handleSelectEvent(event: AppEvent | null) {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  // when we open form, so we can clear selected event
  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  return (
    // fragment is the single parent
    <>
      {/* the NavBar and the EventDashboard are the two children */}
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className="main">
        {/* passing formOpen hook down to EventDashboard */}
        <EventDashboard
        // passing functions to EventDashboard - this is called prop drilling
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedEvent={selectedEvent}
          // need to specify null in the function
          selectEvent={handleSelectEvent}
        />
      </Container>
    </>
  )
}

export default App
