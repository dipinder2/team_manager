import {useState} from 'react';
import axios from 'axios'
import {navigate} from '@reach/router'
const Add = (props) => {
	const [errorState,setErrorState] = useState([])
	const [player,setPlayer] = useState({
		name:"",
		position:""
	})
	const handleChange = (e) =>{
		setPlayer({...player,[e.target.name]:e.target.value})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		axios.post(`http://localhost:8000/api/players`,player)
		.then(res=>{
			console.log(res)
			navigate("/players/list")
		})
		.catch(err => {
				console.log(err.response.data)
                const {errors} = err.response.data
                const errorObj = {}
                for(let [key, value] of Object.entries(errors)){
                    errorObj[key] = value.message
                }
                setErrorState(errorObj)
            })
	}
  return (
    <form onSubmit={handleSubmit}>
    	<h1>Add player</h1>
    	<p>Player Name:
    		<input value={player.name} onChange={handleChange} type="text" name="name"/>
    	{	
    		errorState.name 
    		? <p style={{color:"red"}}>{errorState.name}</p>
    		:null
    	}
    	</p>
    	<p>Player position:
    		<input value={player.position} onChange={handleChange} type="text" name="position"/>
    	{
    		errorState.position 
    		? <p style={{color:"red"}}>{errorState.position}</p>
    		:null
    	}
    	
    	</p>
    	<input className="btn btn-success" type="submit" value="add"/>
    </form>
  )
}

export default Add;