import Home from './pages/Home'
import Booking from './pages/Booking'
import Booking_form from './pages/Booking_form'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
    const router = createBrowserRouter([{
    path: '/',
    element: <Home/>
    },
    {
    path: '/booking/:showtime',
    element: <Booking/>,
    errorElement: <p className="not_found">На цей час сеанси відсутні</p>
    },
    {
    path: '/booking',
    element: <Booking_form/>
    },
    {
    path: '/*',
    element: <Navigate to="/"/>
    }]);
    export default function App() {
        return (
        <RouterProvider router={router}></RouterProvider>
        );
    }