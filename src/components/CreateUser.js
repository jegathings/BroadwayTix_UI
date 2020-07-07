import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.formData);
    const [invalidLogin, setInvalidLogin] = React.useState(false);

    React.useEffect(() => {
        const token = localStorage.getItem("login_token");
        if (token && token.indexOf(token.indexOf("Invalid") === -1)) {
            setInvalidLogin(true);
        }
    }, []);

    React.useEffect(() => {
        setFormData(props.formData);
    }, [props.formData]);
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    return (
        <div className="create_user">
            <div className="create_user_header">
                <h1>Create User</h1>
                {/* {
                invalidLogin &&
                    <div className="invalid_login">You have entered an invalid login.  Please register.</div>
            } */}
            </div>
            <div className="create_user_input">
                <div className="create_user_input_row">
                    <label htmlFor="First Name">First Name</label>
                    <input
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="create_user_input_row">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="create_user_input_row">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="create_user_input_row">
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    /><br />
                </div>
                <button
                    onClick={() => {
                        props.handleSubmit(formData);
                    }}
                >submit</button>
            </div>
        </div>
    );
}