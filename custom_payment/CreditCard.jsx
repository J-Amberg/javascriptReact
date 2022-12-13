import { useState } from "react";
import "./CreditCard.css";
import Visa from "./assets/cardBrandLogos/Visa.jpg";
import MasterCard from "./assets/cardBrandLogos/MasterCard.png";
import Discover from "./assets/cardBrandLogos/Discover.png";
import AmericanExpress from "./assets/cardBrandLogos/AmericanExpress.png";
import Chip from "./assets/cardBrandLogos/CardChip.png";
import { TextField, Grid, Button } from "@mui/material";
import { useEffect } from "react";

export default function CreditCard(props) {
  const [creditCard, setCreditCard] = useState({
    firstName: "",
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
    let cardNumber = creditCard.cardNumber;
    let temp = "";
    for (let i = 0; i < cardNumber.length; i++) {
      //remove spaces
      if (cardNumber[i] !== " ") temp += cardNumber[i];
    }
    let formattedString = "";
    if (temp.startsWith("4") || temp.startsWith("5") || temp.startsWith("6")) {
      //VISA starts with 4, MASTERCARD starts with 5, DISCOVER starts with 6
      if (temp.startsWith("4")) setCardBrand(Visa);
      if (temp.startsWith("5")) setCardBrand(MasterCard);
      if (temp.startsWith("6")) setCardBrand(Discover);
      for (let i = 1; i <= 16; i++) {
        if (temp[i - 1]) {
          formattedString += temp[i - 1];
        } else formattedString += "#";
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
        if (temp[i - 1]) formattedString += temp[i - 1];
        else formattedString += "#";
        if (i === 4 || i === 10) formattedString += " ";
      }
      setFormattedCardNumber(formattedString);
      return;
    }
    setFormattedCardNumber("INVALID CARD");
    setCardBrand("");
  }, [creditCard.cardNumber]);
  const [formattedExpiration, setFormattedExpiration] = useState("MM/YY");
  useEffect(() => {
    let expiration = creditCard.expiration;
    if (expiration.length > 5) {
      return;
    }
  }, [creditCard.expiration]);

  console.log(formattedCardNumber);
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
          label="First Name"
          value={creditCard.firstName}
          onChange={(e) => {
            setCreditCard({ ...creditCard, firstName: e.target.value });
            setCardSide("0");
          }}
        />
        <TextField
          className="standardForm"
          id="input-with-sx"
          label="Last Name"
          value={creditCard.lastName}
          onChange={(e) => {
            setCreditCard({ ...creditCard, lastName: e.target.value });
            setCardSide("0");
          }}
        />
        <br />
        <TextField
          className="largeForm"
          id="input-with-sx"
          label="Card Number"
          value={creditCard.cardNumber}
          onChange={(e) => {
            setCreditCard({ ...creditCard, cardNumber: e.target.value });
            setCardSide("0");
          }}
        />
        <TextField
          style={{ width: "20%" }}
          id="input-with-sx"
          label="Security Code"
          className="securityCodeForm"
          value={creditCard.securityCode}
          onChange={(e) => {
            setCreditCard({ ...creditCard, securityCode: e.target.value });
            setCardSide("180deg");
          }}
        />
        <TextField
          style={{ width: "20%" }}
          id="input-with-sx"
          label="Expiration"
          placeholder="MM/YY"
          value={creditCard.expiration}
          onChange={(e) => {
            setCreditCard({ ...creditCard, expiration: e.target.value });
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
              <div style={{ height: "100px", width: "200px" }}>
                <img className="cardChip" src={Chip} />
              </div>
              <div className="cardNumber">{formattedCardNumber}</div>
              <div className="expiration">{creditCard.expiration}</div>
              <div className="cardHolder">
                {creditCard.firstName} {creditCard.lastName}
              </div>
            </div>
            <div className="flip-creditCard-back">
              {creditCard.securityCode}
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

function applyState(setState = () => {}, key = "key", value) {
  setState((cur) => {
    let temp = { ...cur };
    temp[key] = value;
    return temp;
  });
}
