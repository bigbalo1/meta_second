


const Person = ({name, age}) => {
    return(<div style={{marginLeft: "700px", justifyContent: "center",marginBottom: "10px", border: "2px solid  black", width: "500px", display: "block"}}>
        <span style={{marginRight: "20px"}}>Name: {name}</span>
        <span>Age: {age}</span>
    </div>);
}

export default Person;