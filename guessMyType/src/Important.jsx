function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const getRandomColor = () => {
  let myColor = getRandomInt(11);
  switch (myColor) {
    case 1:
      return "blue";
    case 2:
      return "red";
    case 3:
      return "white";
    case 4:
      return "purple";
    case 5:
      return "black";
    case 6:
      return "yellow";
    case 7:
      return "chartreuse";
    case 8:
      return "chocolate";
    case 9:
      return "orange";
    case 10:
      return "hotpink";
  }
};
const Important = ({ userType }) => {
  return (
    <div className="itsALifeStyle">
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
      <p style={{ color: getRandomColor() }}>{userType}</p>
    </div>
  );
};
export default Important;
