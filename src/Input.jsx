import clsx from "clsx";

const Input = (props) => {

    const classNames = clsx(
        "custom-input",
        props.className
    );

    return <>
        <label htmlFor={props.name}>{props.name}</label>
        <input className={classNames} onChange={props.onChange} type={props.type} name={props.name}/>
    </>
}

export default Input;