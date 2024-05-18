// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract People{

    struct Person{
        string name;
        uint8 age;
    }

    Person[] persons;

    function createPerson(string calldata _name, uint8 _age) public {
        persons.push(Person(_name, _age));
    }

    function getPerson(uint index) external view returns(Person memory){
        return persons[index];
    }

    function getPeople() public view returns (Person[] memory) {
        return persons;
    }
}
