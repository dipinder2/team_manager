import {useState,useEffect} from 'react';
import axios from 'axios'
import {Link} from '@reach/router'
const List = (props) => {
	const [players,setPlayers] = useState([])
	const [del,setDel] = useState(false)
	useEffect(() =>{
		axios.get('http://localhost:8000/api/players')
		.then(res=>{
			console.log(res)
			setPlayers(res.data)
		})
		.catch(err=>console.log(err))
	},[del])
	const handleDelete = (id) =>{
		const ans = prompt(`Are you sure you wanna delete!!!`)
		if(ans == null || ans.toLowerCase()=="no")return
	axios.delete(`http://localhost:8000/api/players/${id}`)
		.then(res=>{
			setDel(!del)
		})
		.catch(err=>console.log(err))
	}
  return (
    <div>
    	<table className="table table-light">
    	<thead>
    		<tr>
    			<th>player name</th>
    			<th>position</th>
    			<th>actions </th>
    		</tr>
    	</thead>
    	<tbody>
    	{
    	players.map((player,i) =>{
    		return <tr key={i}>
    			<td>{player.name}</td>
    			<td>{player.position}</td>
    			<td>
	    			<button className="btn btn-danger" onClick={(e) =>handleDelete(player._id)}>
	    				Delete
	    			</button>
    			</td>
    		</tr>
    	})
    	}
    	</tbody>
    	</table>
    </div>
  )
}

export default List;