import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Events from './components/Events.js'

export default function App () {
  const [events, setEvents] = useState([])
  const [formInputs, updateFormInputs] = useState({
    name: '',
    date: '',
    memory: ''
  })

  const getEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/events')
      const data = await response.json()
      console.log(data)
      setEvents(data)
     } catch(error){
       console.error(error)
     }
   } 
    useEffect(
      ()=>{
        (
          async function (){
          await getEvents()
         }
       )()
     },[])

     const handleChange = (event) => {
      const updatedFormInputs = Object.assign({}, formInputs, { [event.target.id]: event.target.value })
      updateFormInputs(updatedFormInputs);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(
          'http://localhost:3000/events',
          formInputs
        );
        const createdEvent = response.data
        await updateFormInputs({
          name: '',
          date: '',
          memory: ''
        })
        await setEvents([createdEvent, ...events])
      }catch(error){
        console.error(error)
      }
    }

   
    return (
      <div className="App">
      <div className="container">
          <nav>
          <img src="https://i.imgur.com/sCqr7dZ.jpg" alt="Hawaii for my 30th"></img>
          <img src="https://i.imgur.com/Dlan5Jx.jpg" alt="Jul's Wedding"></img>
          <img src="https://i.imgur.com/do5rafz.jpg" alt="Stanley Cup Finals!"></img>

          
        </nav>
        <main>
          <Events events={events}/>
          </main>
        <aside>
          <img src="https://i.imgur.com/65wyQGd.jpg" alt="Hawaii for my 30th"></img>
          <img src="https://i.imgur.com/tVJQymC.jpg" alt="Jul's Wedding"></img>
          <img src="https://i.imgur.com/vhG9vyj.jpg" alt="Stanley Cup Finals!"></img>
        </aside>
      </div>
    <footer>
    <h4>Add a Memory </h4>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name" value={formInputs.name}
        onChange={handleChange}
      />
      <label htmlFor="date">Date: </label>
      <input
        type="text"
        id="date" value={formInputs.date}
        onChange={handleChange}
      />
      <label htmlFor="memory">Memory: </label>
      <input
        type="text"
        id="memory" value={formInputs.memory}
        onChange={handleChange}
      />

      <input type="submit" className="submit" />
    </form>

    </footer>
  </div>
  );
}

