import { useState } from "react";
import Web3 from 'web3'; // Import web3 library

import contractABI from "../constants/abi.json";
import "../App.css";
import Person from "./Person";

function Contracting() {
  const contractAddress = "0x63C328A88d9D4fdAF2f4aCF63ac85C2641527CaE";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  function getContractInstance() {
    const provider = new Web3(window.ethereum); // Use Web3 instance
    const contract = new provider.eth.Contract(
      contractABI,
      contractAddress
    );

    return contract;
  }

  const [inputName, setInputName] = useState("");
  const [inputAge, setInputAge] = useState(0);
  const [getmsg, setGetmsg] = useState([]);
  const [index, setIndex] = useState(0);
  const [per, setPer] = useState({});

  async function sendMessageToContract() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await requestAccount();
        const contract = getContractInstance();

        if(inputName !== "" && inputAge > 0 && inputAge <= 255){
          const tx = await contract.methods.createPerson(inputName, inputAge).send({ from: window.ethereum.selectedAddress });
          // await tx.wait();
          
          setInputAge(0);
          setInputName(""); 
          alert("sent successfully");
        } else {
          alert("input boxes cannot be empty");
        }
      } catch (err) {
        console.error("Error setting message:", err);
        alert("Error setting message. Please check the console for details.");
      }
    }
  }

  async function getMessageFromContract() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await requestAccount();
        const contract = getContractInstance();

        const message = await contract.methods.getPeople().call();

        console.log("message here is ", message);
        setGetmsg(message);
        alert("All People retrieval successful");
      } catch (err) {
        console.error("Error getting message:", err);
        alert("Error getting message. Please check the console for details.");
      }
    }
  }

  async function getPersonFromContract() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await requestAccount();
        const contract = getContractInstance();

        const message = await contract.methods.getPerson(index).call();

        console.log("message here is ", message);
        setPer(message);
        alert("Person retrieval successful");
      } catch (err) {
        console.error("Error getting message:", err);
        alert("Error getting message. Please check the console for details.");
      }
    }
  }

  const handleSetNameChange = (e) => setInputName(e.target.value);

  const handleSetAgeChange = (e) => setInputAge(e.target.value);

  const handleChangeIndex = (e) => setIndex(e.target.value);

  const clearMessage = () => {
    setGetmsg([]);
  }


  return (
    <div className="App">
      <div>
        <h1>Big Ballo Registry</h1>
        <h2>Smart Contract with DApp Integration</h2>
        <br />
        <input
          type="text"
          placeholder="enter name here"
          value={inputName}
          onChange={handleSetNameChange}
          required
        />
        <input
          type="number"
          placeholder="enter age here"
          value={inputAge}
          onChange={handleSetAgeChange}
          required
        />
        <button onClick={sendMessageToContract}>Send</button>
        <br /><br />
        <input
          type="number"
          placeholder="enter index here"
          value={index}
          onChange={handleChangeIndex}
          required
        />
        <button onClick={getPersonFromContract}>Get Person</button>
        <br /><br />
        <div>
          <Person
            name={per.name}
            age={Number(per.age)}
          />
        </div>
        <button onClick={getMessageFromContract}>Get All Person</button>
        <br /> <br />
      </div>
      <div>
        {getmsg.map((person, index) => (
          <Person
            key={index}
            name={person.name}
            age={Number(person.age)}
          />
        ))}
        <button onClick={clearMessage}>Clear message</button>
      </div>
    </div>
  );
}

export default Contracting;

