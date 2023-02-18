const DisplayUsers =({id, pseudo, email})=>{
    return(
        <div className="user" key= {id}>
            <p><span className="title" >Pseudonyme utilisateur:&nbsp;</span>  {pseudo}</p>
            <p><span className="title">Email utilisateur:&nbsp;</span>  {email}</p>
        </div>
    )
}

export default DisplayUsers;