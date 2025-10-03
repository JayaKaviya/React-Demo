import React, { useState }  from "react";  

export default function MyComp(){

    const [num,setNum]=useState(0);
    const [dark,setDark]=useState(false);

    const style={
        backgroundColor: dark ?"black":"white",
        color : dark ?  "white" : "black"
    }

    const calculate=Calculation(num);
    return(
 
            <div style={style}>
                   <h2>Without <code>useMemo</code></h2>
      <ul>
        <li>Every toggle click triggers a full re-render, causing <code>Calculation(num)</code> to run again even though <code>num</code> hasn’t changed.</li>
        <li>UI can freeze or lag if the calculation is heavy, making the toggle experience slow.</li>
      </ul>
                <input type="number" value={num} onChange={(e)=>setNum(e.target.value)} />
                <h2>{calculate}</h2>
                <button onClick={()=> setDark(!dark)}>Toggle

                </button>
                
            </div>
    );
} 

function Calculation(num){
    console.log("loop")
    
    for(let i=0;i<1000000000;i++){}

    return num;
}