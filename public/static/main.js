var cook = Cookies("csrftoken"),session=Cookies('sessionid'),ajax = new XMLHttpRequest(),deferedinstall; function more(page){var mainContainer = document.getElementById("mainContainer");
var more = document.getElementById("showMore");var ajax = new XMLHttpRequest();ajax.open("GET","/?page="+page);ajax.responseType = "document";ajax.onloadstart =function(){loader.style.display="block"}
ajax.send();ajax.addEventListener("load",function(load){loader.style.display="none";more.remove();mainContainer.innerHTML += ajax.responseXML.body.innerHTML})
ajax.addEventListener("error",function(error){console.log(error);})}function searchFunc(event,order){var searchInput = document.getElementById("searchInput")
var change = document.getElementById("change");var page = document.getElementById("page");var ajax = new XMLHttpRequest();
var searchBody = document.getElementById("searchBody");var search = document.getElementById("currentSearch");var more = document.getElementById("more"),loader=document.getElementById('loader');if(page){
if(page.innerText){ajax.open("POST","/search"+page.innerText);ajax.responseType = "document";ajax.responseType = "document";ajax.onloadstart =function(){loader.style.display="block"};ajax.send(`searchdashowMore=${search.innerText}&sortdata=${order}`)
ajax.addEventListener("load",function(){loader.style.display="none";more?more.remove():null;searchBody.innerHTML += ajax.responseXML.body.innerHTML})}};ajax.onloadstart =function(){loader.style.display="block"};
if(order && order.includes("st")){ajax.open("POST","/search");ajax.responseType = "document";ajax.send(`searchdata=${search.innerText}&sortdata=${order}`)
ajax.addEventListener("load",function(){loader.style.display="none";searchBody.innerHTML = ajax.responseXML.body.innerHTML})}else{if(event.keyCode >= 65 && event.keyCode <=90 || event.keyCode === 8){  
ajax.open("POST","/search");ajax.setRequestHeader("Requested-for","Name");ajax.responseType = "document";ajax.send(`searchdata=${searchInput.value}`);ajax.onloadstart =function(){loader.style.display="block"};
ajax.addEventListener("load",function(){loader.style.display="none";change.innerHTML = ajax.responseXML.body.innerHTML;change.style.display='block'})}else if(event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode===189 || event.keyCode===8){
change.innerHTML = '<h6 class="container text-secondary"><b>Use the format: 1996-10-10</b></h6>';if(search.value.length <= 10){
ajax.open("POST","/search");ajax.setRequestHeader("Requested-for","Date");ajax.responseType = "document";ajax.send(`searchdata=${search.value}`);ajax.onloadstart =function(){loader.style.display="block"};
ajax.addEventListener("load",function(){loader.style.display="none";change.innerHTML = ajax.responseXML.body.innerHTML})}}}}function check(){var confirmpassword = document.getElementById("confirmPassword");var password = document.getElementById("password")
var passinfo = document.getElementById("passinfo");if(confirmpassword.value !== password.value){passinfo.style.display = "block"
confirmpassword.focus();confirmpassword.style.borderColor = "red"}else{passinfo.style.display = "none";confirmpassword.style.borderColor = "white"}}
function userMenu(){var menu = document.getElementById("userMenu");menu.style.display === "block"?menu.style.display = "none":menu.style.display = "block"}
function followed(event){event.preventDefault();var form = document.createElement("form");var follow = document.getElementById("follow")
var hide = document.createElement("input");var submitt  = document.createElement("input");var followForm = document.getElementById("followForm")
var stats = document.getElementById("userStats");var ajax = new XMLHttpRequest();ajax.open("POST", "/follow");ajax.send(`user=${follow.value}`);ajax.onloadstart =function(){loader.style.display="block"};
ajax.onloadstart =function(){loader.style.display="block"};ajax.addEventListener("load",function(){loader.style.display="none";form.method = "POST";form.setAttribute("onsubmit","unFollow(event)");hide.type = "hidden";hide.id = "unfollow";hide.value = follow.value
form.id="unFollowForm";hide.name = "user";submitt.type = "submit";submitt.value = "Unfollow";submitt.setAttribute("class", "btn btn-primary");form.appendChild(hide)
form.appendChild(submitt);followForm.replaceWith(form);stats.innerText = ajax.response})}function unFollow(event){event.preventDefault();var form = document.createElement("form")
var unfollow = document.getElementById("unfollow");var hide = document.createElement("input");var submitt  = document.createElement("input");var followForm = document.getElementById("unFollowForm")
var stats = document.getElementById("userStats");var ajax = new XMLHttpRequest();ajax.open("POST", "/unfollow");ajax.send(`user=${unfollow.value}`);ajax.onloadstart =function(){loader.style.display="block"};
ajax.onloadstart =function(){loader.style.display="block"};ajax.addEventListener("load",function(){loader.style.display="none";form.method = "POST";form.setAttribute("onsubmit","follow(event)");hide.type = "hidden";hide.value = unfollow.value
form.id="follow";hide.name = "user";submitt.type = "submit";submitt.value = "Follow";submitt.setAttribute("class", "btn btn-primary");form.appendChild(hide)
form.appendChild(submitt);followForm.replaceWith(form);stats.innerText = ajax.response})}function moreJingle(event){var form = document.getElementById("form")
var btn = document.getElementById("moreSample");var btn2 = document.getElementById("moreSample2");if(btn){btn.display = "block"}
if(btn2){btn.display = "block"}}function commentFunc(event,url,first,second,id,from){event.preventDefault();var post = document.getElementById(first)
var comment = document.getElementById(second);var main = document.getElementById("main"+id);var ajax = new XMLHttpRequest();ajax.open("POST",url)
ajax.responseType = "document";if(url === "/comment"){ajax.send(`comment=${comment.value}&post=${post.value}`);ajax.onloadstart =function(){loader.style.display="block"};
ajax.addEventListener("load", function(){loader.style.display="none";if(from){comment.value="";comment.setAttribute('placeholder',"Successful commented")}else{main.innerHTML += ajax.responseXML.body.innerHTML}})
}else if(url=== "/replycomment"){ajax.onloadstart =function(){loader.style.display="block"};ajax.send(`comment=${post.value}&reply=${comment.value}`);
ajax.addEventListener("load",function(){loader.style.display="none";
var body=document.getElementById("body");body.innerHTML += ajax.responseXML.body.innerHTML})}}function rest(){if(window.innerHeight <= 517){
var res = document.getElementById("res");var ins = document.getElementById("ins");res.style.width = "100%";ins.replaceWith(res)}}function showMenu(why,id){
var menu = document.getElementById(id);if(why === "open"){menu.style.display = "block"}else{menu.style.display = "none"}}function displaySearch(){
var menuPointer = document.getElementById("menuPointer");var searchForm = document.getElementById("searchForm")
var login = document.getElementById("loginBotton");var navArrow = document.getElementById("navbarArrow");
if(navArrow.innerHTML.charCodeAt()==9664){searchForm.style.display = "block";menuPointer.style.animationName = "searchOut";menuPointer.style.width="390px";menuPointer.style.marginLeft="0px"
menuPointer.style.animationDuration = "2s";menuPointer.style.left = "50%";login.style.display = "none";navArrow.innerHTML = '&#9654;'}else{menuPointer.style.width="50px";menuPointer.style.marginLeft=document.body.scrollWidth<=500?"0px":"23%"
menuPointer.style.animationName = "searchIn";menuPointer.style.animationDuration = "1s";menuPointer.style.left = "36%"
login.style.display = "block";navArrow.innerHTML = '&#9664;';menuPointer.style.paddingLeft = "10px";searchForm.style.display = "none"}}
function ajaxFunc(id,user, type){var ajax = new XMLHttpRequest();if(type === "report"){var report = document.getElementById("report"+id)
ajax.open("POST", "/report");ajax.send(`user=${user}&post=${id}`);ajax.onloadstart =function(){loader.style.display="block"};ajax.addEventListener("load",function(){loader.style.display="none";report.innerText = ajax.response})
}else if(type === "notification"){document.querySelector("#notificationTray").style.display = "block";ajax.open("POST","/notification");ajax.send("user="+user)
}else if(type==="closeNotification"){document.querySelector("#notificationTray").style.display = "none"}else if(type==="save"){var save = document.getElementById("save")
ajax.open("POST","/save");ajax.send(`post=${id}&user=${user}`);ajax.onloadstart =function(){loader.style.display="block"};ajax.addEventListener("load",function(){loader.style.display="none";var add = document.getElementById("a"+id)
var anchor = document.createElement("a");var nosave = document.getElementById("nosave");if(nosave){anchor.className = "badge btn badge-pill" 
anchor.style.marginTop = "10px";anchor.style.fontSize = "20px";anchor.href = "/save/"+ajax.response.substring(ajax.response.search(",")+1,ajax.response.length)
anchor.innerText = "Save";nosave.replaceWith(anchor)}add.remove();save.innerText = ajax.response.substring(0,ajax.response.search(","))})
}else if(type==="removefromsave"){ajax.open("POST","/save/remove");ajax.onloadstart =function(){loader.style.display="block"};ajax.onloadstart =function(){loader.style.display="block"};
ajax.send(`save=${id}&itemId=${user[1]}&itemJingle=${user[0]}&itemName=${user[2]}&itemCurrency=${user[3]}&itemPrice=${user[4]}&id=${user[5]}`)
ajax.addEventListener("load",function(){loader.style.display="none";if(ajax.response === "Deleted"){document.location = "/"}else{document.querySelector("#item"+user[1]).remove()}            })}}
function changeSearch(item){var names = document.getElementById("names"),description = document.getElementById("descriptions"),
locations = document.getElementById("locations"),tags = document.getElementById("tags"),nameMenu = document.getElementById("menuNames"),descriptionMenu = document.getElementById("menuDescriptions"),
locationMenu = document.getElementById("menuLocations"),tagMenu = document.getElementById("menuTags"),main = document.getElementById("main")
if(item == "names"){nameMenu.style.backgroundColor = "#007bff";descriptionMenu.style.backgroundColor = "#fff";locationMenu.style.backgroundColor = "#fff";main.innerHTML = names.innerHTML;
description.style.display = "none";locations.style.display = "none";tags.style.display="none"
tagMenu.style.backgroundColor="#fff"}else if(item === "descriptions"){descriptionMenu.style.backgroundColor = "#007bff";nameMenu.style.backgroundColor = "#fff"
locationMenu.style.backgroundColor = "#fff";main.innerHTML = descriptions.innerHTML;description.style.display = "block"
locations.style.display = "none";tags.style.display="none";tagMenu.style.backgroundColor="#fff"}else if(item === "locations"){locationMenu.style.backgroundColor = "#007bff";descriptionMenu.style.backgroundColor = "#fff"
nameMenu.style.backgroundColor = "#fff";main.innerHTML = locations.innerHTML;description.style.display = "none";
locations.display = "block";tags.style.display="none";tagMenu.style.backgroundColor="#fff"}else if(item === "tags"){
locationMenu.style.backgroundColor = "#fff";descriptionMenu.style.backgroundColor = "#fff";nameMenu.style.backgroundColor = "#fff"
tagMenu.style.backgroundColor = "#007bff";main.innerHTML = tags.innerHTML;description.style.display = "none";
locations.display = "none";tags.display="block"}else{names.style.display = "none";description.style.display = "none";locations.style.display = "none"}}window.onclick = function (){document.querySelector("#change").innerText = ""}
if(document.location.pathname.startsWith("/search")){window.addEventListener("scroll",()=>{if(window.scrollY+window.innerHeight == document.body.scrollHeight){
var search = document.getElementById("searchInput");var change = document.getElementById("change");var page = document.getElementById("page");var ajax = new XMLHttpRequest();
var searchBody = document.getElementById("searchBody");var search = document.getElementById("currentSearch");if(page.innerText){
ajax.open("POST","/search"+page.innerText);ajax.responseType = "document";ajax.onloadstart =function(){loader.style.display="block"};ajax.send(`searchdata=${search.innerText}&sortdata=${order}`);ajax.addEventListener("load",function(){
searchBody.innerHTML += ajax.responseXML.body.innerHTML;loader.style.display="none"})}}})}function showNav(){var navbarContent = document.getElementById('navbarContent'), downPointer = document.getElementById('down-pointer');
navbarContent.style.display == '' || navbarContent.style.display == 'none'?navbarContent.style.display='flex':navbarContent.style.display='none';downPointer.style.transform == 'rotate(180deg)'||downPointer.style.transform == ''?
downPointer.style.transform = 'rotate(90deg)':downPointer.style.transform = 'rotate(180deg)'}function uselocation(){var userloc = document.getElementById('delivery');if('geolocation' in navigator){
userloc?userloc.setAttribute('placeholder', 'Loading'):null; navigator.geolocation.watchPosition(function(location){ajax.open('POST','/uldu');ajax.send(location.coords.latitude+','+ location.coords.longitude);ajax.onload=function(){
userloc.value = ajax.response}},function(){userloc?userloc.setAttribute('placeholder','An error occurred we can\'t access your location'):null},{enableHighLocation:true})
}else{userloc ?userloc.setAttribute('placeholder','Location is support supported by your browser '):null}}
var config = {
    apiKey: "AIzaSyAO6u2kF_FxhKkrzzwKDD5Y9qhZFu9jT74",
    authDomain: "venmunn.firebaseapp.com",
    databaseURL: "https://venmunn.firebaseio.com",
    projectId: "venmunn",
    storageBucket: "venmunn.appspot.com",
    messagingSenderId: "347307342195",
    appId: "1:347307342195:web:3cf41443871e51b4"
  };
// firebase.initializeApp(config)
// // if('serviceWorker' in navigator){
// //     navigator.serviceWorker.register('/sw.js').then(registeration=>{
// //         messaging.useServiceWorker(registeration)
// //         messaging.getToken().then(token=>{ajax.open('POST','/register');ajax.send(token);
// //         ajax.onload = function(){}}).catch(err=>{console.error(err)})
// //     }).catch(err=>{
// //         console.error(err)
// //     })
// //     window.addEventListener('beforeinstallprompt',event=>{
// //         event.preventDefault()
// //         deferedinstall = event
// //     })
// //     var messaging = firebase.messaging()    
// //     messaging.usePublicVapidKey("BBEprVT1yeyTuiVx9Le8qA27AZJoRX-0ZRMpa_svRID0gZE7b-BaQJ212EOIhBpo_qUEXhKJjoGdd6nYlvY2-MA")
// //     messaging.requestPermission().then(function(){  
// //     }).catch(function(err){console.log(err)})
// //     messaging.onTokenRefresh(()=>{
// //         messaging.getToken().then(token=>{ajax.open('POST','/register');ajax.send(token);
// //         ajax.onload = function(){}}).catch(err=>{console.error(err)})
// //     })
// //     messaging.onMessage(payload=>{
// //         new Notification(payload.notification.title,{body:payload.notification.body,icon:payload.data.icon?payload.data.icon:"/media/upload_653ff8f15409b4b2ea96cfd419579b72.png",vibrate:[100,10,100]})
// //     }) 
// // }
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        testAPI();
    } else {
        document.location="/login"
    }
}
function checkLoginState(res){
    FB.getLoginStatus(function(response){
        statusChangeCallback(response)
    })
}
window.fbAsyncInit = function(){
    FB.init({
        appId:2267217063596395,
        cookie:true,
        xfml:true,
        version:"v3.2"
    })
}

function statusChangeCallback(res){
    if(res.status === 'connected'){
        console.log(res);
        
    }else{
        document.location == '/login'
    }
}
function checkLoginState(res){
    FB.getLoginStatus(function(res){console.log(res)})
}

// FB.getLoginStatus(checkLoginState(res))
function fileUpload(jingle){    
    var fbs = firebase.storage.TaskEvent,storage = firebase.storage(),ref = storage.ref(),file = document.getElementById(jingle).files[0],postsRef = ref.child('posts/'+file.name).put(file);
    ref.child('posts/'+file.name).delete().catch(function(err){console.log(err)})
    document.getElementById('uploadModal').style.display = 'block'
    var progress = document.getElementById('progress') 
    postsRef.on(fbs.STATE_CHANGED,function(snapshot){
        progress.innerText = `${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`;
        switch (snapshot.state) {
            case fbs.PAUSED:
                progress.innerText = 'Paused'
                break;
            case fbs.RUNNING:
                document.getElementById('loader').style.display = 'block'
                break;
        }
    },function(err){
        switch (err.code) {
            case 'storage/unauthorized':
                progress.innerText = 'Unauthorized';
                break;
            case 'storage/cancelled':
                progress.innerText = 'Cancelled';
                break;
            case 'storage/unknown':
                progress.innerText = 'Unknown Error';
                break
        }
    },
    function(){
        postsRef.snapshot.ref.getDownloadURL().then(function(url){
            document.getElementById('uploadModal').style.display = 'none'
            document.getElementById(jingle+'url').value = url
        })
    })
}