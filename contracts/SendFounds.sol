// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "hardhat/console.sol";

contract SendFounds {
    constructor() payable {
        console.log("Inicializating");
    }

    event NewTxn(address indexed to, uint256 amount, uint256 timestamp);

    struct SendTransaction {
        address reciever;
        uint256 amount;
        uint256 timestamp;
    }

    SendTransaction[] allTxn;

    function sendFounds(address payable _to, uint256 amount) public payable {
        require(amount <= address(this).balance, "Not enough founds");
        (bool success, ) = _to.call{value: amount}("");
        require(success, "Unable to Send Ether");
        allTxn.push(SendTransaction(_to, amount, block.timestamp));
        emit NewTxn(_to, amount, block.timestamp);
    }

    function getAllTxn() public view returns (SendTransaction[] memory){
        return allTxn;
    }

}