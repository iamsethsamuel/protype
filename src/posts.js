import React, {useState, useEffect,useContext} from 'react' 
import {NavBar,Loader} from './globalComponents'
import {Link} from 'react-router-dom'
import {url,dateTime,showMenu,ajaxFunc,Context,deleteCreation}from './index'

export function PostDetails(props){
    const [post,setPost] = useState({}),[indicator, setIndicator] = useState({className:'',info:''}),[loading,setLoading]=useState('loading'),user=useContext(Context)
    useEffect(()=>{
        !props.location.value?fetch(url+props.location.pathname,{credentials:'include',redirect:'follow'}).then((data=>data.json().then(fetchData=>{
            setPost(fetchData);setLoading('');setIndicator({className:'',info:''})
        }))).catch(err=>{setIndicator('Error')})
        :setPost(props.location.value)
        props.location.value&&setLoading('')
    },[props.location])
    function prevFunc(id,jingle2,jingle1,jingle,prev,next){var pic = document.getElementById('pic'+id);if(pic.attributes.src.value.endsWith(jingle2)){document.getElementById(next).style.display='block';
        pic.setAttribute('src',jingle1);}else if(pic.attributes.src.value === jingle1){pic.setAttribute('src',jingle);document.getElementById(prev).style.display='none'}else if(pic.attributes.src.value === jingle2 ){pic.setAttribute('src',jingle);
    }}
    function nextFunc(id,jingle,jingle1,jingle2,next,prev){var pic = document.getElementById('pic'+id);if(pic.attributes.src.value.endsWith(jingle)){console.log(true)
        pic.setAttribute('src',jingle1);document.querySelector(`#${prev}`).style.display ='block';}else if(pic.attributes.src.value === jingle1 && jingle2.length > 10){pic.setAttribute('src',jingle2);document.querySelector(`#${next}`).style.display ='none'}else if(
    pic.attributes.src.value === jingle2 ){pic.setAttribute('src',jingle);}else{pic.setAttribute('src',jingle)}}
    let tags = props.location.value?props.location.value.tags:post.tags;
    document.getElementById('meta-description').setAttribute('content',props.location.value?props.location.value.name:post.name)
    function addSave(type){
        if(type==='add'){
            setIndicator({className:' badge-primary',info:'Loading'})
            fetch(url+"/save",{method:'post',credentials:'include',body:post._id}).then(data=>data.text().then(res=>{
                if(res==='done'){
                    setIndicator({className:' badge-primary',info:'Saved'});document.getElementById('postsave'+post._id).innerText='Saved'
                }else{
                    setIndicator({className:' badge-danger',info:'An error occurred'})
                }           
                setTimeout(()=>setIndicator({info:''}),5000)
            })).catch(err=>{setIndicator({className:' badge-danger',info:'An error occurred'});setTimeout(()=>setIndicator({info:''}),5000)})       
        }else if(type ==='remove'){
            setIndicator({className:' badge-primary',info:'Loading'})
            fetch(url+"/save/remove",{method:'post',credentials:'include',body:post._id}).then(data=>data.text().then(res=>{
                if(res==='done'){
                    setIndicator({className:' badge-primary',info:'Removed'});document.getElementById('postsave'+post._id).innerText='Removed from saves'
                }else{
                    setIndicator({className:' badge-danger',info:'An error occurred'})
                }           
                setTimeout(()=>setIndicator({info:''}),5000)
            })).catch(err=>{setIndicator({className:' badge-danger',info:'An error occurred'});setTimeout(()=>setIndicator({info:''}),5000)})
        }
    }
    
    return (<div><NavBar value={indicator}/>
        {loading!=='loading'?(
            <div><button onClick={()=>{document.getElementById('indexCard').style.animation='SlideUp 1s';setTimeout(()=>props.history.goBack(),1000)}} id={'post'+post._id} 
            className='btn text-secondary' style={{backgroundColor:'white',margin:"15px"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 8 16">
                    <path fillRule="evenodd" fill='grey' d="M5.5 3L7 4.5 3.25 8 7 11.5 5.5 13l-5-5 5-5z"/>
                </svg>
            </button>
            <div className=" indexCard container" id='indexCard' style={{marginTop:'30px',animation:'SlideDown 1s'}}>
            <div className="card">
                <div className="card-header" style={{backgroundColor:"white",margin: '0px',boxShadow: '1px 10px 10px rgb(243, 243, 243)'}}>
                    <a style={{textDecoration:'none'}} href={'/'+post.creator}>
                        <div className="row">
                            <img alt={post.creator+"'s profile picture"} src={ post.profilepic} style={{margin:'1px 5px',borderRadius: '50px',height:'60px',width:'60px'}}
                            className='img-thumbnail' />
                            <h3 className='text-secondary'>{post.creator}</h3>
                            <h6 className="text-secondary col-lg-5 indexDate" style={{marginTop:'5px'}}>{dateTime( post.datePosted, post.timePosted )}</h6>
                            <h2 className="menu btn text-secondary" style={{boxShadow: 'none',position: 'absolute',right: '0px'}} onClick={()=>showMenu('open','postMenu'+ post._id)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="3" height="16" viewBox="0 0 3 16">
                                <path fillRule="evenodd" d="M0 2.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0 5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM1.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                            </svg>
                            </h2>
                        </div>
                    </a>
                </div>
                <div className="card-body" >
                    <p className="text-secondary" style={{fontSize: '20px', paddingBottom: '10px', marginBottom: '10px'}} id={'d'+post._id}
                    onClick={()=>document.querySelector('d'+post._id).style.height='auto'} >{post.description}</p>
                    {
                        post.description > 200&&<button className="badge btn-primary btn badge-pill" style={{margin:'10px'}} id={'d'+post._id} 
                        onClick={()=>document.getElementById('d'+post._id).style.height='auto'}>Show More</button>
                    }
                    </div>                                        
                    {               
                    post.jingle1?(
                        <div style={{margin:'5px'}}>
                            <p onClick={()=>prevFunc(post._id, post.jingle2,post.jingle1,post.jingle,'prev'+post._id,'next'+post._id)}
                                className="prev" style={{position:'absolute',left:'2%',top:'50%',display:'none'}} id={'prev'+post._id}>&#9664;</p>
                                <Link style={{textDecoration:'none'}} to={{pathname:"/post/"+ post._id, value:post}}>
                                    <img className="card-img-top img-thumbnail" alt={'picture of '+post.name} style={{height:'auto',width:'100%',border: 'none'}}
                                    onClick={()=>{}} id={"pic"+post._id} src={post.jingle} />
                                </Link>
                            <p onClick={()=>nextFunc(post._id,post.jingle,post.jingle1,post.jingle2,'next'+post._id,'prev'+post._id)}
                            className="next" style={{position:'absolute',right:'2%',top:'50%'}} id={'next'+post._id}>&#9654;</p>
                        </div>
                    ):(
                            <img className="card-img-top img-thumbnail" alt={'picture of '+post.name} style={{height:'auto',width:'100%',border: 'none',}}
                            onClick={()=>{}} id={"pic"+post._id} src={post.jingle} />
                    )
                    }
                    {
                        post.price>0?<h2 className="text-secondary" style={{margin:'20px'}}>
                        {post.currency.length>1?post.price+' '+post.currency:post.currency+' '+post.price}</h2>:
                        <h2 className="text-secondary" style={{margin:'20px'}}>Free</h2>
                    }
                <div className="card-footer" style={{fontSize:'20px',backgroundColor:'white',boxShadow: '1px -10px 10px rgb(243, 243, 243)', marginTop:"20px"}}>
                    <h5 className='text-secondary'>{post.name}</h5>
                    <h6 className=" text-secondary" style={{fontWeight:'bolder',backgroundColor:'white',marginTop:'10px'}}>
                        {post.location}
                    </h6>
                    {(user.username!==post.creator) &&(
                        post.saved&&post.saved.includes(user.username)?
                        <div className="btn badge badge-pill text-secondary container" style={{backgroundColor:'white',marginTop:'10px'}} id={'postsave'+post._id} 
                        onClick={()=>addSave('remove')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="20" fill='#007bff' viewBox="0 0 24 24" >
                                <path fillRule="evenodd" d="M9 0H1C.27 0 0 .27 0 1v15l5-3.09L10 16V1c0-.73-.27-1-1-1zm-.78 4.25L6.36 5.61l.72 2.16c.06.22-.02.28-.2.17L5 6.6 3.12 7.94c-.19.11-.25.05-.2-.17l.72-2.16-1.86-1.36c-.17-.16-.14-.23.09-.23l2.3-.03.7-2.16h.25l.7 2.16 2.3.03c.23 0 .27.08.09.23h.01z"/>
                            </svg>
                            Saved
                        </div>
                        :
                        <button className="btn badge badge-pill text-secondary container" style={{backgroundColor:'white',marginTop:'10px'}} id={'postsave'+post._id} 
                            onClick={()=>addSave('add')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="20" fill='#007bff' viewBox="0 0 24 24" >
                        <path fillRule="evenodd" d="M9 0H1C.27 0 0 .27 0 1v15l5-3.09L10 16V1c0-.73-.27-1-1-1zm-.78 4.25L6.36 5.61l.72 2.16c.06.22-.02.28-.2.17L5 6.6 3.12 7.94c-.19.11-.25.05-.2-.17l.72-2.16-1.86-1.36c-.17-.16-.14-.23.09-.23l2.3-.03.7-2.16h.25l.7 2.16 2.3.03c.23 0 .27.08.09.23h.01z"/>
                        </svg>Add to Save</button>
                    )} 
                </div>
                <div className='container' style={{margin:'10px'}}>
                {
                    post.tags?tags.split(',').map(tag=><Link style={{textDecoration:'none'}} key={tag} to={"/"+tag}><h5 className='badge badge-pill'>{tag}</h5></Link>):""
                }
                </div>
            <div className='container text-secondary' style={{margin:'10px'}}>
                {post.currency&&post.currency.length === 1?<h4  style={{border:'0px'}}>{`${post.currency} ${post.price}`} </h4>:<h3 >{`${post.price} ${post.currency}`}</h3>}
            </div>    
            </div>
            {post._id&&<Comments value={post} />}
            <div className="container fixed-bottom" style={{animation:'FadeIn .5s 1',padding:'15px',backgroundColor:'white', display:'none'}} id={"postMenu"+post._id}>
            {user.username===post.creator&&<button className="btn btn-danger menuItem" id={"delete"+post._id} onClick={async()=>{await deleteCreation('post',post._id).then(data=>{let postDiv=document.getElementById('post'+post._id);
                    setIndicator({className:'badge-danger',info:data});if(data==='Done'){setIndicator({className:'badge-primary',info:data});setTimeout(()=>postDiv.remove(),1000);setTimeout(setIndicator({info:''}),5000);document.location.pathname='/'}})}}>Delete</button>}
                <button className="btn btn-danger menuItem" id={"report"+post._id} onClick={()=>{document.getElementById('reportModal'+ post._id).style.display='block';document.getElementById("postMenu"+post._id).style.display='none'}}>Report</button>
                <p className="btn btn-default menuItem" onClick={()=>showMenu('close','postMenu'+ post._id)}>Close</p>    
            </div>

            <div id={'reportModal'+ post._id} className='container fixed-bottom' style={{backgroundColor:'white',animation:'FadeIn .5s 1',borderRadius:'30px',padding:'15px',display:'none'}}>
                <button className='float-right btn' style={{marginBottom:'10px',backgroundColor:'white'}} onClick={()=>document.getElementById('reportModal'+ post._id).style.display='none'}>X</button>
                <form className='container form-group' method='POST' id={'reportForm'+post._id} onSubmit={(event)=>{event.preventDefault();ajaxFunc(post._id,post._id,'report')}}>
                    <h4 className='text-secondary' id={'text'+post._id}>Report Post</h4>
                    <input type='hidden' name='post' value={post._id} />
                    <input type='text' name='concern' placeholder='Write you concerts' id={'concern'+post._id} className='form-control' onChange={(event)=>event.target.value.length>0&&event.target.value!==' '?document.getElementById('removebtn'+post._id).style.display='block':document.getElementById('removebtn'+post._id).style.display='none'} />
                    <button type='submit' className='btn badge-pill container text-secondary' style={{display:'none',margin:'15px',backgroundColor:'white'}} id={'removebtn'+post._id}>Submit</button>
                </form>
            </div>
        </div>
        </div>
        ):<Loader />}
        </div>
    )
}
export function Comments(props){
    const [comments, setComment] = useState({comments:[],page:false}),[indicator,setIndicator]=useState(''),user=useContext(Context),
        pageDiv= document.getElementById('page'),[page,setPage]=useState(2)

    useEffect(()=>{
        fetch(url+'/comments/'+props.value._id,{credentials:'include'}).then(data=>data.json().then(res=>{

            setComment({comments:res,page:res.length===3?2:false});setIndicator('')
        })).catch(err=>{console.log(err);if(pageDiv){pageDiv.style.display='block';pageDiv.innerText="Error occured couldn't"}})
    },[props.value])

    useEffect(()=>{
        setComment(comments)
    },[comments])
    function commentFunc(type,replyID,commentID){
        if(type === 'comment'){
            let commentError = document.getElementById('comment-error')
            fetch(url+'/comments/'+props.value._id,{method:'post',credentials:'include',body:new FormData(document.getElementById('commentform'))}).then(data=>data.json().then(res=>{
                if(!res.err){
                    document.getElementById('commentform').reset()
                    commentError.innerText='Successfully comment';commentError.className='text-secondary';setComment({comments:[res].concat(comments.comments),page:page})
            }else{commentError.innerText='An error occurred'}
            }))
        }else if(type === 'reply'){
        let replyError = document.getElementById('reply-error'+replyID)
            fetch(url+'/replycomment',{method:'post',credentials:'include',body:new FormData(document.getElementById(replyID))}).then(data=>data.text().then(res=>{
                if(res === 'done'){replyError.innerText='Successfully replied';replyError.className='text-secondary'}else{replyError.innerText='An error occurred'}
            }))
        }
    }
    function loadMore(){
        let pageDiv= document.getElementById('page')
        pageDiv.innerText = 'loading'
        fetch(url+`/comments/${props.value._id}?page=${comments.page}`,{credentials:'include'}).then(data=>data.json().then(res=>{            
            if(res.comments.length===3){setComment({comments:[...comments.comments,...res.comments],page:res.page});pageDiv.innerText='Show More'
            }else{setComment({comments:[...comments.comments,...res.comments],page:false});pageDiv.style.display='none';}

        })).catch((err)=>{pageDiv.innerText='Click to loadmore';pageDiv.style.display='block';pageDiv.onclick=()=>loadMore()})
    }
    
    return indicator===''?(
        <div style={{margin:'10px 5px'}}>
            <div className="card" style={{marginBottom:"30px",padding:'20px',borderRadius:'20px'}}>
                <div className="card-header row" style={{flexWrap:'wrap'}}>
                <img alt={user.username+"'s profile picture"} className='img-thumbnail' src={user.dp} style={{margin:'1px 5px',borderRadius: '50px',height:'60px',width:'60px'}} />
                    <form method='POST' className='col-lg-9' id='commentform' onSubmit={(event)=>{event.preventDefault();commentFunc('comment')}} style={{marginBottom:'10px'}}>
                        {<h3 className='text-danger' id='comment-error'> </h3>}
                        <textarea className='form-control float-left' placeholder='Comment' name='comment' onChange={(event)=>{event.target.value.length>0&&event.target.value!==' '?document.getElementById('comment').style.display=
                        'block':document.getElementById('comment').style.display='none';document.getElementById('comment-error').innerText=''}}></textarea>
                        <button className='btn badge-pill badge-primary float-right' style={{margin:'10px',display:'none'}} type='submit' id='comment'>Comment</button>
                    </form>
                </div>
            </div>
            {
                comments.comments.length>0&&comments.comments.map(comment=><div id={'comment'+comment._id} key={Math.random().toExponential()} className="card" style={{marginBottom:"30px",padding:'20px',borderRadius:'20px'}}>
                    <div className="card-header row" style={{flexWrap:'wrap'}}>
                        <a style={{textDecoration:'none'}} href={"/"+comment.username}>
                        <img alt={comment.username+"'s profile picture"} className='img-thumbnail' src={comment.profilepic} style={{margin:'1px 5px',borderRadius: '50px',height:'60px',width:'60px'}} />
                            <h4 className='text-secondary' style={{margin:'10px'}}>{comment.creator.replace(comment.creator[0],comment.creator[0].toUpperCase()) }</h4>
                            </a>
                            <h5 className='text-secondary' style={{margin:'10px'}}>{dateTime(comment.datePosted,comment.timePosted)}</h5>
                    </div>
                    {user.username===comment.creator&&<div className='container' style={{position:'absolute',right:'10px'}}>
                    <button className='float-right btn badge-pill' onClick={()=>document.getElementById('commentMenu'+comment._id).style.display='block'} style={{backgroundColor:'inherit',fontSize:'25px',
                    boxShadow:'none',transform:'rotate(90deg)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="3" height="16" viewBox="0 0 3 16">
                        <path fillRule="evenodd" d="M0 2.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0 5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM1.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>    
                    </button></div>}
                    <Link to={{pathname:'/comment/'+comment._id,value:comment}} style={{textDecoration:'none',}} className='text-secondary'>
                    <div className="card-body" style={{border:'none'}}>
                        {comment.comment}
                    </div>
                    </Link>
                    <div className="card-footer "  style={{backgroundColor:"white",borderColor:"white"}}>
                        <h4 className='text-danger' id={'reply-error'+comment._id}> </h4>
                        <Link to={{pathname:'/comment/'+comment._id,value:comment}} className='badge badge-pill btn badge-primary'>Reply</Link>
                    </div>
                    <div className="container fixed-bottom" style={{animation:'FadeIn .5s 1',padding:'15px',backgroundColor:'white', display:'none'}} id={"commentMenu"+comment._id}>
                    {user.username===comment.creator&&<button className="btn btn-danger menuItem" id={"delete"+comment._id} onClick={async()=>{await deleteCreation('deleteComment',comment._id).then(data=>{const commentDiv=document.getElementById('comment'+comment._id);
                        if(data==='done'){commentDiv.style.animation='FadeOut 1s 1';setTimeout(()=>commentDiv.remove(),1000);}else{
                            document.getElementById("delete"+comment._id).innerText='An error occured try again'
                        }})}}>Delete</button>}                
                    <p className="btn btn-default menuItem" onClick={()=>showMenu('close','commentMenu'+ comment._id)}>Close</p>    
                </div>
                </div>
            )}
            <button id='page' onClick={()=>loadMore()} className='badge badge-pill btn container badge-primary' style={{display:comments.page?"block":'none'}}>Load More</button>                
        </div>
    ):<h2 className="container text-secondary" style={{display:"block",zIndex:'1000'}}><Loader /></h2>
}

export function Replies(props){
    const [indicator, setIndicator] = useState({className:'',info:<Loader />}),[comment,setComment]=useState({}),
        pageDiv= document.getElementById('page'),[page,setPage]=useState(2),
        [replies,setReplies]=useState({replies:[],page:false}),user=useContext(Context)
    useEffect(()=>{
        fetch(url+window.location.pathname,{credentials:'include',redirect:'follow'}).then(data=>data.json().then(res=>{
            setReplies({replies:res.replies.reverse(),page:res.replies.length===3?2:false});setComment(res.comment);
            setIndicator({className:'',info:''})
        })).catch(err=>{setIndicator({className:'',info:'An Error occurred'});console.log(err)})
    },[window.location.pathname])
    useEffect(()=>{
        setReplies(replies)
    },[])
    function replyFunc(){
        setIndicator({info:<Loader />})
        fetch(url+'/replycomment',{method:'post',credentials:'include',body:new FormData(document.getElementById('replyform'))}).then(data=>data.json().then(res=>{
            if(res !== 'error'){setIndicator({className:' badge-primary badge-pill',info:'Successfully replied',});setReplies({replies:replies.replies.concat(res).reverse()})
            }else{setIndicator({info:'An error occurred',className:' badge-pill badge-danger'});}
        })).catch(err=>{setIndicator({info:'An error occurred',className:' badge-danger badge-pill'});console.log(err)})
        setTimeout(()=>setIndicator({info:''}),5000)
    }
    function loadMore(){
        let pageDiv= document.getElementById('page')
        pageDiv.innerText = 'loading'
        fetch(url+window.location.pathname+`?page=${replies.page}`,{credentials:'include',redirect:'follow'}).then(data=>data.json().then(res=>{
            if(res.replies.length===3){setReplies({replies:[...replies.replies,...res.replies],page:res.page});pageDiv.innerText='Show More'
            }else{setReplies({replies:[...replies.replies,...res.replies],page:false});pageDiv.style.display='none';}
        })).catch((err)=>{pageDiv.innerText='Error';pageDiv.style.display='block';console.log(err)})
    }  
    return indicator.info !== ''&& typeof indicator.info === 'object'?(<div><NavBar value={indicator}/></div>):(
        <div><NavBar value={indicator}/>
            <div className="card" style={{marginBottom:"30px",padding:'20px',margin:'10px',borderRadius:'20px',marginTop:'50px'}}>
                <div className="card-header row" style={{flexWrap:'wrap'}}>
                    <Link style={{textDecoration:'none'}} to={"/"+comment.username} />
                    <img alt={comment.username+"'s profile picture"} className='img-thumbnail' src={comment.profilepic} style={{margin:'1px 5px',borderRadius: '50px',height:'60px',width:'60px'}} />
                        <h4 className='text-secondary' style={{margin:'10px'}}>{comment.creator}</h4>
                        <h5 className='text-secondary' style={{margin:'10px'}}>{dateTime(comment.datePosted,comment.timePosted)}</h5>
                </div>
                <div className="card-body" style={{border:'none'}}>
                    {comment.comment}
                </div>    
            </div>
            <div className="card container" style={{marginBottom:"30px",padding:'20px',borderRadius:'20px'}}>
                <div className="card-header row" style={{flexWrap:'wrap'}}>
                <img alt={user.username+"'s profile picture"} className='img-thumbnail' src={user.dp} style={{margin:'1px 5px',borderRadius: '50px',height:'60px',width:'60px'}} />
                    <form className='col-lg-9' id='replyform' onSubmit={(event)=>{event.preventDefault();replyFunc('comment')}} style={{marginBottom:'10px'}}>
                        {<h3 className='text-danger' id='reply-error'> </h3>}
                        <input type='hidden' name='comment' value={comment._id}></input>
                        <textarea className='form-control float-left' placeholder='Reply' name='reply' onChange={(event)=>{if(event.target.value.length>0&&event.target.value!==' '){document.getElementById('reply').style.display=
                        'block';}indicator.info.length>0&&setIndicator({info:''})}}></textarea>
                        <button className='btn badge-pill badge-primary float-right' style={{margin:'10px',display:'none'}} type='submit' id='reply'>Reply</button>
                    </form>
                </div>
            </div>
            {replies.replies.map(reply=>
                <div key={Math.random().toExponential()} id={'reply'+reply._id} className="card container" style={{marginBottom:"30px",padding:'20px',borderRadius:'20px'}}>
                <div className="card-header row container-fluid" style={{flexWrap:'wrap'}}>
                    <Link style={{textDecoration:'none'}} to={"/"+reply.username} />
                    <img alt={reply.username+"'s profile picture"} className='img-thumbnail' src={reply.profilepic} style={{margin:'1px 5px',borderRadius: '50px',height:'60px',width:'60px'}} />
                        <h4 className='text-secondary' style={{margin:'10px'}}>{reply.creator }</h4>
                        <h5 className='text-secondary' style={{margin:'10px'}}>{dateTime(reply.dateCreated,reply.timeCreated)}</h5>
                </div>
                {user.username===reply.creator&&<div className='container' style={{position:'absolute',right:'10px'}}>
                    <button className='float-right btn badge-pill' onClick={()=>document.getElementById('replyMenu'+reply._id).style.display='block'} style={{backgroundColor:'inherit',fontSize:'25px',
                    boxShadow:'none'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="3" height="16" viewBox="0 0 3 16">
                        <path fillRule="evenodd" d="M0 2.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0 5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM1.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>    
                    </button></div>}
                <div className="card-body" style={{border:'none'}}>
                    {reply.reply}
                </div>
                <div className="container fixed-bottom" style={{animation:'FadeIn .5s 1',padding:'15px',backgroundColor:'white', display:'none'}} id={"replyMenu"+reply._id}>
                    {user.username===reply.creator&&<button className="btn btn-danger menuItem" id={"delete"+reply._id} onClick={async()=>{await deleteCreation('deleteReply',reply._id).then(data=>{const replyDiv=document.getElementById('reply'+reply._id);
                        if(data==='done'){replyDiv.style.animation='FadeOut 1s 1';setTimeout(()=>replyDiv.remove(),1000);}})}}>Delete</button>}                
                    <p className="btn btn-default menuItem" onClick={()=>showMenu('close','replyMenu'+ reply._id)}>Close</p>    
                </div>
            </div>
            )}
            <button id='page' onClick={()=>loadMore()} className='badge badge-pill btn container badge-primary' style={{display:replies.page?'block':'none'}}>Load More</button>
        </div>
    )
        
}
export function Posts(props){
    const user=useContext(Context),[indicator,setIndicator]=useState({className:'',info:''})
    function prevFunc(id,jingle2,jingle1,jingle,prev,next){var pic = document.getElementById('pic'+id);if(pic.attributes.src.value.endsWith(jingle2)){document.getElementById(next).style.display='block';
        pic.setAttribute('src',jingle1);}else if(pic.attributes.src.value === jingle1){pic.setAttribute('src',jingle);document.getElementById(prev).style.display='none'}else if(pic.attributes.src.value === jingle2 ){pic.setAttribute('src',jingle);
    }}
    function nextFunc(id,jingle,jingle1,jingle2,next,prev){var pic = document.getElementById('pic'+id);if(pic.attributes.src.value.endsWith(jingle)){console.log(true)
        pic.setAttribute('src',jingle1);document.querySelector(`#${prev}`).style.display ='block';}else if(pic.attributes.src.value === jingle1 && jingle2.length > 10){pic.setAttribute('src',jingle2);document.querySelector(`#${next}`).style.display ='none'}else if(
    pic.attributes.src.value === jingle2 ){pic.setAttribute('src',jingle);}else{pic.setAttribute('src',jingle)}}
    function addSave(type){
        if(type==='add'){
            setIndicator({className:' badge-primary',info:'Loading'})
            fetch(url+"/save",{method:'post',credentials:'include',body:props.value._id}).then(data=>data.text().then(res=>{
                if(res==='done'){
                    setIndicator({className:' badge-primary',info:'Saved'});document.getElementById('postsave'+props.value._id).innerText='Saved'
                }else{
                    setIndicator({className:' badge-danger',info:'An error occurred'})
                }           
                setTimeout(()=>setIndicator({info:''}),5000)
            })).catch(err=>{setIndicator({className:' badge-danger',info:'An error occurred'});setTimeout(()=>setIndicator({info:''}),5000)})       
        }else if(type ==='remove'){
            setIndicator({className:' badge-primary',info:'Loading'})
            fetch(url+"/save/remove",{method:'post',credentials:'include',body:props.value._id}).then(data=>data.text().then(res=>{
                if(res==='done'){
                    setIndicator({className:' badge-primary',info:'Removed'});document.getElementById('postsave'+props.value._id).innerText='Removed from saves'
                }else{
                    setIndicator({className:' badge-danger',info:'An error occurred'})
                }           
                setTimeout(()=>setIndicator({info:''}),5000)
            })).catch(err=>{setIndicator({className:' badge-danger',info:'An error occurred'});setTimeout(()=>setIndicator({info:''}),5000)})
        }
    }
    return(
        <div className=" indexCard col-lg-4" style={{marginBottom:'30px'}} id={'post'+props.value._id}>
            <h4 className={'fixed-top notifier badge-pill '+indicator.className} onClick={()=>setIndicator({info:''})}>{indicator.info}</h4>
            <div className="card">
                <div className="card-header" style={{backgroundColor:"white",margin: '0px',boxShadow: '1px 10px 10px rgb(243, 243, 243)',flexWrap:'wrap'}}>
                    <div className="row">
                        <Link  onClick={()=>{document.getElementById('mainContainer').style.animation='SlideUp 1s';setTimeout(()=>document.location.pathname='/'+props.value.creator,1000)}} to=''>
                            <div className="float-left" style={{textDecoration: 'none'}}>
                            <img alt={props.value.creator+"'s profile picture"} src={ props.value.profilepic} style={{margin:'1px 5px',borderRadius: '50px',height:'60px',width:'60px'}}
                            className='img-thumbnail' />
                            <h4 style={{textDecoration: "none", fontSize: "22px",margin:'10px'}}>{props.value.creator}</h4>
                            </div>
                        </Link>
                            <h6 className="text-secondary col-lg-5 indexDate" style={{marginTop:'10px'}}>{dateTime( props.value.datePosted, props.value.timePosted )}</h6>
                            <h2 className="menu btn" style={{boxShadow: 'none',position: 'absolute',right: '0px'}} onClick={()=>showMenu('open','postMenu'+ props.value._id)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="3" height="16" viewBox="0 0 3 16">
                                <path fillRule="evenodd" d="M0 2.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0 5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM1.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                            </svg>
                            </h2>
                        </div>
                </div>
                <div className="card-body" >
                    <p className="text-secondary" style={{fontSize: '20px', height: '60px',overflow: 'hidden', paddingBottom: '10px', marginBottom: '10px'}} id={'d'+props.value._id}
                    onClick={()=>document.querySelector('d'+props.value._id).style.height='auto'} >{props.value.description}</p>
                    {
                        props.value.description > 200&&<button className="badge btn-primary btn badge-pill" style={{margin:'10px'}} id={'d'+props.value._id} onClick={()=>document.getElementById('d'+props.value._id).style.height='auto'}>Show More</button>
                    }
                    </div>                                        
                    {
                    props.value.jingle1?(
                        <div style={{margin:'5px'}}>
                            <p onClick={()=>prevFunc(props.value._id, props.value.jingle2,props.value.jingle1,props.value.jingle,'prev'+props.value._id,'next'+props.value._id)}
                                className="prev" style={{position:'absolute',left:'2%',top:'50%',display:'none'}} id={'prev'+props.value._id}>&#9664;</p>
                                <Link style={{textDecoration:'none'}} to={{pathname:"/post/"+ props.value._id, value:props.value}}>
                                    <img className="card-img-top img-thumbnail" alt={'picture of '+props.value.name} style={{height:'auto',width:'100%',border: 'none'}}
                                    onClick={()=>{}} id={"pic"+props.value._id} src={props.value.jingle} />
                                </Link>
                            <p onClick={()=>nextFunc(props.value._id,props.value.jingle,props.value.jingle1,props.value.jingle2,'next'+props.value._id,'prev'+props.value._id)}
                            className="next" style={{position:'absolute',right:'2%',top:'50%'}} id={'next'+props.value._id}>&#9654;</p>
                        </div>
                    ):(
                        <Link style={{textDecoration:'none'}} to={{pathname:"/post/"+ props.value._id, value:props.value}}>
                            <img className="card-img-top img-thumbnail" alt={'picture of '+props.value.name} style={{height:'auto',width:'100%',border: 'none'}}
                            onClick={()=>{}} id={"pic"+props.value._id} src={props.value.jingle} />
                        </Link>
                    )
                    }
                    {
                        props.value.price>0?<h3 className="text-secondary" style={{margin:'30px'}}>
                        {props.value.currency.length>1?props.value.price+' '+props.value.currency:props.value.currency+' '+props.value.price}</h3>:
                        <h4 className="text-secondary" style={{fontSize:'20px'}}>Free</h4>
                    }
                    
                <div className="card-footer" style={{fontSize:'20px',backgroundColor:'white',boxShadow: '1px -10px 10px rgb(243, 243, 243)', marginTop:"20px"}}>
                    <h5 className='text-secondary'>{props.value.name}</h5>
                    <h6 className=" text-secondary" style={{fontWeight:'bolder',backgroundColor:'white',marginTop:'10px'}}>
                        {props.value.location}
                    </h6>
                    {props.value.creator !== user.username&&(
                        props.value.saved&&props.value.saved.includes(user.username)?
                        <div className="btn badge badge-pill text-secondary container" style={{backgroundColor:'white',marginTop:'10px'}} id={'postsave'+props.value._id} 
                        onClick={()=>addSave('remove')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="20" fill='#007bff' viewBox="0 0 24 24" >
                                <path fillRule="evenodd" d="M9 0H1C.27 0 0 .27 0 1v15l5-3.09L10 16V1c0-.73-.27-1-1-1zm-.78 4.25L6.36 5.61l.72 2.16c.06.22-.02.28-.2.17L5 6.6 3.12 7.94c-.19.11-.25.05-.2-.17l.72-2.16-1.86-1.36c-.17-.16-.14-.23.09-.23l2.3-.03.7-2.16h.25l.7 2.16 2.3.03c.23 0 .27.08.09.23h.01z"/>
                            </svg>
                            Saved
                        </div>
                        :
                        <button className="btn badge badge-pill text-secondary container" style={{backgroundColor:'white',marginTop:'10px'}} id={'postsave'+props.value._id} 
                            onClick={()=>addSave('add')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="20" fill='#007bff' viewBox="0 0 24 24" >
                        <path fillRule="evenodd" d="M9 0H1C.27 0 0 .27 0 1v15l5-3.09L10 16V1c0-.73-.27-1-1-1zm-.78 4.25L6.36 5.61l.72 2.16c.06.22-.02.28-.2.17L5 6.6 3.12 7.94c-.19.11-.25.05-.2-.17l.72-2.16-1.86-1.36c-.17-.16-.14-.23.09-.23l2.3-.03.7-2.16h.25l.7 2.16 2.3.03c.23 0 .27.08.09.23h.01z"/>
                        </svg>Add to Save</button>
                    )} 
                </div>
                <div className='container-fluid' style={{margin:'7px',marginBottom:'10px'}}>
                    <button className={props.value.recommend&&props.value.recommend.includes(user.username)?' btn text-primary':' btn text-secondary'} id={'btn'+props.value._id} 
                    style={{backgroundColor:'white',margin:'0px',height:"60px",borderRadius:'30px',boxShadow:'none'}} onClick={()=>ajaxFunc(props.value._id,props.value._id,'recommend')}>
                        <svg xmlns="http://www.w3.org/2000/svg" id={'icon'+props.value._id} fill={props.value.recommend&&props.value.recommend.includes(user.username)?'#007bff':'grey'} viewBox="0 0 16 16" height='19px'>
                            <path fillRule="evenodd" d={`M15.98 8.17l-.97 5.95C14.84 15.5 13.13 16 12 16H5.69c-.2 0-.38-.05-.53-.14L3.72 15H2c-1.06 0-2-.94-2-2V9c0-1.06.94-2.02 2-2h2c.91 0 1.39-.45 2.39-1.55.91-1 
                            .88-1.8.63-3.27-.08-.5.06-1 .42-1.42C7.83.29 8.42 0 9 0c1.83 0 3 3.71 3 5.01l-.02.98h2.04c1.16 0 1.95.8 1.98 1.97 0 .11-.02.21-.02.21zm-1.97-1.19h-1.99c-.7 0-1.03-.28-1.03-.97l.03-1.03c0-1.27-1.17-4-2-4-.5 0-1.08.5-1 1 .25 1.58.34 2.78-.89 4.14C6.11 7.25 5.36 8 4 
                            8v6l1.67 1H12c.73 0 1.95-.31 2-1l.02-.02 1-6c-.03-.64-.38-1-1-1h-.01z`}/>
                        </svg>
                        <span style={{marginLeft:'2px'}}>Recommend</span>
                        <p style={{marginLeft:'2px'}} id={'recommend'+props.value._id}>{props.value.recommend?props.value.recommend.length:0}</p>
                    </button>
                    <button className={props.value.dontrecommend&&props.value.dontrecommend.includes(user.username)?' btn text-primary':' btn text-secondary'} id={'dontbtn'+props.value._id}
                    style={{backgroundColor:'white',margin:'0px',height:"60px",borderRadius:'30px',boxShadow:'none'}} onClick={()=>ajaxFunc(props.value._id,props.value._id,'dontrecommend')}>
                        <svg xmlns="http://www.w3.org/2000/svg" id={'donticon'+props.value._id} fill={props.value.dontrecommend&&props.value.dontrecommend.includes(user.username)?'#007bff':'grey'} viewBox="0 0 16 16" height='19px'>
                            <path fillRule="evenodd" d={`M15.98 7.83l-.97-5.95C14.84.5 13.13 0 12 0H5.69c-.2 0-.38.05-.53.14L3.72 1H2C.94 1 0 1.94 0 3v4c0 1.06.94 2.02 2 2h2c.91 0 1.39.45 2.39 1.55.91 1 .88 1.8.63 3.27-.08.5.06 1 .42 1.42.39.47.98.76 1.56.76 1.83 0 3-3.71 3-5.01l-.02-.98h2.04c1.16 0 1.95-.8 1.98-1.97
                             0-.11-.02-.21-.02-.21zm-1.97 1.19h-1.99c-.7 0-1.03.28-1.03.97l.03 1.03c0 1.27-1.17 4-2 4-.5 0-1.08-.5-1-1 .25-1.58.34-2.78-.89-4.14C6.11 8.75 5.36 8 4 8V2l1.67-1H12c.73 0 1.95.31 2 1l.02.02 1 6c-.03.64-.38 1-1 1h-.01z`}/>
                        </svg>
                        <span style={{marginLeft:'2px'}}>Don't Recommend</span>
                        <p style={{marginLeft:'2px'}} id={'dont'+props.value._id}>{props.value.dontrecommend?props.value.dontrecommend.length:0}</p>
                    </button>
                </div>    
            </div>
            <div className="container fixed-bottom" style={{animation:'FadeIn .5s 1',padding:'15px',backgroundColor:'white', display:'none'}} id={"postMenu"+props.value._id}>
                {user.username===props.value.creator&&<button className="btn btn-danger menuItem" id={"delete"+props.value._id} onClick={async()=>{await deleteCreation('post',props.value._id).then(data=>{let post=document.getElementById('post'+props.value._id);
                    setIndicator({className:'badge-danger',info:data});if(data==='Done'){setIndicator({className:'badge-primary',info:data});post.style.animation='FadeOut 1s 1';setTimeout(()=>post.remove(),1000);setTimeout(setIndicator({info:''}),5000)}})}}>Delete</button>}                
                <button className="btn btn-danger menuItem" id={"report"+props.value._id} onClick={()=>{document.getElementById('reportModal'+ props.value._id).style.display='block';document.getElementById("postMenu"+props.value._id).style.display='none'}}>Report</button>
                <p className="btn btn-default menuItem" onClick={()=>showMenu('close','postMenu'+ props.value._id)}>Close</p>    
            </div>

        <div id={'reportModal'+ props.value._id} className='container fixed-bottom' style={{backgroundColor:'white',animation:'FadeIn .5s 1',borderRadius:'30px',padding:'15px',display:'none'}}>
            <button className='float-right btn' style={{marginBottom:'10px',backgroundColor:'white'}} onClick={()=>document.getElementById('reportModal'+ props.value._id).style.display='none'}>X</button>
            <form className='container form-group' method='POST' id={'reportForm'+props.value._id} onSubmit={(event)=>{event.preventDefault();ajaxFunc(props.value._id,props.value._id,'report')}}>
                <h4 className='text-secondary' id={'text'+props.value._id}>Report Post</h4>
                <input type='hidden' name='post' value={props.value._id} />
                <input type='text' name='concern' placeholder='Write you concerts' id={'concern'+props.value._id} className='form-control' onChange={(event)=>event.target.value.length>0&&event.target.value!==' '?document.getElementById('removebtn'+props.value._id).style.display='block':document.getElementById('removebtn'+props.value._id).style.display='none'} />
                <button type='submit' className='btn badge-pill container text-secondary' style={{display:'none',margin:'15px',backgroundColor:'white'}} id={'removebtn'+props.value._id}>Submit</button>
            </form>
        </div>
    </div>
    )
}

export function Create(props){
    const [indicator,setIndicator] = useState({className:'badge-pill',info:''})
    function uselocation(){
        var locationIn = document.getElementById('venue')
        if('geolocation' in navigator){
            setIndicator({className:indicator.className+' badge-primary',info:'Getting location'}) 
            navigator.geolocation.watchPosition(function(location){
                fetch(url+'/uldu',{credentials:'include',body:location.coords.latitude+','+ location.coords.longitude}).then(data=>data.text().then(res=>
                    locationIn.value =res))},
            function(){locationIn.setAttribute('placeholder','An error occurred we can\'t access your location')},{enableHighLocation:true})
        }else{
            locationIn.setAttribute('placeholder','Location is support supported by your browser ')
        }   
    }
    function submit(event){
        event.preventDefault()
        setIndicator({info:<Loader />})
        fetch(url+'/createpost',{method:'POST',body:new FormData(document.getElementById('form')),credentials:'include',redirect:'follow'}).then(data=>data.text().then(res=>{
            if(res !== 'error'){document.getElementById('form').reset()
                setIndicator({className:'badge-primary',info:<a style={{textDecoration:'none'}} className='badge-primary badge-pill' href={'/post/'+res}>Done, Click to View</a>})
                }else{setIndicator({info:'An error occurred please try again',className:'badge-danger'})}
        })).catch(err=>setIndicator({info:'An error occurred please try again',className:'badge-danger'}))
    }
    return (
    <div style={{animation:'SlideDown 1s'}}>
        <NavBar value={indicator}/>
        <div className="container" style={{marginTop:"19px"}}>
            <h4 className='text-danger container' id='error' > </h4>
            <form method="POST" className="form-group" id="form" onSubmit={submit}>
                <h1 id='message'> </h1>
                <label htmlFor="name" className='text-secondary'>Title or name</label>
                <input type="text" name="name" required placeholder="Product or Service name" id="name" className="form-control input" /><br />
                <label htmlFor="location" className='text-secondary'>Location</label>            
                <input type="text" id="location" name="location" required placeholder="Location" className="form-control input" />
                <span onClick={()=>uselocation()} className="btn badge badge-pill text-secondary" style={{margin:'10px'}}>Use your current location</span><br />
                <label htmlFor="description" className='text-secondary'>Discription</label>
                <textarea name="description" id="description" required placeholder="Description"style={{height:"auto"}} className="form-control input" ></textarea><br />
                <label htmlFor="tags" className='text-secondary'>Tags</label>
                <input type="text" id="tags" className="form-control input" required placeholder="Tags:(Comma separated) e.g: hotel,accommodation,jos etc" name="tags" /><br />
                <label htmlFor="currency" className='text-secondary'>Currency</label>
                <input type="text" id="currency" className="form-control input" required placeholder="Currency" name="currency" /><br />
                <label htmlFor="price" className='text-secondary'>Price</label>
                <input type="number" name="price" id="price" placeholder="Price" required className="form-control input" /> <br />
                <label htmlFor="jingle" className="text-secondary">Pictures of sample</label><br />
                <input type="file" id="jingle" onChange={()=>ajaxFunc('jingle')} accept="image/*" required /> 
                <input type="hidden" name="jingle" id="jingleurl" /><br />
                <svg xmlns="http://www.w3.org/2000/svg" style={{width: '30px',height: '30px',fill: '#007bff',margin: '10px'}} onClick={()=>{document.getElementById('jingle1').style.display='block';
                document.getElementById('plus1').style.display='none';document.getElementById('plus2').style.display='block'}} id="plus1" viewBox="0 0 14 16">
                    <path fillRule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"/>            
                </svg>
                <input type="hidden" name="jingle1" id="jingle1url" /><br />
                <input type="file" id="jingle1" onChange={ajaxFunc('jingle1')} style={{display: "none"}} accept="image/*" /><br />
                <svg xmlns="http://www.w3.org/2000/svg" style={{display:'none',width: '30px',height: '30px',fill: '#007bff',margin: '10px'}} onClick={()=>{document.getElementById('jingle2').style.display='block';
                document.getElementById('plus2').style.display='none';
                document.getElementById('plus1').style.display='none'}} id="plus2"  viewBox="0 0 14 16">
                    <path fillRule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"/>            
                </svg><p></p>
                <input type="hidden" name="jingle2url" id="jingle2url" />
                <p></p>
                <input type="file" name="jingle2" id="jingle2" onChange={ajaxFunc('jingle2')} style={{display: "none"}} accept="image/*" />
                <p></p>
                <input type="submit" className=" btn badge-pill btn-primary container" value="Post" />
            </form>
        </div>
    </div>
    )    
}