

const Button = (props) => {
    return <button className="custom-button" onClick={props.onClick}>{props.children}</button>
}


export default Button;