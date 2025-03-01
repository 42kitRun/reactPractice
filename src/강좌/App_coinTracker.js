import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true); //loading y/n
  const [coins, setCoins] = useState([]); //all coin list
  const [selectedCoin, setSelectedCoin] = useState([]);
  const [inputValue, setInputValue] = useState(); // 입력 값

  console.log(selectedCoin, "selectedCoin");
  console.log(inputValue, "inputValue");

  const handleSelectChange = (e) => {
    setSelectedCoin(e.target.value); // 선택된 [coin.name,coin.symbol,coin.quotes.USD.price] 저장
    console.log(selectedCoin, "selectedCoin_test");
    setSelectedCoin((prev) => {
      // 마지막 요소만 변경한 새 배열 생성
      const next = prev.split(",");
      return [...next.slice(0, -1), (+next[2]).toFixed(3)];
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // 입력 값을 상태에 저장
    setSelectedCoin((prev) => {
      // 마지막 요소만 변경한 새 배열 생성
      return [...prev.slice(0, -1), (1 / selectedCoin[2]) * value];
    });
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((Response) => Response.json())
      .then((json) => setCoins(json));
    setLoading(false);
  }, []);
  return (
    <div>
      <h1> The Coins! {loading ? null : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={handleSelectChange}>
          <option value={[]}>Select a coin</option>
          {coins.map((coin, index) => (
            <option
              key={index}
              value={[coin.name, coin.symbol, coin.quotes.USD.price]}
            >
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <div>
        {selectedCoin[0]} {selectedCoin[2]} {selectedCoin[1]} : $
        <input
          type="number"
          value={inputValue}
          placeholder="input your USD"
          onChange={handleInputChange}
        ></input>{" "}
        USD
      </div>
    </div>
  );
}

export default App;
