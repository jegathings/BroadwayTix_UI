import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import CreateReservation from './components/CreateReservation';
import CreateEvent from './components/CreateEvent'
import Login from './components/Login'
import ShowResultsCreateEvent from './components/ResultsCreateEvent'
import CreateUser from './components/CreateUser'

const App = (props) => {
    const CREATE_RESERVATION = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/post"
    const CREATE_SHOW_URL = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/createShow"
    const LOGIN_URL = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/login";
    const CREATE_NEW_USER = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/createUser";
    const SHOW_CREATE_EVENT = "show create an event";
    const SHOW_CREATE_RESERVATION = "show create reservation";
    const SHOW_RESULTS_CREATE_RESERVATION = "show results create reservation";
    const SHOW_RESULTS_CREATE_EVENT = "show results create event";
    const SHOW_UI = "you're logged in, show ui";
    const SHOW_LOGIN = "show login";
    const SHOW_CREATE_CUSTOMER = "show create customer";
    const [showLogin, setShowLogin] = React.useState(true);
    const [showCreateEventPage, setShowCreateEventPage] = React.useState(false);
    const [showResultsCreateEvent, setShowResultsCreateEvent] = React.useState(false);
    const [stateCreateEvent, setStateCreateEvent] = React.useState(null);
    const [stateCreateReservation, setStateCreateReservation] = React.useState(null);
    const [showCreateReservationPage, setShowCreateReservationPage] = React.useState(false);
    const [showResultsCreateReservationPage, setShowResultsCreateReservation] = React.useState(false);
    const [showCreateUserPage, setShowCreateUserPage] = React.useState(false);

    React.useEffect(() => {
    }, []);

    const handleCreateUser = async (data) => {
        console.log("start handle create user");
        await fetch(`${CREATE_NEW_USER}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(user => {
                console.log("Response", user);
                console.log("Create User", user);
                handleLogin({ username: user.email, password: user.password });
            })
            .catch((error) => console.log(error));
        console.log("end handle create user");
    }
    const handeleCreateReservation = async (data) => {
        console.log("start handle create reservation");
        await fetch(`${CREATE_RESERVATION}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(reservation => {
                setStateCreateReservation(reservation);
            })
            .catch((error) => console.log(error))
        dispatch(SHOW_RESULTS_CREATE_RESERVATION);
        console.log("end handle create reservation");
    }

    const handleCreateEvent = async (data) => {
        console.log("start handle create event");
        console.log("Data", data);
        console.log("Data 2", {
            email: data.email,
            number_of_tickets: data.number_of_tickets,
            show_name: data.show_name,
            show_date: data.show_date,
            show_time: data.show_time
        });
        await fetch(`${CREATE_SHOW_URL}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                number_of_tickets: data.number_of_tickets,
                show_name: data.show_name,
                show_date: data.show_date,
                show_time: data.show_time
            }),
        })
            .then(response => response.json())
            .then(json => {
                const event = {
                    id: json.id.S,
                    number_of_tickets: json.number_of_tickets.N,
                    show_comedians: json.show_comedians.S,
                    show_date: json.show_date.S,
                    show_time: json.show_time.S,
                    show_name: json.show_name.S
                }
                setStateCreateEvent(event)
                dispatch(SHOW_RESULTS_CREATE_EVENT);
            })
            .catch((error) => console.log(error))
        console.log("end handle create event");
    }

    const handleLogin = async (data) => {
        console.log("start handleLogin");
        await fetch(`${LOGIN_URL}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(token => {
                localStorage.setItem("login_token", token);
                console.log("Token", token);
                console.log("Token Valid", token.indexOf("Invalid") === -1);
                if (token.indexOf("Invalid") === -1) {
                    dispatch(SHOW_UI);
                } else {
                    dispatch(SHOW_CREATE_CUSTOMER);
                }
            })
            .catch((error) => {
                console.log("There was a login error.");
                console.log(error)
            });
        console.log("start handleLogin");
    }
    const setShowCreateUser = (data) => {
        console.log("start setShowCreateUser");
        dispatch(SHOW_CREATE_CUSTOMER);
        console.log("end setShowCreateUser");
    }
    const dispatch = (showMe) => {
        console.log("Start Show Me ", showMe);
        setShowCreateEventPage(false);
        setShowCreateReservationPage(false);
        setShowLogin(false);
        setShowResultsCreateEvent(false);
        setShowCreateUserPage(false);
        setShowResultsCreateReservation(false);

        if (showMe === SHOW_RESULTS_CREATE_RESERVATION) {
            console.log("Conditional", showMe);
            setShowResultsCreateReservation(true);
        } else if (showMe === SHOW_RESULTS_CREATE_EVENT) {
            console.log("Conditional", showMe);
            setShowResultsCreateEvent(true);
        } else if (showMe === SHOW_UI) {
        } else if (showMe === SHOW_CREATE_RESERVATION) {
            console.log("Conditional", showMe);
            setShowCreateReservationPage(true);
        } else if (showMe === SHOW_CREATE_EVENT) {
            console.log("Conditional", showMe);
            setShowCreateEventPage(true);
        } else if (showMe === SHOW_LOGIN) {
            console.log("Conditional", showMe);
            setShowLogin(true);
        } else if (showMe === SHOW_CREATE_CUSTOMER) {
            console.log("Conditional", showMe);
            console.log("Show create user page.");
            setShowCreateUserPage(true);
        }
        console.log("End Show Me", showMe);
    }
    return (
        <>
            <header className="header">
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
            </header>
            <div className="holy-grail-body">
                <section className="holy-grail-content">
                    {
                        showLogin &&
                        <div className="holy-grail-login">
                            <div className="login_div">

                                <Login formData={{ email: "", password: "" }} handleSubmit={handleLogin} />
                                <button
                                    onClick={setShowCreateUser}
                                 >New Customer</button>
                            </div>
                        </div>
                    }
                    {
                        showCreateUserPage &&
                        <CreateUser formData={{}} handleSubmit={handleCreateUser} />
                    }
                    {
                        showCreateReservationPage &&
                        <CreateReservation formData={{ first_name: "", last_name: "", email: "", broadway_role: "", number_of_tickets: "", show_id: "", formTitle: "Buy Ticket" }} handleSubmit={handeleCreateReservation} />
                    }
                    {
                        showResultsCreateReservationPage &&
                        <ShowResultsCreateEvent formData={{ ...stateCreateReservation }} />
                    }
                    {
                        showCreateEventPage &&
                        <CreateEvent formData={{ email: "", number_of_tickets: "", show_name: "", show_date: "", show_time: "", show_room: "", show_comedians: "" }} handleSubmit={handleCreateEvent} />
                    }
                    {
                        showResultsCreateEvent &&
                        <ShowResultsCreateEvent formData={{ ...stateCreateEvent }} />
                    }
                </section>
                <div className="holy-grail-sidebar-1 hg-sidebar" />
                <div className="holy-grail-sidebar-2 hg-sidebar" />
            </div>
        </>
    );
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);
