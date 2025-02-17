import { useState,useCallback,useRef, useEffect } from 'react'

import './index.css'
function App() {
  const [length,setLength]=useState(8);
  const [number,setNumber]=useState(false);
  const [symbol,setSymbol]=useState(false);
  const [password,setPassword]=useState('');
  const [capital,setCapital]=useState(false);
  const passref=useRef(null);
  const generate=useCallback(()=>{
    let alpha=`asdfghjklqwertyuiopzxcvbnm`;
    const cap=`ASDFGHJKLQWERTYUIOPZXCVBNM`;
    const num=`1234567890`;
    const sym=`"!@#$%^&*(){[|\?><.,';"']}`;
    if(number)
      alpha+=num
    
    if(capital)
      alpha+=cap;

    if(symbol)
      alpha+=sym;
    let pass='';
    for(let i=0; i<length; i++){
        let random= Math.floor(Math.random()*alpha.length);
        pass+=alpha.charAt(random);

    };
    setPassword(pass);
    
  },[number,length,symbol,capital]);

  const copypass=()=>{
    passref.current?.select();
    alert("Text is Copie")
    window.navigator.clipboard.writeText(password);
  };


  useEffect(()=>{
    generate();
  },[number,length,symbol,capital])
  return(
    <div className='bg-gray-600 h-screen text-center flex flex-col justify-center content-center'>
      
    <h1 className="text-3xl m-4 text-white">Password Generator</h1>
    <div>
    <input type='text' readOnly value={password} ref={passref} className='bg-white p-2.5 rounded-l-xs  w-2xl outline-0'/>
    <button onClick={copypass} className='bg-cyan-700 p-2.5 rounded-r-xs'>Copy</button>
    </div>
    <div className='flex justify-center'>

    <div className='m-1.5 p-1.5 text-white '>
      <input type='range' value={length} onChange={(e)=>setLength(e.target.value)}/>
      <label>{length} length</label>
    </div>
    <div className='m-1.5 p-1.5 text-white'>
      <input type='checkbox' defaultChecked={number} onChange={()=> setNumber((prev)=>!prev)}/>
      <label>Number</label>
    </div>
    <div className='m-1.5 p-1.5 text-white'>
      <input type='checkbox' defaultChecked={symbol} onChange={()=>setSymbol((prev)=>!prev)}/>
      <label>Symbol</label>
    </div>

    <div className='m-1.5 p-1.5 text-white'>
      <input type='checkbox' defaultChecked={capital} onChange={()=>{setCapital((prev)=>!prev)}}/>
      <label>Capital</label>
    </div>
    </div>
    </div>
  )

}

export default App
