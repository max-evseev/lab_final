import Home from './pages/Home'
import Cinema from './pages/Cinema'
import Booking from './pages/Booking'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import {Context_provider} from './services/booking_service'
    const router = createBrowserRouter([{
    path: '/',
    element: <Home/>
    },
    {
    path: '/booking/:showtime',
    element: <Cinema/>,
    errorElement: <p className="text_message">На цей час сеанси відсутні</p>
    },
    {
    path: '/booking',
    element: <Booking/>
    },
    {
    path: '/*',
    element: <Navigate to="/"/>
    }]);
    export default function App() {
        return (
        <Context_provider>
            <RouterProvider router={router}></RouterProvider>
        </Context_provider>
        );
    }