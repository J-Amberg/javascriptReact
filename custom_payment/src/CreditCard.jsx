import { useState } from "react";
import "./CreditCard.css";
import Visa from "./assets/cardBrandLogos/Visa.jpg";
import MasterCard from "./assets/cardBrandLogos/MasterCard.png";
import Discover from "./assets/cardBrandLogos/Discover.png";
import AmericanExpress from "./assets/cardBrandLogos/AmericanExpress.png";
import Chip from "./assets/cardBrandLogos/CardChip.png";
import { TextField, Grid, Button } from "@mui/material";
import { useEffect } from "react";

/*list of updates to be made
  animate the values as they're being placed and removed
  maxLength on card number should be 15 for Amex and 16 for else
  animate the card brand logos?
  maxLength on sec code should be 4 for amex and 3 for else
  general styling
*/
export default function CreditCard(props) {
	const [creditCard, setCreditCard] = useState({
		name: "",
		lastName: "",
		cardNumber: "",
		securityCode: "",
		expiration: "",
	});

	const [cardBrand, setCardBrand] = useState(Visa);
	const [cardSide, setCardSide] = useState("0");

	const [formattedCardNumber, setFormattedCardNumber] = useState(
		"#### #### #### ####"
	);
	useEffect(() => {
		if (creditCard.cardNumber === "") {
			setFormattedCardNumber("#### #### #### ####");
			setCardBrand("");
			return;
		}
		let temp = creditCard.cardNumber;
		if (temp.length > 16) {
			setFormattedCardNumber("INVALID CARD");
			setCardBrand("");
		}
		let formattedString = "";
		if (temp.startsWith("4") || temp.startsWith("5") || temp.startsWith("6")) {
			//VISA starts with 4, MASTERCARD starts with 5, DISCOVER starts with 6
			if (temp.startsWith("4")) setCardBrand(Visa);
			if (temp.startsWith("5")) setCardBrand(MasterCard);
			if (temp.startsWith("6")) setCardBrand(Discover);
			for (let i = 1; i <= 16; i++) {
				if (temp[i - 1] && (i < 5 || i > 12)) {
					formattedString += temp[i - 1];
				} else if (temp[i - 1]) formattedString += "*";
				else formattedString += "#";
				if (i % 4 === 0) formattedString += " ";
			}
			setFormattedCardNumber(formattedString);
			return;
		} else if (temp.startsWith("3")) {
			//AMERICAN EXPRESS starts with 34 or 37 and is 15 numbers long
			if (
				temp.length > 1 &&
				!(temp.startsWith("34") || temp.startsWith("37"))
			) {
				setFormattedCardNumber("INVALID CARD");
				setCardBrand("");
				return;
			}
			setCardBrand(AmericanExpress);
			for (let i = 1; i <= 15; i++) {
				if (temp[i - 1] && (i < 5 || i > 10)) formattedString += temp[i - 1];
				else if (temp[i - 1]) formattedString += "*";
				else formattedString += "#";
				if (i === 4 || i === 10) formattedString += " ";
			}
			setFormattedCardNumber(formattedString);
			return;
		}
		setFormattedCardNumber("INVALID CARD");
		setCardBrand("");
	}, [creditCard.cardNumber]);

	const [formattedExpiration, setFormattedExpiration] = useState("");
	useEffect(() => {
		if (creditCard.expiration === "") {
			setFormattedExpiration("");
			return;
		}
		let expiration = creditCard.expiration;
		//invalid
		if (expiration.length > 4) {
			setFormattedExpiration("!");
			return;
		} else {
			//if / should be included
			if (expiration.length > 2) {
				setFormattedExpiration(
					expiration.substring(0, 2) + "/" + expiration.substring(2, 4)
				);
			} else setFormattedExpiration(expiration); //if no /
		}
	}, [creditCard.expiration]);

	//active fields for borders
	const [cardNumberColor, setCardNumberColor] = useState("transparent");
	const [expirationColor, setExpirationColor] = useState("transparent");
	const [cardHolderColor, setCardHolderColor] = useState("transparent");
	const [securityCodeColor, setSecurityCodeColor] = useState("transparent");
	const handleCardNumberActive = () => {
		setCardNumberColor("black");
		setExpirationColor("transparent");
		setCardHolderColor("transparent");
		setSecurityCodeColor("transparent");
		setCardSide("0");
	};
	const handleExpirationActive = () => {
		setExpirationColor("black");
		setCardNumberColor("transparent");
		setCardHolderColor("transparent");
		setSecurityCodeColor("transparent");
		setCardSide("0");
	};
	const handleCardHolderActive = () => {
		setCardHolderColor("black");
		setExpirationColor("transparent");
		setCardNumberColor("transparent");
		setSecurityCodeColor("transparent");
		setCardSide("0");
	};
	const handleSecurityCodeActive = () => {
		setCardSide("180deg");
		setSecurityCodeColor("black");
		setCardNumberColor("transparent");
		setCardHolderColor("transparent");
		setExpirationColor("transparent");
	};
	console.log(cardHolderColor);
	return (
		<Grid className="cardAndForm" container spacing={12}>
			<Grid item xs={2} />
			<Grid item xs={6}>
				<Button>Change class!</Button>
				<br />
				<TextField
					className="standardForm"
					style={{ marginBottom: "2%" }}
					id="input-with-sx"
					label="Name on Card"
					fullWidth
					onFocus={handleCardHolderActive}
					inputProps={{ maxLength: 20 }}
					value={creditCard.name}
					onChange={(e) => {
						setCreditCard({ ...creditCard, name: e.target.value });
						setCardSide("0");
					}}
				/>
				<br />
				<TextField
					className="largeForm"
					id="input-with-sx"
					label="Card Number"
					value={creditCard.cardNumber}
					onFocus={handleCardNumberActive}
					inputProps={{ maxLength: 16 }}
					onChange={(e) => {
						setCreditCard({
							...creditCard,
							cardNumber: event.target.value.replace(/\D/g, ""),
						});
						setCardSide("0");
					}}
				/>
				<TextField
					style={{ width: "20%" }}
					id="input-with-sx"
					label="Security Code"
					className="securityCodeForm"
					inputProps={{ maxLength: 4 }}
					value={creditCard.securityCode}
					onFocus={handleSecurityCodeActive}
					onChange={(e) => {
						setCreditCard({
							...creditCard,
							securityCode: e.target.value.replace(/\D/g, ""),
						});
					}}
				/>
				<TextField
					style={{ width: "20%" }}
					id="input-with-sx"
					label="Expiration"
					placeholder="MM/YY"
					inputProps={{ maxLength: 4 }}
					value={creditCard.expiration}
					onFocus={handleExpirationActive}
					onChange={(e) => {
						setCreditCard({
							...creditCard,
							expiration: e.target.value.replace(/\D/g, ""),
						});
						setCardSide("0");
					}}
				/>
			</Grid>
			<Grid item xs={4}>
				<div className="creditCard">
					<div
						className="creditCardOutline"
						style={{ transform: `rotateY(${cardSide})` }}
						onClick={() => setCardSide(cardSide === "0" ? "180deg" : "0")}
					>
						<div className="flip-creditCard-front">
							<div>
								<img className="cardBrand" src={cardBrand} />
							</div>
							<div
								style={{
									height: "50px",
								}}
							>
								<img className="cardChip" src={Chip} />
							</div>
							<h4 className="cardNumberLabel">Card Number</h4>
							<div
								className="cardNumber"
								style={{ border: `1px solid ${cardNumberColor}` }}
							>
								{formattedCardNumber}
							</div>
							<h4 className="cardHolderLabel">Card Holder</h4>
							<div
								className="cardHolder"
								style={{ border: `1px solid ${cardHolderColor}` }}
							>
								{creditCard.name}
							</div>
							<div style={{ textAlign: "center" }}>
								<h4 className="expirationLabel">Expiration</h4>
								<div
									className="expiration"
									style={{ border: `1px solid ${expirationColor}` }}
								>
									{formattedExpiration}
								</div>
							</div>
						</div>
						<div className="flip-creditCard-back">
							<div className="topStrip"></div>
							<div className="sideStrip"></div>
							<h4 className="securityCodeLabel">Sec. Code</h4>
							<div
								className="securityCode"
								style={{ border: `1px solid ${securityCodeColor}` }}
							>
								{creditCard.securityCode}
							</div>
						</div>
					</div>
				</div>
			</Grid>
		</Grid>
	);
}
