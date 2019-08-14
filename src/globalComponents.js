import React, {useEffect,useState,useContext} from 'react';
import {Link} from 'react-router-dom'
import {dateTime,ajaxFunc,uselocation,url,Context} from './index'
export function TopHeader(props){
    return(
        <div className="container-fluid" style={{margin:'15px 10px'}}>
            <Link to="/createpost" className="badge text-primary badge-pill button btn" style={{borderColor:'white'}}>Create Post</Link>
            <Link to="/shop" className="badge badge-pill button btn text-primary" onClick={()=>uselocation('shop')}>Shop </Link>
        </div>
    )
}
export function PureNavbar(props){
    return (
        <div className="row container-fluid sticky-top" id="navbar" style={{boxShadow:'none'}} >
            <div style={{color:"rgb(138, 133, 133)"}} id="logo">
                <h1>
                    <Link to="/">
                        <img src="/media/logo1024.png" id="logopic" alt='logo' className="float-left" height="35px" width="200px" style={{margin:"10px"}} />
                    </Link>
                </h1>
                <h4 className={'sticky-top notifier '+props.value.className}  style={{top:'60px',left:'30%',animation:'FadeIn .5s 1'}}>{props.value.info}</h4>
            </div> 
        </div>
    )
}
export function NavBar(props){    
    const [notifications,setNotifications]=useState([]),[saves,setSave] = useState({}),[searchValue,setSearch]=useState(''),loggedUser=useContext(Context),[indicator,setIndicator]=useState({className:'badge',info:'loading'}),
    nT=document.getElementById('notificationTray'),sT=document.getElementById('saveTray');
    useEffect(()=>{
        fetch(url+'/notification',{credentials:'include',redirect:'follow'}).then(data=>data.json().then(res=>{
            setNotifications(res);setIndicator({info:'',className:''})
        })).catch(err=>{console.log(err);setIndicator({info:'error',className:'badge-pill badge-danger'});})
        fetch(url+'/save', {credentials:'include',redirect:'follow'}).then(data=>data.json().then(res=>{
            setSave(res);
        })).catch(err=>{console.log(err);setIndicator({className:'badge-pill badge-danger',info:'error'});})
    },[])
    function showMenu(why,id){
        var menu = document.getElementById(id);if(why === "open"){menu.style.display = "block"}else{console.log(true);menu.style.display = "none"}
    }
    function notificationItem(type,notification,index){
        if(type === 'event'){
            return (<Link to={'/post/'+notification.post} key={index}><p className="btn container-fluid">{notification.creator+' has created an event'}</p></Link>)
        }else if(type === 'post'){
            return (<Link key={index} to={'/post/'+notification.post}>
                <div style={{marginBottom:"10px",padding:"10px",boxShadow:"none"}} className="btn container-fluid">
                <h5 className="float-left">{notification.creator+ " just posted"}</h5>
                <span className="float-right">{dateTime(notification.dateCreated,notification.timeCreated)}</span></div></Link>)
        }else if(type==='comment'){
            return (
                <Link key={index} to={'/comment/'+notification.comment}><div style={{marginBottom:"10px",padding:"10px",boxShadow:"none"}} className="btn container-fluid">
                    <h5 className="float-left">{notification.creator+' has commented on your post'}</h5>
                    <span className="float-right">{dateTime(notification.dateCreated,notification.timeCreated)}</span></div></Link>
            )
        }else if(type === 'reply'){
            return (
                <Link key={index} to={'/comment/'+notification.comment}><div style={{marginBottom:"10px",padding:"10px",boxShadow:"none"}} className="btn container-fluid">
                    <h5 className="float-left">{notification.creator+' has replied your comment'}</h5>
                    <span className="float-right">{dateTime(notification.dateCreated,notification.timeCreated)}</span></div></Link>
            )
        }else if(type === 'report'){
            return (
                <Link key={index} to={'/post/'+notification.post}><div style={{marginBottom:"10px",padding:"10px",boxShadow:"none"}} className="btn container-fluid">
                    <h5 className="float-left">Your post has been reported. Please edit it or we will remove it</h5>
                    <span className="float-right">{dateTime(notification.dateCreated,notification.timeCreated)}</span></div></Link>
            )
        }else if(type === 'follow'){
            return (
                <Link key={index} to={"/"+notification.creator}><div style={{marginBottom:"10px",padding:"10px",boxShadow:"none"}} className="btn container-fluid">
                    <h5 className="float-left">{notification.creator+' started following you'}</h5>
                        <span className="float-right">{dateTime(notification.dateCreated,notification.timeCreated)}</span></div></Link>
            )
        }else if(type === 'approved'){
            return (
                <Link key={index} to={'/shop/'+notification.shop}><div style={{marginBottom:"10px",padding:"10px",boxShadow:"none"}} className="btn container-fluid">
                    <h5 className="float-left">{notification.creator+" approved you as cart shopper"}</h5>
                    <span className="float-right">{dateTime(notification.dateCreated,notification.timeCreated)}</span></div></Link>
            )
        }else if(type === 'request'){
            return (
                <Link key={index} to={'/shop/'+notification.shop}><div style={{marginBottom:"10px",padding:"10px",boxShadow:"none"}} className="btn container-fluid">
                    <h5 className="float-left">{notification.creator+ " has requested to be your shopper"}</h5>
                    <span className="float-right">{dateTime(notification.dateCreated,notification.timeCreated)}</span></div></Link>
            )
        }
    }
    function searchChange(event){
        setSearch(event.target.value)
        event.target.value&&setSearch('loading')
        event.target.value!==""&&fetch(url+'/search',{method:'POST',credentials:'include',body:new FormData(document.getElementById('search'))})
        .then(data=>data.json().then(res=>{setSearch(res)
        })).catch(err=>{setSearch('error');console.log(err)})
    }
    function searchFunc(event){
        event.preventDefault()
        document.location.pathname='/search'+(document.location.search = document.getElementById('searchInput').value)    
    }
    function removeSave(id,type){
        setIndicator({className:' badge-primary',info:'Loading'})
        fetch(url+"/save/remove",{method:'post',credentials:'include',body:id}).then(data=>data.text().then(res=>{
            if(res==='done'){
                document.getElementById('saveLength').innerText=Number(document.getElementById('saveLength').innerText)-1

                setIndicator({className:' badge-primary',info:'Removed'});document.getElementById('save'+id).remove()
            }else{
                setIndicator({className:' badge-danger',info:'An error occurred'})
            }           
            setTimeout(()=>setIndicator({info:''}),5000)
        })).catch(err=>{setIndicator({className:' badge-danger',info:'An error occurred'});setTimeout(()=>setIndicator({info:''}),5000)})
        
    }
    return indicator.info!=='loading'&&indicator.info!=='error'?(
        <div style={{bottom:"10px",top:"0px",zIndex:"1200"}} className='sticky-top'>
        <div className="row container-fluid" id="navbar">
            <div style={{color:"rgb(138, 133, 133)"}} id="logo">
                <h1>
                    <Link to="/">
                        <img src="/media/logo1024.png" id="logopic" alt='logo' className="float-left" height="35px" width="200px" style={{margin:"10px"}} />
                    </Link>
                </h1>
            </div> 
            <span className="col-md-8" id="menuShow" style={{backgroundColor: "white",marginTop:"10px"}} onClick={()=>{var s=document.querySelector('#navbarContent'),ham=document.getElementById('ham'),x=document.getElementById('x'),
            nav=document.getElementById('navbar')
                if(s.style.display==='none'||s.style.display===''){
                    nav.style.animation='NavbarSlideDown 1s'
                    s.style.display='flex';s.style.animation='SlideDown 1s';ham.style.animation = 'FadeOut 1s ';x.style.animation='FadeIn 1s ';setTimeout(()=>{ham.style.display='none';x.style.display='block'},1000)
                }else{
                    nav.style.animation='NavbarSlideUp 1s'
                    s.style.animation='SlideUp 1s';ham.style.animation = 'FadeIn 1s ';x.style.animation='FadeOut 1s';setTimeout(()=>{ham.style.display='block';x.style.display='none';s.style.display='none';},1000)
                }}}>
                <svg xmlns="http://www.w3.org/2000/svg" id='ham' width="30" fill='#007bff' height="30" viewBox="0 0 24 24">
                    <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
                </svg>
                <svg id='x' xmlns="http://www.w3.org/2000/svg" style={{display:'none'}} width="30" fill='#007bff' height="30"  viewBox="0 0 12 16">
                    <path fillRule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/>
                </svg>
            </span>
            <div id="navbarContent" >
            <form id='search' onSubmit={searchFunc} style={{margin: "10px 0px",width: "300px"}}>
                    <input type="hidden" name="type" id="currentSearch" value="ajax" />
                    <input type="text" className=" input form-control" onChange={searchChange} id="searchInput" placeholder="Search " name="searchdata" />
                </form>
                    {saves&&saves.items&&saves.items.length>0 ?
                        <div id="save" >
                        <button onClick={()=>{sT.style.display='block';window.innerWidth>=561?sT.style.animation='SlideDown .5s 1':sT.style.animation='SlideUpPhone .5s 1'}} className="badge btn badge-pill" style={{boxShadow:"none",backgroundColor:'white'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='#007bff' viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M9 0H1C.27 0 0 .27 0 1v15l5-3.09L10 16V1c0-.73-.27-1-1-1zm-.78 4.25L6.36 5.61l.72 2.16c.06.22-.02.28-.2.17L5 6.6 3.12 7.94c-.19.11-.25.05-.2-.17l.72-2.16-1.86-1.36c-.17-.16-.14-.23.09-.23l2.3-.03.7-2.16h.25l.7 2.16 2.3.03c.23 0 .27.08.09.23h.01z"/>
                            </svg>                
                            <p id="saveLength" className="badge badge-pill badge-danger" style={{position:"relative",top:"-10px",left: "-10px"}}>{saves.items.length}</p>
                        </button>
                    </div>:
                    <div onClick={()=>{if(saves){sT.style.display='block';window.innerWidth>=561?sT.style.animation='SlideDown .5s 1':sT.style.animation='SlideUpPhone .5s 1'}}} style={{boxShadow:'none',marginTop:'10px'}} className="badge btn badge-pill" id="nosave">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="36" fill='grey' viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M9 0H1C.27 0 0 .27 0 1v15l5-3.09L10 16V1c0-.73-.27-1-1-1zm-.78 4.25L6.36 5.61l.72 2.16c.06.22-.02.28-.2.17L5 6.6 3.12 7.94c-.19.11-.25.05-.2-.17l.72-2.16-1.86-1.36c-.17-.16-.14-.23.09-.23l2.3-.03.7-2.16h.25l.7 2.16 2.3.03c.23 0 .27.08.09.23h.01z"/>
                        </svg>                
                    </div>
                    }
                    {(notifications&&notifications.length)?
                    <span onClick={()=>{if(notifications){nT.style.animation='SlideDown .5s 1';nT.style.display='block';}}} className="btn float-left" style={{boxShadow:"none"}}>
                        <svg version="1.1" width="44" height="36" viewBox="0 0 14 16" className="octicon octicon-bell" aria-label="notifications" role="img">
                            <path fill="#007bff" fillRule="evenodd" d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z" />
                        </svg>
                        <div className="badge badge-pill badge-danger" id="notificationsLength" style={{marginTop:"15px"}}>
                        {notifications.length >= 10? "9+":notifications.length}</div>
                    </span>:
                    <span onClick={()=>{nT.style.display='block';window.innerWidth>=561?nT.style.animation='SlideDown .5s 1':nT.style.animation='SlideUp .5s 1'}} className="btn text-secondary" style={{boxShadow: "none"}}>
                        <svg version="1.1" width="44" height="36" viewBox="0 0 14 16" className="octicon octicon-bell" aria-label="notifications" role="img">
                            <path fill='grey' fillRule="evenodd" d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z" />
                        </svg>
                    </span>
                    }
                    <div id="loginBotton" >
                        <img id="profilePic" alt={loggedUser.username+"'s picture"} src={loggedUser.dp} onClick={()=>showMenu('open','userMenu')} className="img-thumbnail" style={{borderRadius:"30px"}} />
                        <div className='container fixed-bottom' style={{backgroundColor:'white',animation:'FadeIn .5s 1',borderRadius:'30px',padding:'15px',display:'none'}} id="userMenu">
                            <a href={loggedUser.username?loggedUser.username:'/'} style={{fontSize:'24px'}} className="menuItem btn">{loggedUser.username}</a>
                            <a href='/logout'><h6 className="menuItem btn-danger btn " id="logout" style={{fontSize: "16px"}} >Logout</h6></a>
                            <a href='/termsofservice'><h6 className="btn text-secondary menuItem" style={{backgroundColor:"white"}} >About</h6></a>
                            <button className="btn btn-default menuItem text-secondary" style={{backgroundColor:"white"}} onClick={()=>document.getElementById('userMenu').style.display='none'}> Close</button>
                        </div>
                    </div>
            </div>
        </div>
        <h3 className={'badge-pill notifier fixed-top'+props.value.className}>{props.value.info}</h3>
        {
        <div id="notificationTray" className="container-fluid" style={{display:'none',backgroundColor:'white',height:'fit-content',maxHeight:'80%',overflow:'auto',top:window.innerWidth>=561?'10%':'21%'}}> 
            <button className="btn float-right" style={{backgroundColor:"white"}} onClick={()=>{nT.style.animation='SlideUp 1s ';setTimeout(()=>{nT.style.display='none'},1000)
            }}>X</button>
            <div className="container-fluid" style={{fontSize:"20px"}}>
            {notifications.length !== 0?notifications.map(notification => notificationItem(notification.type,notification,notifications.indexOf(notification))):
            <h4 className='text-secondary container' style={{left:'0',right:'0',position:'absolute'}}>You're all caught up</h4>}
            </div>
            {notifications.length !== 0&&<div className='container-fluid'>
                <button className='badge badge-pill btn badge-secondary float-right' id='clearNotifications' onClick={()=>ajaxFunc('','','clearNotifications')}>Clear all</button>
            </div>}
        </div>
        }
        <div id="saveTray" className="container-fluid" style={{display: "none",paddingTop:'30px',backgroundColor:'white',maxHeight:'80%',height:'fit-content',overflow:'auto'}}> 
            <span className="btn float-right" style={{backgroundColor:"white"}} onClick={()=>{sT.style.animation='SlideUp 1s ';setTimeout(()=>{sT.style.display='none'},1000)}}>X</span>
                <div className="container-fluid" style={{fontSize:"20px"}}>
                {saves&&saves.items&&saves.items.map(save => <div key={Math.random().toExponential()} id={'save'+save.itemId} style={{boxShadow:'.1px .1px 2px rgb(228, 225, 225)',marginBottom:'10px'}} 
                className='container-fluid'>
                    <Link to={'/post/'+save.itemId} style={{textDecoration:'none'}}>{save.itemName?save.itemName:'No name'}</Link>
                <button onClick={()=>removeSave(save.itemId)} className='float-right text-danger badge-pill btn' 
                style={{marginRight:'20px',boxShadow:'none',padding:'0px',backgroundColor:'white'}}>
                    <b>X</b>
                </button></div>
                )}
                {saves&&saves.items&&saves.items.length===0&&<h4 className='text-secondary container'>You've not saved anything yet</h4>
                }
            </div>
        </div>
        {searchValue==='loading'?<Loader />:searchValue&&<SearchModal value={searchValue}/>}

        </div>
    ):indicator.info==='error'?<NotFound />:<Loader />
}

export function Loader(props){
    return <div id="loader" style={{display:"block",animation:'SlideDown 1s'}}></div>
}
export function InlineLoader(props){
    return <div id='inline-loader'></div>
}
export function SearchModal(props){
    return(
        <div className='container-fluid' style={{height:"80%",overflow:'auto',position:'fixed',zIndex:'1000',backgroundColor:'white',boxShadow: '1px 10px 10px rgb(228, 225, 225)'}} id='searchModal'>
            <div className='container-fluid'><button className='btn badge-pill float-right' style={{backgroundColor:'white',fontSize:'20px'}} onClick={()=>document.getElementById('searchModal').style.display='none'}>X</button></div>
            {props.value.length===0&&<div className='text-secondary container'><h1 >No Results Found</h1></div>}
            {    
                props.value.map&&props.value.map(item=>item.type&&(
                    <Link to={'/post/'+(item._id)} key={'searchItem'+props.value.indexOf(item)} id='default' style={{ margin:'5px',textDecoration:'none'}}>
                        <div className="container-fluid row" style={{borderBottom:'rgb(228, 225, 225) .5px inset',}}>
                            <img alt={item.name} src={ item.jingle} style={{margin:'1px 5px',borderRadius: '50px',height:'60px',width:'60px'}}
                            className='img-thumbnail' />
                            <h3>{item.creator}</h3>
                            <h6 className="text-secondary col-lg-5 indexDate">{item.name}</h6>
                        </div>
                    </Link>
                )
                )
            }
            {
                props.value.map&&props.value.map(item=>item.user&&(
                    <Link to={(item.username)} key={'post'+props.value.indexOf(item)} style={{ margin:'5px',textDecoration:'none'}}>
                        <div className="container-fluid row" style={{borderBottom:'rgb(228, 225, 225) .5px inset',}}>
                            <img alt={item.username+"'s picture"} src={ item.dp} style={{margin:'1px 5px',borderRadius: '50px',height:'60px',width:'60px'}}
                            className='img-thumbnail' />
                            <h3 className="text-secondary col-lg-5 indexDate">{item.username}</h3>
                        </div>
                    </Link>
                ))
            }
            {
                props.value.map&&props.value.map(item=>item.user&&(
                    <Link to={(item.username)} key={'user'+props.value.indexOf(item)} style={{ margin:'5px',textDecoration:'none',display:'none'}}>
                        <div className="container-fluid row" style={{borderBottom:'rgb(228, 225, 225) .5px inset',}}>
                            <img alt={item.username+"'s picture"} src={ item.dp} style={{margin:'1px 5px',borderRadius: '50px',height:'60px',width:'60px'}}
                            className='img-thumbnail' />
                            <h3 className="text-secondary col-lg-5 indexDate">{item.username}</h3>
                        </div>
                    </Link>
                ))
                
            }
        </div>
    )
}
export function Search(props){
    const [search,setSearch] = useState([]),[indicator,setIndicator] = useState({className:'badge-pill badge-primary',info:'loading'})
    const SearchForm = new FormData();
    SearchForm.append('type','page');SearchForm.append('searchdata',window.location.search.substring(window.location.search.indexOf('?')+1))
    useEffect(()=>{
        fetch(url+'/search',{method:'post',credentials:'include',body:SearchForm}).then(data=>data.json().then(res=>{
            setSearch(res);setIndicator({className:'',info:''});
        })).catch(err=>{setIndicator('An error occurred');console.log(err)})
    },[SearchForm])
    return <div><NavBar value={indicator}/>
        <div id="searchMenu" className="text-secondary" >
            <div style={{padding:" 5px"}}>
                <p className="badge-pill badge" style={{fontSize: "15px",boxShadow: "2px .5px 10px  rgb(187, 187, 187)", height: "25px"}}>Order by</p>
                <div className="form-group">    
                <button className="btn badge-pill text-secondary" style={{backgroundColor:'white'}} onClick={(event)=>{document.getElementById('default').style.display='block';
                document.getElementById('sorted').style.display='none';event.target.blur()}}>Price (Highest - Lowest)</button><br />
                <button className="btn badge-pill text-secondary" style={{marginTop: "10px",backgroundColor:'white'}} onClick={(event)=>{document.getElementById('default').style.display='none';
                document.getElementById('sorted').style.display='block';event.target.blur()}}>Price (Lowest - Highest)</button><br />
                </div>
            </div>
            <div className="list-group-item" style={{display:"none"}}></div>
        </div>
        {search.length>0&&indicator.info!=='loading'?(
        <div className="row" id='searchBody' style={{marginLeft:"10px"}}>
            {search.map(post=>
            <div key={search.indexOf(post)} id='default' style={{padding:'20px'}} className="container-fluid itemList">
                <Link to={'/post/'+post._id} style={{textDecoration:'none'}}>
                <img src={post.jingle} className="float-left" style={{marginRight:"20px"}} alt={`jingle of ${post.name}`} height="100px" width="100px" />
                <p className="float-left text-secondary" style={{marginRight:"10px",fontSize:"20px"}}>{post.creator}</p>                    
                <p className="float-right text-secondary" style={{marginRight:"10px",fontSize:"20px"}}>{dateTime(post.datePosted,post.timePosted)} </p>
                <p className="float-left text-secondary" style={{marginRight:"10px",fontSize:"20px"}}>{post.name}</p>
                <p className="float-left text-secondary" style={{marginRight:"10px",fontSize:"20px"}}> {post.location}</p>
                <p className="float-right text-secondary" style={{fontSize:'23px'}}>{post.currency&&post.currency.length === 1?post.currency+" "+ post.price:post.price+' '+ post.currency }</p>
                </Link>
            </div>
                
            )}
            {search.reverse().map(post=>
            <div key={search.indexOf(post)} id='sorted' style={{padding:'20px'}} className="container-fluid itemList">
            <Link to={'/post/'+post._id} style={{textDecoration:'none'}}>
            <img src={post.jingle} className="float-left" style={{marginRight:"20px"}} alt={`jingle of ${post.name}`} height="100px" width="100px" />
            <p className="float-left text-secondary" style={{marginRight:"10px",fontSize:"20px"}}>{post.creator}</p>                    
            <p className="float-right text-secondary" style={{marginRight:"10px",fontSize:"20px"}}>{dateTime(post.datePosted,post.timePosted)} </p>
            <p className="float-left text-secondary" style={{marginRight:"10px",fontSize:"20px"}}>{post.name}</p>
            <p className="float-left text-secondary" style={{marginRight:"10px",fontSize:"20px"}}> {post.location}</p>
            <p className="float-right text-secondary" style={{fontSize:'23px'}}>{post.currency&&post.currency.length === 1?post.currency+" "+ post.price:post.price+' '+ post.currency }</p>
            </Link>
        </div>)}
        </div>):<div id='searchBody'><h1 className="text-secondary">Sorry no Name of Event of Post found</h1></div>
        }
    </div>
}
export function NotFound(props){
    return (
        <div style={{animation:'SlideDown 1s'}}>
            <h1 className='text-danger' style={{position:'absolute',top:'50%',left:(window.outerWidth/4)+'px'}}>
                Sorry Page Not Found</h1>
        </div>
    )
}