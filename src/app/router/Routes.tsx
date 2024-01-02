import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetailedPage from "../../features/events/details/EventDetailedPage";
import EventForm from "../../features/events/form/EventForm";
import Scratch from "../../features/scratch/Scratch";
import AccountPage from "../../features/auth/AccountPage";
import ProfilePage from "../../features/profiles/ProfilePage";

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
            // Add profile page path
            { path: '/profiles/:id', element: <ProfilePage /> },
            { path: '/createEvent', element: <EventForm key='create' /> },
            // add account page for user's profile
            { path: '/account', element: <AccountPage /> },
            { path: '/scratch', element: <Scratch /> },
        ]
    }
])