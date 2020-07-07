import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.formData);

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
                <h1>Create User</h1>
            </div>
            <div>
                <div>
                    <label htmlFor="First Name">First Name</label>
                    <input
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        /><br/>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        /><br/>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    /><br />
                    <label htmlFor="password">Password</label>
                    <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    /><br/>
                    <button
                        onClick={() => {
                            props.handleSubmit(formData);
                        }}
                    >&#10004;</button>

                </div>
            </div>
        </div>
    );
}