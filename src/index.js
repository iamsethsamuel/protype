import React,{useState, useEffect,useContext} from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import {Posts,PostDetails, Replies, Create} from './posts'
export const url = 'http://127.0.0.1:8080'

export const Context = React.createContext({})
const Provider = Context.Provider
function Routing(props){
    const [user, setUser] =useState('loading');
    useEffect(()=>{
        fetch(url+'/user',{credentials:'include',redirect:'follow'}).then(data=>data.redirected?console.log(data):data.json().then(res=>{
            if(res.err){window.location.pathname='/login';setUser('NotLoggedIn')}else{setUser(res);}
        }).catch(err=>{console.log(err);}))
        .catch(err=>{console.log(err);})
    },[]);

    return <Provider value={user}>
        <Router>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/post/:id' component={PostDetails} />
                <Route path='/comment/:id' component={Replies} />
                <Route exact path='/createpost' component={Create} />                
            </Switch>
        </Router>
    </Provider>
}
ReactDOM.render(<Routing />, document.getElementById('root'));
function App(props){
    const [posts, setPosts] = useState({posts:[],page:0,first:true}),
    [status] = useState('loading'),user = useContext(Context),pageDiv=document.getElementById('page')

    useEffect(()=>{
        document.onscroll=()=>{
            if((window.innerHeight+window.scrollY)/3>=(document.body.scrollHeight)/3){        
                if(pageDiv!=='loading'&&posts.page){loadMore()}
            }
        }
        setPosts(posts)
    },[posts])
    function loadMore(){
        pageDiv.innerText = 'loading'        
        fetch(url+`/?page=${posts.page}`,{credentials:'include',redirect:'follow'}).then(data=>data.json().then(res=>{
            if(res.posts.length===10){
                setPosts({posts:posts.posts.concat(res.posts),page:res.page});                
            }else{
                setPosts({posts:posts.posts.concat(res.posts),page:null})
            }
        })).catch((err)=>{pageDiv.innerText='Click to loadmore';})
    }
    
    useEffect(()=>{
        fetch(url,{credentials:'include',redirect:'follow'}).then(data=> data.json().then(res=>{
            setPosts({posts:res,page:res.length===10})
        })).catch((err)=>{console.log(err)})
    },[props.location.value])
    
    return status==='loading'&&status==='Error'?<div>{document.getElementById('loader').style.display='block'}</div> :(
        <div style={{animation:'SlideDown 1s'}}>
        <NavBar value={{className:'',info:''}}/>
        <div id="mainContainer" className="row container-fluid">
            {user.username&&<TopHeader />}
            {posts.posts.length&&posts.posts.map(post=>
                <Posts key={Math.random().toExponential()} value={post}/>
            )}
        </div>
        <button id='page' onClick={()=>loadMore()} className='badge badge-pill btn container badge-primary' style={{display:'none'}}></button>
        </div>
    );
}



export function dateTime(date,time){
    let postDate = new Date(date+" "+time),
        currentDate = new Date(),
        parseDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`
    if(parseDate===date){
        if(postDate.getHours()===currentDate.getHours()&&postDate.getMinutes()===currentDate.getMinutes()){
            return "Just Now" 
        }else if(postDate.getHours()===currentDate.getHours()){
            return `${Number(currentDate.getMinutes())-Number(postDate.getMinutes()) > 1 ?`${Number(currentDate.getMinutes())-Number(postDate.getMinutes())} minutes ago`:
            `${Number(currentDate.getMinutes())-Number(postDate.getMinutes())} minute ago`}` 
        }else if( (currentDate.getHours() - postDate.getHours()) ===1 ){
            return `${(currentDate.getMinutes()+60)-postDate.getMinutes() > 1 ?`${(currentDate.getMinutes()+60)-postDate.getMinutes()} minutes ago`:
                        `${(currentDate.getMinutes()+60)-postDate.getMinutes()} minute ago` }`
        }else{
            return `${currentDate.getHours()-postDate.getHours() > 1 ?`${currentDate.getHours()-postDate.getHours()} hours ago`:
            `${currentDate.getHours()-postDate.getHours()} hour ago`}`
        }
    }else{
        if(postDate.getFullYear()===currentDate.getFullYear()&&postDate.getMonth()===currentDate.getMonth()){
            return `${currentDate.getDate()-postDate.getDate() > 1 ? `${currentDate.getDate()-postDate.getDate()}  days ago`:
            `${currentDate.getDate()-postDate.getDate()} day ago`}` 
        }else if( (currentDate.getFullYear()-postDate.getFullYear())===1 && (currentDate.getDay()+ postDate.getDate())!== 30 && postDate.getMonth() ===11 ){
            return `${currentDate.getDate()>1?`${currentDate.getDate()} days ago`:`${currentDate.getDate()} day ago}`}`
        }else if(postDate.getFullYear() ===currentDate.getFullYear()){
            return `${currentDate.getMonth()-postDate.getMonth() > 1 ? `${currentDate.getMonth()-postDate.getMonth()} months ago`:
            `${currentDate.getMonth()-postDate.getMonth()} month ago`}`
        }else if((currentDate.getFullYear() - postDate.getFullYear()) === 1){
            return `${(currentDate.getMonth()+12)-postDate.getMonth()>1?`${(currentDate.getMonth()+12)-postDate.getMonth()} months ago`:
        `${(currentDate.getMonth()+12)-postDate.getMonth()} month ago`}`
        }else{
            if(currentDate.getMonth()===postDate.getMonth()){
                return `${currentDate.getFullYear()-postDate.getFullYear() > 1 ? `${currentDate.getFullYear()-postDate.getFullYear()} years ago`:
                `${currentDate.getFullYear()-postDate.getFullYear()} year ago`}`
            }else{
                return `${Number(currentDate.getMonth()-postDate.getMonth())+1 > 1 ? `${Number(currentDate.getMonth()-postDate.getMonth())+1} months ago`:
                `${Number((postDate.getMonth()+1)-(currentDate.getMonth()+1))} month ago`}`
            }
        }
    }
}
export function uselocation(type){
    if('geolocation' in navigator){
        navigator.geolocation.watchPosition(location=>{
        if(type === 'shop'){
        fetch(url+'/uldu',{method:'POST',data:JSON.stringify(location.coords.latitude+','+ location.coords.longitude),credentials:'include',redirect:'follow'})
        .catch(err=>console.log(err))
        }else if(type==='createshop'){
            fetch(url+'/uldu',{method:'POST',data:JSON.stringify(location.coords.latitude+','+ location.coords.longitude),credentials:'include',redirect:'follow'}).then(data=>data.text()
            .then(res=>{
                document.querySelector('#delivery').value=res
            }))
        }},(err)=>{
            console.log(err)
        },{enableHighLocation:true})
    }else{document.getElementById('updatelocation').innerText='Location is support supported by your browser'}
}
export function showMenu(why,id){
    var menu = document.getElementById(id);
    if(why === "open"){menu.style.display = "block"}
    else{menu.style.display = "none"}
}
export function ajaxFunc(id,args, type){
     if(type === "notification"){document.querySelector("#notificationTray").style.display = "block";
    }else if(type==="closeNotification"){document.querySelector("#notificationTray").style.display = "none"
    }else if(type==="removesave"){
        fetch("/save/remove",{method:'post',credentials:'include',body:JSON.stringify({save:id,})}).then(data=>data.text().then(res=>{
        if(res === "Deleted"){document.location = "/"}else{document.querySelector(`#save${id}`).remove()}
    }));
    }else if(type === 'recommend'){
        const recommend = document.getElementById('recommend'+id),
            recommendIcon = document.getElementById('icon'+id),
            recommendBtn = document.getElementById('btn'+id),
            dontrecommend = document.getElementById('dont'+id),
            dontrecommendIcon = document.getElementById('donticon'+id),
            dontrecommendBtn = document.getElementById('dontbtn'+id)
        recommendBtn.blur()
        fetch(url+'/recommend',{method:'post',credentials:'include',body:args}).then(data=>data.json().then(res=>{
            recommend.innerText = res.data;if(res.type==='recommend'){recommendBtn.classList='btn text-primary';recommendIcon.setAttribute('fill','#007bff');
            dontrecommendBtn.classList='btn text-secondary';dontrecommendIcon.setAttribute('fill','grey');dontrecommend.innerText=res.dontrecommend
        }else {recommendBtn.classList='btn text-secondary';recommendIcon.setAttribute('fill','grey')}
            
        })).catch(err=>console.log(err))
    }else if(type === 'dontrecommend'){
        const recommend = document.getElementById('recommend'+id),
            recommendIcon = document.getElementById('icon'+id),
            recommendBtn = document.getElementById('btn'+id),
            dontrecommend = document.getElementById('dont'+id),
            dontIcon = document.getElementById('donticon'+id),
            dontrecommendBtn = document.getElementById('dontbtn'+id)
        dontrecommendBtn.blur()
        fetch(url+'/dontrecommend',{method:'post',credentials:'include',body:args}).then(data=>data.json().then(res=>{
            dontrecommend.innerText = res.data;if(res.type==='dontrecommend'){dontrecommendBtn.classList='btn text-primary';dontIcon.setAttribute('fill','#007bff')
            }else{dontrecommendBtn.classList='btn text-secondary';dontIcon.setAttribute('fill','grey')}
            recommendBtn.classList='btn text-secondary';recommendIcon.setAttribute('fill','grey');recommend.innerText=res.recommend
        })).catch(err=>console.log(err))
    }else if(type === 'report'){
        const report = document.getElementById('reportForm'+id),
            reportText = document.getElementById('text'+id)
        document.getElementById('postMenu'+id).style.display='none'
        fetch(url+'/report',{method:'post',credentials:'include', body:new FormData(report)}).then(data=>data.text().then(res=>{
            if(res==='done'){reportText.innerText = 'Successfully reported';document.getElementById('concern'+id).value = ''}else{reportText.className='text-danger';reportText.innerText='An Error occurred'}
        })).catch(err=>{reportText.innerText='An Error occurred';reportText.className='text-danger';console.log(err)})
    }else if(type==='clearNotifications'){
        fetch(url+'/clearnotifications',{credentials:'include'}).then(data=>data.text().then(res=>{
            if(res==='done'){
                document.getElementById('notificationTray').innerText='Notifications cleared';document.getElementById('notificationsLength').innerHTML=''
            }else{document.getElementById('clearNotifications').innerText='Error'
            }
        })).catch(err=>document.getElementById('clearNotifications').innerText='Error')
    }
}

export async function deleteCreation(type,id){
    let returnData = 'deleted';
    if(type==='post'){
         await fetch(url+'/delete/'+id,{credentials:'include',redirect:'follow'}).then(data=>{returnData=data.text();})
        .catch(err=>{console.log(err);returnData='An error occurred'})
    }else if(type==='deleteReply'){
        await fetch(url+'/deletereply',{credentials:'include',redirect:'follow',method:'post',body:id})
        .then(data=>{returnData=data.text();}).catch(err=>{returnData='An error occurred'})
    }else if(type==='deleteComment'){
        await fetch(url+'/deletecomment',{credentials:'include',redirect:'follow',method:'post',body:id})
        .then(data=>{returnData=data.text();}).catch(err=>{returnData='An error occurred'})
    }
    return returnData
}