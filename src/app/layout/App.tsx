// import './styles.css'
// import EventDashboard from "../../features/events/dashboard/EventDashboard"
// import { useState } from "react"
// import { AppEvent } from "../types/event";

import { Container } from "semantic-ui-react";
import NavBar from "./nav/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ModalManager from "../common/modals/ModalManager";
// add these imports for authentication
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAppDispatch } from "../store/store";
import { signIn, logout } from "../../features/auth/authSlice";

// When looking for a place to store state, App is a good place if you want to pass
// state to both your NavBar and your EventDashboard
function App() {
  const location = useLocation();
  // add dispatch for authentication
  const dispatch = useAppDispatch();
  // add authentication
  useEffect(() => {
    // onAuthStateChanged is a listener that will listen for any changes in authentication or auth State
    onAuthStateChanged(auth, {
      next: user => {
        // if user exists, then dispatch the signIn action
        if (user) {
          dispatch(signIn(user))
        } else {
          dispatch(logout())
        }
      },
      error: error => console.log(error),
      complete: () => {}
    })
  }, [dispatch])


  // DO NOT NEED THIS CODE IF USING ROUTER!!!!
  // // useState is a hook [value, function to set the state] = useState(false)
  // const [formOpen, setFormOpen] = useState(false);

  // // selectedEvent is an AppEvent or null, need to have an alternative when using null
  // const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  // // need to specify null
  // function handleSelectEvent(event: AppEvent | null) {
  //   setSelectedEvent(event);
  //   setFormOpen(true);
  // }

  // // when we open form, so we can clear selected event
  // function handleCreateFormOpen() {
  //   setSelectedEvent(null);
  //   setFormOpen(true);
  // }

  return (
    // fragment is the single parent
    // we put a fragment inside a fragment so the HomePage is above the NavBar
    // this will allow the HomePage to take up the full screen
    <>
      {location.pathname === '/' ? <HomePage /> : (
        <>
        <ModalManager />
      {/* the NavBar and the EventDashboard are the two children */}
      {/* REMOVE THIS IF USING ROUTER */}
      {/* <NavBar setFormOpen={handleCreateFormOpen} /> */}
      <NavBar />
      <Container className="main">
        {/* passing formOpen hook down to EventDashboard */}
        {/* when using a router, we render <Outlet /> instead of <EventDashboard /> */}
        {/* <EventDashboard
        // passing functions to EventDashboard - this is called prop drilling
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedEvent={selectedEvent}
          // need to specify null in the function
          selectEvent={handleSelectEvent}
        /> */}
        {/* Outlet works like a wildcard, it will render the component that matches the path */}
        {/* location.pathname... says if the path is / then render HomePage, otherwise render Outlet */}
        {/* {location.pathname === '/' ? <HomePage /> : <Outlet />} */}
        <Outlet />
      </Container>
      </>
      )}

    </>
  )
}

export default App
