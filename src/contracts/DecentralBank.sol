// SPDX-License-Identifier: MIT
pragma solidity ^0.5.8;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    address public owner;
    string public name = "Decentral Bank";
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        owner = msg.sender;
        rwd = _rwd;
        tether = _tether;
    }

    // staking function
    function depositTokens(uint256 _amount) public {
        require(_amount > 0, "Amount cannot be zero");

        // approve transfer
        // tether.approve(msg.sender, _amount);
        // transfer tether tokens to thiscontract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // update staking balance

        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // unstake token
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];

        require(balance > 0, "Balance cannot be less than zero");

        // reset staking balance
        stakingBalance[msg.sender] == 0;

        // update staking status
        isStaking[msg.sender] = false;

        tether.transfer(msg.sender, balance);
    }

    // issue rewards
    function issueTokens() public {
        // only owner can issue token
        require(msg.sender == owner, "caller must be the owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if (balance > 0) {
                rwd.transfer(recipient, balance / 9); // /9 to create percentage incentive for staking
            }
        }
    }
}
