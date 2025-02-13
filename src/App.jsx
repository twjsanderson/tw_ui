import {useState} from 'react'

function App() {
  const [text, setText] = useState('')
  const [display, setDisplay] = useState('')
  const [processing, setProcessing] = useState(false)
  const [controls, setControls] = useState({
    start: 0,
    interval: 500,
  })

  const handleControls = (e) => {
    const val = e.target.value;
    const name = e.target.name
    if (val === '' || /^\d+$/.test(val)) {
      setControls((prev) => ({
        ...prev,
        [name]: val === '' ? '' : parseInt(val),
      }));
    }
  }

  const handleText = (e) => {
    const val = e.target.value
    setText(val)
  }

  const handleSubmit = () => {
    if (text.length) {
      setProcessing(true)
      setDisplay('')
      const inputArray = [...text]
      let delay = controls.start
      let timeoutCount = 0
      for (const letter of inputArray) {
        delay += controls.interval
        setTimeout(() => {
          setDisplay((prev) => prev + letter)
          timeoutCount++
          if (timeoutCount === inputArray.length) {
            setProcessing(false)
            setText('')
          }
        }, delay)
      }
    }
  }
  return (
    <div style={{ marginLeft: '40%'}}>
      <h1>Typewriter Effect</h1>
      <div>
        <p>First write delay (in milliseconds):</p>
        <input 
          name="start" 
          value={controls.start} 
          onChange={handleControls} 
        />
      </div>
      <div>
        <p>Interval delay (in milliseconds):</p>
        <input
          name="interval"
          value={controls.interval}
          onChange={handleControls}
        />
      </div>
      <br />
      {!processing && (
        <>
          <input value={text} onChange={handleText} />
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
      <h2>{display}</h2>
    </div>
  )
}

export default App
