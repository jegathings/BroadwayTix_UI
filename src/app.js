import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import CreateReservation from './components/CreateReservation';
import CreateEvent from './components/CreateEvent'
import Login from './components/Login'
import ShowResultsCreateEvent from './components/ResultsCreateShow'
import ShowResultsCreateReservation from './components/ResultsCreateReservation';

const App = (props) => {
    const STREET_TEAM_PURCHASE = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/post"
    const CREATE_SHOW = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/createShow"
    const DO_LOGIN = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/login";
    const SHOW_CREATE_EVENT = "show create an event";
    const SHOW_CREATE_RESERVATION = "show create reservation";
    const SHOW_RESULTS_CREATE_RESERVATION = "show results create reservation";
    const SHOW_RESULTS_CREATE_EVENT = "show results create event";
    const SHOW_UI = "you're logged in, show ui";
    const SHOW_LOGIN = "show login";
    const [showLogin, setShowLogin] = React.useState(true);
    const [showCreateEventPage, setShowCreateEventPage] = React.useState(false);
    const [showResultsCreateEvent, setShowResultsCreateEvent] = React.useState(false);
    const [stateCreateEvent,setStateCreateEvent] = React.useState(null);
    const [stateCreateReservation, setStateCreateReservation] = React.useState(null);
    const [showCreateReservationPage, setShowCreateReservationPage] = React.useState(false);
    const [showResultsCreateReservationPage, setShowResultsCreateReservation] = React.useState(false);

    const handeleCreateReservation = async (data) => {
        await fetch(`${STREET_TEAM_PURCHASE}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(reservation => {
            setStateCreateReservation(reservation);
            dispatch(SHOW_RESULTS_CREATE_RESERVATION)})
        .catch((error) => console.log(error))
    }

    const handleCreateEvent = async (data) => {
        const response = await fetch(`${CREATE_SHOW}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(json => {
            const event = {id:json.id.S,
                number_of_tickets: json.number_of_tickets.S,
                show_comedians: json.show_comedians.S,
                show_date: json.show_date.S,
                show_time: json.show_time.S,
                show_name: json.show_name.S
                }
            setStateCreateEvent(event)    
            dispatch(SHOW_RESULTS_CREATE_EVENT);
        })
        .catch((error) => console.log(error))
    }

    const handleLogin = async (data) => {
        await fetch(`${DO_LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)})        
        .then(response => response.text())
        .then( token => {
            localStorage.setItem("login_token", token);
            dispatch(SHOW_UI);})
        .catch((error) => console.log(error));
    }

    const dispatch = (showMe) =>{
        if(showMe === SHOW_RESULTS_CREATE_RESERVATION){
            setShowCreateEventPage(false);
            setShowCreateReservationPage(false);
            setShowLogin(false);
            setShowResultsCreateEvent(false);
            setShowResultsCreateReservation(true);
        }else if(showMe === SHOW_RESULTS_CREATE_EVENT){
            setShowCreateEventPage(false);
            setShowCreateReservationPage(false);
            setShowLogin(false);
            setShowResultsCreateReservation(false);
            setShowResultsCreateEvent(true);
        }else if(showMe === SHOW_UI){
            setShowCreateEventPage(false);
            setShowCreateReservationPage(false);
            setShowLogin(false);
            setShowResultsCreateEvent(false);
            setShowResultsCreateReservation(false);
        }else if(showMe === SHOW_CREATE_RESERVATION){
            setShowCreateEventPage(false);
            setShowLogin(false);
            setShowResultsCreateEvent(false);
            setShowResultsCreateReservation(false);
            setShowCreateReservationPage(true);
        }else if(showMe === SHOW_CREATE_EVENT){
            setShowLogin(false);
            setShowResultsCreateEvent(false);
            setShowResultsCreateReservation(false);
            setShowCreateReservationPage(false);
            setShowCreateEventPage(true);
        }else if(showMe === SHOW_LOGIN){
            setShowResultsCreateEvent(false);
            setShowResultsCreateReservation(false);
            setShowCreateReservationPage(false);
            setShowCreateEventPage(false);
            setShowLogin(true);
        }
    }
    return (
        <>
            <h1>Comedy Ticket Hub</h1>
            {
                !showLogin &&
                <nav>
                    <button onClick={() => {
                        dispatch(SHOW_CREATE_RESERVATION);
                    }}>Customer Reservation</button>
                    <button onClick={() => {
                        dispatch(SHOW_CREATE_EVENT);
                    }}>Create Event</button>
                    <button onClick={() => {
                        dispatch(SHOW_LOGIN);
                    }}>Logout</button>

                </nav>
            }
            {
                showLogin && 
                <Login formData={{ email: "", password: "" }} handleSubmit={handleLogin} />
            }
            {
                showCreateReservationPage && 
                <CreateReservation formData={{ first_name: "", last_name: "", email: "", broadway_role: "", number_of_tickets: "", show_id: "", formTitle: "Buy Ticket" }} handleSubmit={handeleCreateReservation}/>
            }
            {
                showResultsCreateReservationPage &&
                <ShowResultsCreateEvent formData={{...stateCreateReservation}}/>
            }
            {
                showCreateEventPage && 
                <CreateEvent formData={{ email: "", number_of_tickets: "", show_name: "", show_date: "", show_time: "", show_room: "", show_comedians: "" }} handleSubmit={handleCreateEvent} />
            }
            {
                showResultsCreateEvent &&
                <ShowResultsCreateEvent formData={{...stateCreateEvent}}/>
            }
        </>
    );
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);
