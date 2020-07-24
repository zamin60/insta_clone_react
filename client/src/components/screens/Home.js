import React,{useState,useEffect} from 'react'

const Home=()=>{
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer " +localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result=>{
            console.log(result)
          setData(result.posts)
        })
    },[])
    return(
      <div className="home">
      { 
          data.map(item=>{
              return( <div className="card home-card" key={item._id}>
                <h5>{item.postedBy.name}</h5>
                <div>
                <img  src={item.photo} style={{maxWidth:"400px",maxheight:"400px"}} />
                </div>
                <div>
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>{item.title}</h6> 
                    <p>{item.body} </p>
                    <input type="text" placeholder="add a comment"/>
                </div>
                
          </div> 
                )
          })
      } 
         
          </div>
    )
}
export default Home