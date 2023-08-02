import  { useEffect, useState, useReducer } from 'react'
// import Hyperdrive from 'hyperdrive'
// import Corestore from 'corestore'

// const store = new Corestore('./storage')
// const drive = new Hyperdrive(store)

const initialState = {
  messages: []
}

function reducer(state, message) {
  return {
    messages: [message, ...state.messages]
  }
}

export default function App() {
  const [formState, setForm] = useState({
    name: '', message: ''
  })

  const [state, dispatch] = useReducer(reducer, initialState)

  async function saveMessage() {
    dispatch({
      name: formState.name,
      message: formState.message,
      createdAt: Date.now()
    })
    setForm({
      name: '', message: ''
    })
    // await fetch('http://localhost:3030/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(state.messages)

    // })
  }



  function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value })
  }

  return (
    <div style={{
      height: "100%",
      width: "100%",
    }}>
      <div style={{
        width:"100%",
        height:"50px",
        background:"lightblue",
        marginTop:"-20px"
      }}>
        <h1 style={{
          marginLeft:"10px"
        }}>P2P</h1>
      </div>
    <div style={{
      textAlign: "center",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      
      background: "#272829"
    }}>
      <div
        style={{
          display: "flex",
          width: "17%",
          flexDirection: "column",
          marginBottom:"120px"
        }}>
        <input
          onChange={onChange}
          placeholder="Name"
          name="name"
          value={formState.name}
          style={{
            marginTop: "10px",
            borderRadius: "15px",
            height: "20px",
            padding: "10px",
            border: "none"
          }}
        />
        <input
          onChange={onChange}
          placeholder="Message"
          name="message"
          value={formState.message}
          style={{
            marginTop: "10px",
            borderRadius: "15px",
            height: "20px",
            padding: "10px",
            border: "none"
          }}
        />
        <button onClick={saveMessage}
          style={{
            marginTop: "10px",
            borderRadius: "15px",
            padding: "10px",
            border: "none"
          }}>Send Message</button>
      </div>
      <div style={{
        height: "500px",
        width: "300px",
        background: "lightblue",
        padding: "20px",
        borderRadius: "20px",
        overflow: "auto",
        marginTop: "80px",
        marginBottom: "80px",
        marginLeft: "80px"
      }}>{
          state.messages.map(message => (
            <div key={message.createdAt}
              style={{
                textAlign: "center"
              }}>
              <h2>Message: {message.message}</h2>
              <p>From: {message.name}</p>
            </div>
          ))
        }
      </div>
    </div>
</div>
  )
}