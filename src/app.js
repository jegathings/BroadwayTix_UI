import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import Form from './components/Form';
import ComedyShow from './components/ComedyShow'
import Login from './components/Login'
import ShowResults from './components/CreateShowResults'

const App = (props) => {
    const STREET_TEAM_PURCHASE = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/post"
    const CREATE_SHOW = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/createShow"
    const DO_LOGIN = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/login";
    const [streetTeam, setStreetTeam] = React.useState(false);
    const [createShow, setCreateShow] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(true);
    const [createShowResults, setCreateShowResults] = React.useState(null);
    const [results, setResults] = React.useState(false);
    
    const handleStreetTeamPurchase = async (data) => {
        const response = await fetch(`${STREET_TEAM_PURCHASE}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(contents => console.log("Contents", contents))
            .catch((error) => console.log(error))
    }

    const handleCreateShow = async (data) => {
        const response = await fetch(`${CREATE_SHOW}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .catch((error) => console.log(error))
        console.log("handleCreateShowResponse", response);
        setResults(true);
        setShowLogin(false);
        setStreetTeam(false);
        setCreateShow(false);
        setCreateShowResults({id:response.id.S,
            number_of_tickets: response.number_of_tickets.S,
            show_comedians: response.show_comedians.S,
            show_date: response.show_date.S,
            show_time: response.show_time.S,
            show_name: response.show_name.S
            })
    }

    const handleLogin = async (data) => {
        console.log("Removing login token");
        await fetch(`${DO_LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)})        
        .then(response => response.text())
        .then( token => {
            console.log("The token", token);
            localStorage.setItem("login_token", token);
            setShowLogin(false);})
        .catch((error) => console.log(error));
    }

    return (
        <>
            <h1>Comedy Ticket Hub</h1>
            {
                !showLogin &&
                <nav>
                    <button onClick={() => {
                        setStreetTeam(true);
                        setCreateShow(false);
                        setShowLogin(false);
                        setCreateShowResults(null);
                    }}>Street Team</button>
                    <button onClick={() => {
                        setCreateShow(true);
                        setStreetTeam(false);
                        setShowLogin(false);
                        setCreateShowResults(null);
                    }}>Add Show</button>
                    <button onClick={() => {
                        setCreateShow(false);
                        setStreetTeam(false);
                        setShowLogin(true);
                        setCreateShowResults(null);
                        localStorage.removeItem("login_token");
                    }}>Logout</button>

                </nav>
            }
            {
                showLogin &&
                <Login formData={{ email: "", password: "" }} handleSubmit={handleLogin} />
            }
            {
                createShowResults &&
                <ShowResults formData={{id:createShowResults.id,
                                        number_of_tickets: createShowResults.number_of_tickets,
                                        show_comedians: createShowResults.show_comedians,
                                        show_date: createShowResults.show_date,
                                        show_time: createShowResults.show_time,
                                        show_name: createShowResults.show_name
                                        }}/>
            }
            {
                streetTeam && 
                <Form formData={{ first_name: "", last_name: "", email: "", broadway_role: "", number_of_tickets: "", show_id: "", formTitle: "Buy Ticket" }} handleSubmit={handleStreetTeamPurchase}></Form>
            }
            {
                createShow && 
                <ComedyShow formData={{ email: "", number_of_tickets: "", show_name: "", show_date: "", show_time: "", show_room: "", show_comedians: "" }} handleSubmit={handleCreateShow} />
            }
        </>
    );
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);
