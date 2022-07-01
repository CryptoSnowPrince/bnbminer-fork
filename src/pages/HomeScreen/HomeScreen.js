import React, { useState } from "react";
import gif from "../../assets/New-450-Day-Website 425x133-banner.gif"
import {
    FaInstagram,
    FaTwitter,
    FaDiscord,
} from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";

export default function HomeScreen(props) {
    console.log(props.lastHatch)
    const [depositAmount, setDepositAmount] = useState(0);
    return (
        <div className="mt-80 mb-4">
            <div className="mw-800 m-auto mb-2 fs-5">BNB In Account</div>
            <div className="d-flex mw-800 m-auto">
                <ProgressBar completed={(props.lastHatch) > (24 * 60 * 60) ? 100 : Number((props.lastHatch * 100 / (24 * 60 * 60)).toFixed(2))} className="w-100 progress-bar-m" />
            </div>
            <div className="mw-800 d-flex m-auto mb-2 style-1 mt-4 justify-content-between fs-2">
                <div className="">
                    <div>{props.web3Provider ? (props.userMinerAmount ? (props.userMinerAmount + "Million Miners") : "0.00 Miners") : "- Miners"}  </div>
                    <div>{props.web3Provider ? (props.userBnbAmount ? props.userBnbAmount : "0") : "-"} BNB In Wallet</div>
                </div>
                <div>
                    <div>Contract</div>
                    <div>{props.contractBnbAmount ? props.contractBnbAmount : "0"} BNB</div>
                </div>
            </div>
            <div className="d-flex mw-800 justify-content-center m-auto gap-5 flex-column flex-md-row mt-4 mb-5">
                <div className="d-flex flex-column" style={{ flex: 1 }}>
                    <div>
                        <div className="fs-5 mb-4">Rewards</div>
                    </div>
                    <div className="style-2">
                        <div className="mt-4"><button className="button-2" onClick={props.handleCompound}> Compound</button></div>
                        <div className="mt-3"><button className="button-2" onClick={props.handleClaim}> Claim BNB</button></div>
                        <div className="mt-3"><button className="button-2"> <a className="text-decoration-none" style={{ color: "unset" }} href="https://pancakeswap.finance/swap?outputCurrency=0x27f68fbf0b6457f00ffe12f7b7bca8103eb36728">Buy SafeMutual</a></button></div>
                        <div className="d-flex justify-content-between mt-5 mb-5 gap-5">
                            <button className="button-4" onClick={() => props.handleDeposit(depositAmount)}>Make Deposit</button>
                            <input placeholder="0 BNB" type="number" className="bnb-amount" min={0} value={depositAmount} onChange={(e) => { setDepositAmount(e.target.value) }} />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column" style={{ flex: 1 }}>
                    <div className="f-flex flex-column">
                        <div className="fs-5 mb-4"> Referral</div>

                    </div>
                    <div className="style-2">
                        <div className="d-flex justify-content-between" style={{ color: "#a19898" }}>
                            <div >You Earn</div>
                            <div>BNB Earned</div>
                        </div>
                        <div className="d-flex justify-content-between fw-bold fs-4">
                            <div>10%</div>
                            <div>0</div>
                        </div>
                        <div className="d-flex justify-content-between" style={{ color: "#a19898" }}>
                            <div>per referral deposit</div>
                            <div>$0</div>
                        </div>
                        <div className="fs-5 mt-4 mb-4">
                            Referral Link
                        </div>
                        <div className="chain-claim-message">
                            Share your referral link with anyone that would like to earn 3% daily. 10% of the amount they invest will be sent to your account balance in the form of BNB.
                        </div>
                        {
                            props.web3Provider ? (
                                <div style={{ cursor: "pointer" }} className="button-3 mb-4" onClick={() => { navigator.clipboard.writeText("https://www.safemutual.com?ref=" + props.account) }}>https://www.safemutual.com?ref={props.account}
                                </div>
                            ) : (
                                <div className="button-3 mb-4" >Please connect your wallet for your referral link.
                                </div>
                            )
                        }
                        <div><button className="button-2">Claim</button></div>
                    </div>
                    {/* <div className="fs-6 fw-blod mt-4">
                        Share SAFEMUTUAL & earn BNB
                    </div>
                    <div className="mb-2 mt-2" style={{ color: "#a19898" }}> SAFEMUTUAL tokens purchased through your unique link rewards you with a part of the transaction.</div> */}
                </div>
            </div>
            <div className="d-flex gap-3 mt-120 mb-4 flex-column mw-800 justify-content-center m-auto">
                <div style={{ flex: 1 }}>
                    <div className="mb-1 " style={{ fontSize: "20px" }}>Compound</div>
                    <div className="detail-message">You have the option of compounding the BNB to grow your TVL and give you even more earning power. Compound your earnings and watch your balance grow a little faster every day. We have seen people compound multiple times a day and grow their daily BNB distribution as much as 0.25 BNB.</div>
                    {/* <div className="text-center"><a href="https://safemutual.com/services/lower-transaction-costs/" className="learn-more text-decoration-none">Learn More</a></div> */}
                </div>
                <div style={{ flex: 1 }}>
                    <div className=" mb-1" style={{ fontSize: "20px" }}>Claim</div>
                    <div className="detail-message">You can claim your rewards at any time. When you do claim, you will notice that your TVL will drop little by little every day and over time can affect the daily amount that you are rewarded. These earnings are sent directly into your wallet in the form of BNB.</div>
                    {/* <div className="text-center"><a href="https://safemutual.com/services/c2c-transactions/" className="learn-more text-decoration-none">Learn More</a></div> */}
                </div>
                <div style={{ flex: 1 }}>
                    <div className=" mb-1" style={{ fontSize: "20px" }}>Buy SafeMutual</div>
                    <div className="detail-message">You have the option of taking your earnings and buying our native token, SafeMutual, that will allow you to earn BNB reflections from simply holding the token. A portion of SafeMutual’s tokenomics also feed the miner app that will make it more attractive to outside investors and allow you to earn even more.</div>
                    {/* <div className="text-center"><a href="https://safemutual.com/services/premium-toolkit-for-brands/" className="learn-more text-decoration-none">Learn More</a></div> */}
                </div>
            </div>
        </div >
    );
}

