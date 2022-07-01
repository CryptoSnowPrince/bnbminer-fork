/**
 *Submitted for verification at BscScan.com on 2022-07-01
 */

//SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract SafeMutual {
    //uint256 BNB_PER_MINERS_PER_SECOND=1;
    uint256 public constant BNB_TO_GET_MINERS = 2592000; //for final version should be seconds in a day
    uint256 constant PSN = 10000;
    uint256 constant PSNH = 5000;
    bool public initialized = false;
    address payable public treasury1;
    address payable public treasury2;
    mapping(address => uint256) public accountMiners;
    mapping(address => uint256) public claimedBNB;
    mapping(address => uint256) public lastClaim;
    mapping(address => address) public referrals;
    uint256 public marketBNB;

    constructor(address payable _treasury1, address payable _treasury2) {
        treasury1 = _treasury1;
        treasury2 = _treasury2;
    }

    function hatchBNB(address ref) public {
        require(initialized, "Not initialized");
        if (ref == msg.sender) {
            ref = address(0);
        }
        if (referrals[msg.sender] == address(0)) {
            referrals[msg.sender] = ref;
        }
        uint256 BNBUsed = getMyBNB(msg.sender);
        uint256 newMiners = BNBUsed / BNB_TO_GET_MINERS;
        accountMiners[msg.sender] = accountMiners[msg.sender] + newMiners;
        claimedBNB[msg.sender] = 0;
        lastClaim[msg.sender] = block.timestamp;

        //send referral BNB
        claimedBNB[referrals[msg.sender]] =
            claimedBNB[referrals[msg.sender]] +
            BNBUsed /
            10;

        //boost market to combat miners hoarding
        marketBNB = marketBNB + BNBUsed / 5;
    }

    function sellBNB() external {
        require(initialized, "Not initialized");
        uint256 hasBNB = getMyBNB(msg.sender);
        uint256 BNBValue = calculateBNBell(hasBNB);
        uint256 fee = devFee(BNBValue);
        uint256 halfFee = fee / 2;
        claimedBNB[msg.sender] = 0;
        lastClaim[msg.sender] = block.timestamp;
        marketBNB = marketBNB + hasBNB;

        (bool sent1, ) = treasury1.call{value: halfFee}("");
        require(sent1, "ETH transfer Fail");

        (bool sent2, ) = treasury2.call{value: fee - halfFee}("");
        require(sent2, "ETH transfer Fail");

        (bool sent, ) = msg.sender.call{value: BNBValue - fee}("");
        require(sent, "ETH transfer Fail");
    }

    function buyBNB(address ref) public payable {
        require(initialized, "Not initialized");
        uint256 BNBBought = calculateMinerBuy(
            msg.value,
            address(this).balance - msg.value
        );
        BNBBought = BNBBought - devFee(BNBBought);
        uint256 fee = devFee(msg.value);
        uint256 halfFee = fee / 2;
        claimedBNB[msg.sender] = claimedBNB[msg.sender] + BNBBought;

        hatchBNB(ref);

        (bool sent1, ) = treasury1.call{value: halfFee}("");
        require(sent1, "ETH transfer Fail");

        (bool sent2, ) = treasury2.call{value: fee - halfFee}("");
        require(sent2, "ETH transfer Fail");
    }

    //magic trade balancing algorithm
    function calculateTrade(
        uint256 rt,
        uint256 rs,
        uint256 bs
    ) public pure returns (uint256) {
        return (PSN * bs) / (PSNH + (PSN * rs + PSNH * rt) / rt);
    }

    function calculateBNBell(uint256 BNB) public view returns (uint256) {
        return calculateTrade(BNB, marketBNB, address(this).balance);
    }

    function calculateMinerBuy(uint256 eth, uint256 contractBalance)
        public
        view
        returns (uint256)
    {
        return calculateTrade(eth, contractBalance, marketBNB);
    }

    function calculateMinerBuySimple(uint256 eth)
        public
        view
        returns (uint256)
    {
        return calculateMinerBuy(eth, address(this).balance);
    }

    function devFee(uint256 amount) public pure returns (uint256) {
        return (amount * 5) / 100;
    }

    function seedMarket() external payable {
        require(marketBNB == 0, "marketBNB is not zero");
        initialized = true;
        marketBNB = 2592 * (10**8);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getMyMiners(address account) external view returns (uint256) {
        return accountMiners[account];
    }

    function getMyBNB(address account) public view returns (uint256) {
        return claimedBNB[account] + getBNBSinceLastHatch(account);
    }

    function getBNBSinceLastHatch(address adr) public view returns (uint256) {
        uint256 secondsPassed = min(
            BNB_TO_GET_MINERS,
            block.timestamp - lastClaim[adr]
        );
        return secondsPassed * accountMiners[adr];
    }

    function min(uint256 a, uint256 b) private pure returns (uint256) {
        return a < b ? a : b;
    }
    
}
