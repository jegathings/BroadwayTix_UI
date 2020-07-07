<div>
<div >
    <h1>Login Page</h1>
</div>
<div>
    <div>
        <label htmlFor="email">Email</label><br />
        <input
            name="email"
            value={formData.email}
            onChange={handleChange}
        /><br />
        <label htmlFor="password">Password</label><br/>
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
        <button
            onClick={() => {
                props.handle
            }}
        >
        </button>
    </div>
</div>
</div>