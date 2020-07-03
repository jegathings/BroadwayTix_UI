import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import Form from './components/Form';
import ComedyShow from './components/ComedyShow'
import Login from './components/Login'

const App = (props) => {
    const STREET_TEAM_PURCHASE = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/post"
    const CREATE_SHOW = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/createShow"
    const DO_LOGIN = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/login";
    const [streetTeam, setStreetTeam] = React.useState(false);
    const [createShow, setCreateShow] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(true);

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
        console.log("Start handle create show");
        const response = await fetch(`${CREATE_SHOW}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(contents => console.log("Content", contents))
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }

    const handleLogin = async (data) => {
        console.log("Start handle login");
        console.log("Data", data);
        const response = await fetch(`${DO_LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(contents => {
                console.log("Content", contents)
                setShowLogin(false);
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
        console.log("Response", response);
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
                    }}>Street Team</button>
                    <button onClick={() => {
                        setStreetTeam(false);
                        setCreateShow(true);
                    }}>Add Show</button>
                </nav>
            }
            {
                showLogin &&
                <Login formData={{ email: "", password: "" }} handleSubmit={handleLogin} />
            }
            {
                streetTeam && !showLogin &&
                <Form formData={{ first_name: "", last_name: "", email: "", broadway_role: "", number_of_tickets: "", show_id: "", formTitle: "Create New Recipe" }} handleSubmit={handleStreetTeamPurchase}></Form>
            }
            {
                createShow && !showLogin &&
                <ComedyShow formData={{ email: "", number_of_tickets: "", show_name: "", show_date: "", show_time: "", show_room: "", show_comedians: "" }} handleSubmit={handleCreateShow} />
            }
        </>
    );
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);
