import {useEffect,useState} from 'react';
import {Link} from '@reach/router'
import axios from 'axios'
const Status = ({id}) => {
	const [players,setPlayers] = useState()
	const [loaded,setLoaded] = useState(false)
	const [clicked,setClicked] = useState(false)
	useEffect(() =>{
		axios.get('http://localhost:8000/api/players')
		.then(res=>{setPlayers(res.data)
					setLoaded(true)})
		.catch(err=>setLoaded(false))
	},[clicked])

	const handleClick = (e,pid,sid) =>{
		const{name,value} = e.target
		console.log(value,pid)
		axios.put(`http://localhost:8000/api/players/status/${pid}/${id-1}/${sid}/${value}`)
		.then(res=>setClicked(!clicked))
		.catch(err=>console.log(err.response))
	}
  return (
    <div>
    	<h1>Player status-Game {id}</h1>
    	<Link to="/status/1">Game 1</Link>
    	<Link to="/status/2">Game 2</Link>
    	<Link to="/status/3">Game 3</Link>
    	<table className="table">
    	<thead>
    		<tr>
    			<th>name</th>
    			<th>actions</th>
    		</tr>
    	</thead>
	    	<tbody>
	    	{
	    		loaded ? players.map((player,i) =>{
	    			var style;
	    				if(player.gameStatus[id-1]["status"]=="undecided"){
	    					style={backgroundColor:"yellow"}
	    				}
	    				else if(player.gameStatus[id-1]["status"]=="playing"){
	    					style={backgroundColor:"red"}
	    				}
	    				else if(player.gameStatus[id-1]["status"]=="undecided"){
	    					style={backgroundColor:"yellow"}
	    				}

		    			return (<tr key={i}>
		    				<td><h3>{player.name}</h3></td>
		    				<td>
		    					<button className="btn btn-link" style= {player.gameStatus[id-1]["status"]=="playing"? {backgroundColor:"green"}:{} } value="playing" onClick={(e) =>handleClick(e,player._id,player.gameStatus[id-1]["_id"])}>playing</button>
		    					<button className="btn btn-link" style= {player.gameStatus[id-1]["status"]=="not-playing"? {backgroundColor:"red"}:{} } value={"not-playing"} onClick={(e) =>handleClick(e,player._id,player.gameStatus[id-1]["_id"])}>not-playing</button>
		    					<button className="btn btn-link" style= {player.gameStatus[id-1]["status"]=="undecided"? {backgroundColor:"yellow"}:{} } value="undecided" onClick={(e) =>handleClick(e,player._id,player.gameStatus[id-1]["_id"])}>undecided</button>
		    				</td>
		    				</tr>)
		    		})
	    		: null

	    	}
	    	</tbody>
    	</table>
    </div>
  )
}

export default Status;