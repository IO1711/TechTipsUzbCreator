
const AddAppForm = (props) => {
    return <form onSubmit={props.onFormSubmit}>
        <label htmlFor="app-name">App name:</label>
        <input type="text" id="app-name" value={props.appName} onChange={props.onNameChange} />
        <input type="submit" value="Save" />
    </form>
}

export default AddAppForm;