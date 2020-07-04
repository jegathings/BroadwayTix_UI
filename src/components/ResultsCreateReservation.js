import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.formData);

    React.useEffect(() => {
        setFormData(props.formData);
        console.log("Form Data", props.formData);
    }, [props.formData]);
    return (
        <>
            <h1>Your Comedy Reservation</h1>
            <div key={formData.id + "1"}>Show Name</div><br />
            <div key={formData.id + "2"}>{formData.show_name}</div>
            <div key={formData.id + "7"}>Show Date</div><br />
            <div key={formData.id + "8"}>{formData.show_date}</div>
            <div key={formData.id + "9"}>Show Time</div>
            <div key={formData.id + "10"}>{formData.show_time}</div>
            <div key={formData.id + "3"}>Show Id</div><br />
            <div key={formData.id + "4"}>{formData.id}</div><br />
            <div key={formData.id + "5"}>Number Of Tickets</div><br />
            <div key={formData.id + "6"}>{formData.number_of_tickets}</div>
        </>
    );
}