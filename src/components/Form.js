import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.formData);

    React.useEffect(() =>{
        setFormData(props.formData);
    }, [props.formData]);
    const handleChange = (event) =>{
        setFormData({ ...formData, [event.target.name]: event.target.value})
    }

    return (
        <>        
        <h3>Buy Ticket</h3>
            <div >
                <div >
                    <label htmlFor="first_name">First Name</label><br/>
                    <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="last_name">Last Name</label><br/>
                    <input
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="email">Email</label><br/>
                    <input
                    name="email"
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="number_of_tickets">Number Of Tickets</label><br/>
                    <input
                    name="number_of_tickets"
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="show_id">Show Id</label><br/>
                    <input
                    type="text"
                    name="show_id"
                    onChange={handleChange}
                    /><br/>
                    <button
                        onClick={() =>{
                            props.handleSubmit(formData);
                        }}
                        >&#10004;</button>
                </div>
            </div>
        </>
    );
};
