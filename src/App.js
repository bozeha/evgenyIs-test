import styled from 'styled-components';
import { PieChart } from 'react-minimal-pie-chart';
import { useState, useRef } from 'react';
import axios from 'axios';


function App() {
  const [displayPie, setDisplayPie] = useState(false);
  const [first, setFirst] = useState(33);
  const [second, setSecond] = useState(33);
  const [third, setThird] = useState(33);
  const [ilsName, setIlsName] = useState("name");
  const [ilsCurrency, setIlsCurrency] = useState("currency");
  const [ilsValue, setIlsValue] = useState("value");
  const buttonControler = useRef(null);
  const ShowPie = () => {
    setFirst(Math.floor(Math.random() * 33));
    setSecond(Math.floor(Math.random() * 33));
    setThird(Math.floor(Math.random() * 33));
    setDisplayPie(true);
    buttonControler.current.disabled = true;
    setTimeout(() => {
      setDisplayPie(false);
      buttonControler.current.disabled = false;
    }, 5000);
    axios.get('https://api.coingecko.com/api/v3/exchange_rates').then(
      res => {
        console.log(res.data.rates.ils);
        setIlsName(res.data.rates.ils.name);
        setIlsValue(res.data.rates.ils.value);
        setIlsCurrency(res.data.rates.ils.unit);
      }

    )
  }
  return (
    <div className="App">

      <PieBlock>{displayPie &&
        <PieChart radius={50}
          data={[
            { title: 'One', value: first, color: '#E38627' },
            { title: 'Two', value: second, color: '#C13C37' },
            { title: 'Three', value: third, color: '#6A2135' },
          ]}
        />
      }
        <Ils>
          <h3>Ils:</h3>
          <h3>{ilsName}</h3>
          <h3>{ilsCurrency}</h3>
          <h3>{ilsValue}</h3>
        </Ils>
        <button ref={buttonControler} onClick={() => ShowPie()}>Click me</button>
      </PieBlock>

    </div>
  );
}

const PieBlock = styled.div`
  height:300px;
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  align-items: center;
  button{
    width:100px;
    height:50px;
    margin-top:20px;
  }
`;
const Ils = styled.div`
display:flex;
flex-direction:row;
justify-content:center;
width:400px;
h3{
  padding:5px;
}
`;

export default App;
