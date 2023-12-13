import { useState, useCallback, useEffect ,useRef} from "react";

function App() {
  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [characterAllowed, setCharacterAllowed] = useState(false);
  let [Password, setPassword] = useState("siuu");

  const PasswordGenerator = useCallback(() => {
    let pass   = "";
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  // PasswordGenerator()  we cannot call the function like this in react

   useEffect(()=>{PasswordGenerator()},[length,numberAllowed,characterAllowed,PasswordGenerator])

  const passwordRef= useRef(null)
  const copyPasswordToClipboard = useCallback(()=>{
          window.navigator.clipboard.writeText(Password);
          passwordRef.current?.select()
          // passwordRef.current?.setSelectionRange(0,3);
  },[Password]) 
  return (
    <>
      <div className="text-orange-500 my-7 mx-9  bg-gray-700 text-center text-4xl rounded-lg ">
        Password Generator <br />
        <input
          type="text"
          value={Password}
          placeholder="password"
          readOnly
          ref={passwordRef}
        />{" "}
        <br />
        <button
          onClick={copyPasswordToClipboard}
          className="rounded-lg bg-orange-500 text-gray-700"
        >
          Copy Password
        </button>
      </div>
      <div className="flex text-sm gap-x-2 ">
        <div className=" mx-auto my-7 flex items-center gap-x-1 text-orange-500 ">
                                      
          
          <input   type="range" 
          onChange={(E)=>{setLength(E.target.value)}}
          min={6} 
          max={100}
          value={length} className="cursor-pointer"/>
          <label>Length:{length}</label>
          
          <input   type="checkbox"  id="number"
          defaultChecked={numberAllowed}
         
          onChange={()=>{setNumberAllowed((prev)=>!(prev))}}
          
          value={length} className="cursor-pointer"/>
          <label htmlFor="number">Numbers?</label>

          <input   type="checkbox"  id ="char"
          onChange={()=>{setCharacterAllowed((prev)=>!(prev))}}
           defaultChecked={characterAllowed}
          value={length} className="cursor-pointer"/>   
          <label htmlFor="char">Characters?</label>



        </div>
      </div>
    </>
  );
}
export default App;
