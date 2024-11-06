import React, { useRef, useState} from 'react'
import axios from 'axios'
import logo from './assets/nba-logo.png'

const App = () => {

  const playerName = useRef(null);
  const [search, setSearch] = useState({});
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // Fetch data
  async function fetchData(){
    const name = playerName.current.value;
    try{
      const response = await axios.get(`http://rest.nbaapi.com/api/PlayerDataTotals/name/${name}`);
      console.log(response.data);
      setData(response.data);
      setSearch(response.data[0]);
      setCount(0);
    }
    catch (error){
      console.log(error);
    }
  }
  
  // Function for searching
  function searchPlayer(){
    fetchData();
  }

  // Next data function
  const addCount = () =>{
    if (count < data.length - 1) {
      setCount((prevCount) => prevCount + 1);
      setSearch(data[count + 1]);
    }
  }

  // Prev data function
  const subCount = () =>{
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
      setSearch(data[count - 1]);
    }
  }

  return (
    <>      
      <div className='h-[80vh] w-96 flex flex-col items-center justify-between p-3 bg-blue-900 rounded'>
        <div className='w-full text-center'>
          <div className='flex items-center justify-center'>
            <img src={logo} alt="" className='w-8'/>
            <h3 className='font-bold text-white'>NBA Player</h3>
          </div>       
        <input type='text' ref={playerName} placeholder='Enter Player Name' className='px-1 border border-gray-500'/>
        <button className='px-1 ml-1 text-white rounded cursor-pointer bg-slate-500 hover:bg-slate-600 active:bg-slate-700' onClick={searchPlayer}>Search</button>
        </div>
        <div>
        
        </div>        
        <div className='relative w-full h-full p-3 mt-3 overflow-visible rounded-sm min-h-64 bg-slate-100'>
          <p><span className='font-bold'>Player Name:</span> {search.playerName ? search.playerName.replace(/\*/g, ''): ''}</p>
          <p><span className='font-bold'>Position:</span> {search.position}</p>
          <p><span className='font-bold'>Age:</span> {search.age}</p>
          <p><span className='font-bold'>Team:</span> {search.team}</p>
          <p><span className='font-bold'>Season:</span> {search.season}</p>
          <p><span className='font-bold'>Points:</span> {search.points}</p>
          <p><span className='font-bold'>Field Goal:</span> {search.fieldPercent ? `${(search.fieldPercent * 100).toFixed(2)}%` : ``}</p>
          <p><span className='font-bold'>3pt FG:</span> {search.threePercent ? `${(search.threePercent * 100).toFixed(2)}%` : ' '}</p>
          <p><span className='font-bold'>Assists:</span> {search.assists}</p>
          <p><span className='font-bold'>Rebounds:</span> {search.totalRb}</p>
          <p><span className='font-bold'>Steals:</span> {search.steals}</p>
          <p><span className='font-bold'>Blocks:</span> {search.blocks}</p>
          <p><span className='font-bold'>Turnovers:</span> {search.turnovers}</p>
          <button className='absolute z-50 -translate-y-1/2 bg-transparent bg-slate-500 -left-7 top-1/2'><i class="fa-solid fa-circle-chevron-left" onClick={subCount}></i></button>
          <button className='absolute z-50 transform -translate-y-1/2 bg-transparent bg-slate-500 -right-7 top-1/2' onClick={addCount}>
          <i class="fa-solid fa-circle-chevron-right"></i></button>
        </div>
      </div>      
    </>
  )
}

export default App