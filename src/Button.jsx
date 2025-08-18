

const Button = (props) => {
    return <button className="custom-button" onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
}


export default Button;