
const Input = (props) => {
    return <>
        <label htmlFor={props.name}>{props.name}</label>
        <input className="custom-input" onChange={props.onChange} type={props.type} name={props.name}/>
    </>
}

export default Input;