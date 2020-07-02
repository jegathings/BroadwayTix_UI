import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.formData);
    const [comics, setComics] = React.useState(null);

    const getInfo = async () => {
        const response = await fetch("https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/getTheComics")
        .catch((error) => console.log(error))        
        const comics = await response.json();
        setComics(comics);
    }
    React.useEffect(() => {
        getInfo()
    }, []);

    React.useEffect(() =>{
        setFormData(props.formData);
    }, [props.formData]);

    const handleChange = (event) =>{
        setFormData({ ...formData, [event.target.name]: event.target.value})
    }

    return (
        <>        
        <h3>New Show</h3>
            <div >
                <div >
                    <label htmlFor="email">Show Creator</label><br/>
                    <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="number_of_tickets">Number Of Tickets</label><br/>
                    <input
                    type="text"
                    name="number_of_tickets"
                    id="number_of_tickets"
                    value={formData.number_of_tickets}
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="show_name">Show Name</label><br/>
                    <input
                    name="show_name"
                    value={formData.show_name}
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="show_date">Show Date</label><br/>
                    <input
                    name="show_date"
                    value={formData.show_date}
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="show_time">Show Time</label><br/>
                    <input
                    type="text"
                    name="show_time"
                    value={formData.show_time}
                    onChange={handleChange}
                    /><br/>
                    {
                        comics &&
                        comics.map((comic, index) =>{
                            return (
                                <div>
                                    <input
                                    type="checkbox"
                                    key={comic.id}
                                    id={comic.id}
                                    name={comic.id}
                                    value={comic.id}
                                    />
                                    <label for={comic.id}>{comic.first_name} {comic.last_name}</label>
                                </div>
                            )
                        })
                    }
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
