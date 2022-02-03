import Button from "./Button";

const Header = () => {
    const onClick = () => {
        console.log("Add button clicked")
    }
    
    return (
        <header className="header">
            <h1>Task Tracker App</h1>
            <Button color='steelblue' text="Add Task" onClick={ onClick }/>
        </header>
    )
}

export default Header;
