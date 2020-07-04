import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.formData);

    React.useEffect(() => {
        console.log(props.formData);
        setFormData(props.formData);
    }, [props.formData]);
    return (
        <>
            <h1>Receipt Page</h1>
            <div key={formData.id + "1"}><h1>Show Name</h1></div>
            <div key={formData.id + "2"}>{formData.show_name}</div>
            <div key={formData.id + "3"}><h1>Show Id</h1></div>
            <div key={formData.id + "4"}>{formData.id}</div>
            <div key={formData.id + "5"}><h1>Number Of Tickets</h1></div>
            <div key={formData.id + "6"}>{formData.number_of_tickets}</div>
            <div key={formData.id + "7"}><h1>Show Date</h1></div>
            <div key={formData.id + "8"}>{formData.show_date}</div>
            <div key={formData.id + "9"}><h1>Show Time</h1></div>
            <div key={formData.id + "10"}>{formData.show_time}</div>
        </>
    );
}