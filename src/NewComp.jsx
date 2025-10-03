import React, { useState,useMemo}  from "react";  

export default function NewComp(){

    const [num,setNum]=useState(0);
    const [dark,setDark]=useState(false);

    const style={
        backgroundColor: dark ?"black":"white",
        color : dark ?  "white" : "black"
    }

     const calculate = useMemo(() => Calculation(num), [num]);
    
    return(
            <div style={style}>
                  <h2>With <code>useMemo</code></h2>
      <ul>
        <li>Toggle click only updates the theme, and <code>Calculation(num)</code> is not recomputed because <code>num</code> didn’t change.</li>
        <li>UI remains smooth and responsive, even with heavy calculations.</li>
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