import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.formData);
    const [showLogin, setShowLogin] = React.useState(false);

    React.useEffect(()=> {
        localStorage.removeItem("login_token");
    },[]);
    
    React.useEffect(() => {
        setFormData(props.formData);
    }, [props.formData]);
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <div >
                <h1>Login Page</h1>
            </div>
            <div>
                <div>
                    <label htmlFor="email">Email</label><br />
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    /><br />
                    <label htmlFor="password">Password</label><br/>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    /><br/>
                    <button
                        onClick={() => {
                            props.handleSubmit(formData);
                        }}
                    >Submit</button>
                </div>
            </div>
        </div>
    );
}