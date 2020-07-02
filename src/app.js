import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import Form from './components/Form';
import EditForm from './components/EditForm';



const App = (props) => {
    const STREET_TEAM_PURCHASE = "https://4o319y7qe2.execute-api.us-east-1.amazonaws.com/dev/post"
    // const addBookmarkPlaceholder = 'Add Bookmark';
    // const EditBookmarkPlaceholder = 'Edit';
    const [bookmarks, setBookmarks] = React.useState(null);
    const [showEditOrCreate, setShowEditOrCreate] = React.useState(false);
    //This is test code, I used to figure out how react works
    const [state,setState] = React.useState({hello:'hello world', cheese:'gouda'});
    //This is test code, I used to figure out how react works
    const [stat1,setStat1] = React.useState({id:'999999999',title:"blood orange", url:"url"});
    /////// sets state for editing
    const [editBookmark, setEditBookmark] = React.useState({
        id:'',
        title: '',
        url: '',
    });
    const baseURL = 'https://assembled-bookmarks.herokuapp.com';    
    const blank = {title:'', url:''};
    
    const getInfo = async() =>{
        const response = await fetch(`${baseURL}/bookmarks/index`);
        const result = await response.json();
        setBookmarks(result);
    }

    React.useEffect(() => {
        getInfo()
    },[]);

    const handleStreetTeamPurchase = async (data) => {
        const response = await fetch(`${STREET_TEAM_PURCHASE}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }).
        catch((err) => {
            console.log(err);
        }); 
        console.log("Response", response);
    }

    const handleSelect = async (bookmark) =>{
        setEditBookmark({...editBookmark, id: bookmark._id, title:bookmark.title, url:bookmark.url});
        // console.log("Edit bookmark", editBookmark);
        // console.log("Bookmark", bookmark);
    };

    const handleEdit = async (data) => {
        const response = await fetch(
            `${baseURL}/bookmarks/update/${data.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );
        //grab the updated list of holidays
        getInfo();
        //We do not want to display the edit route after we have competed an edit.
        //This will toggle back to displaying the create functionality.
        setShowEditOrCreate(!showEditOrCreate);
    };

    const handleDelete = async (data) =>{
        const respone = await fetch(
            `${baseURL}/bookmarks/delete/${data._id}`,
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            }
        )
        getInfo();
    }

    return (
        <>
            <Form handleSubmit={handleStreetTeamPurchase}></Form>
        </>
    );
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);
