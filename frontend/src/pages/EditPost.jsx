import { useContext, useEffect , useState } from "react"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate , useParams } from "react-router-dom"


const EditPost = () => {

  const postId = useParams().id
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)


  const fetchPosts = async ()=>{
    try{
      const res = await axios.get(URL+"/api/posts/"+postId)
      setTitle(res.data.title)
      setDescription(res.data.description)
      setFile(res.data.photo)
    }
    catch(err){
      console.log(err)
    } 
  }

  const handleUpdate = async (e)=>{
    e.preventDefault()
    const post = {
      title,
      description,
      username:user.username,
      userId:user._id,
    }
  
    if(file){
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("img",filename)
      data.append("file",file)
      post.photo = filename
  
      try{
        const imgUpload = await axios.post(URL+"/api/upload",data,{withCredentials:true})
   }
   catch(err){
     console.log(err)
   }
  }
  try{
    const res = await axios.post(URL+"/api/posts/"+postId,post,{withCredentials:true})
    navigate("posts/post/"+res.data._id)
  }
  catch(err){
    console.log(err)
  }
  }

  useEffect(()=>{
    fetchPosts()
  },[postId])
  return (
    <div>
    <NavBar/>
    <div className='px-6 md:px-[200px] mt-8'>
      <h1 className='font-bold md:text-2xl text-xl'>Update a Post</h1>
      <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
          <input onChange={(e)=>setTitle(e.target.value)} value={title} type='text' placeholder='Enter Post Title' className='px-4 py-2 outline-none'/>
          <input onChange={(e)=>setFile(e.target.files[0])} type='file' className='px-4'/>
          <div className='flex flex-col'>
              <div className='flex items-center space-x-4 md:space-x-8'>
                  <input className='px-4 py-2 outline-none' placeholder='Enter Post category' type='text'/>
                  <div className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
              </div>
          </div>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter Post description'/>
          <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
      </form>
    </div>
    <Footer/>
  </div>
  )
}

export default EditPost
