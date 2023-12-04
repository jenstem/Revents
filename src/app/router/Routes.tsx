import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetailedPage from "../../features/events/details/EventDetailedPage";
import EventForm from "../../features/events/form/EventForm";
import Scratch from "../../features/scratch/Scratch";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/events', element: <EventDashboard /> },
            { path: '/events/:id', element: <EventDetailedPage /> },
            // We need to give /createEvent a key with a unique id key='create', so there's a difference between
            // createEvent and manageEvent
            { path: '/manage/:id', element: <EventForm /> },
            { path: '/createEvent', element: <EventForm key='create' /> },
            { path: '/scratch', element: <Scratch /> },
        ]
    }
])