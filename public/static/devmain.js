var cook = Cookies("csrftoken");function more(page){var mainContainer = document.getElementById("mainContainer");
var more = document.getElementById("showMore");var ajax = new XMLHttpRequest();ajax.open("GET","/?page="+page);ajax.responseType = "document"
ajax.send();ajax.addEventListener("load",function(load){more.remove();mainContainer.innerHTML += ajax.responseXML.body.innerHTML})
ajax.addEventListener("error",function(error){console.log(error);})}
function searchFunc(event,order) {
    var searchInput = document.getElementById("searchInput")
    var change = document.getElementById("change")
    var page = document.getElementById("page")
    var ajax = new XMLHttpRequest()
    var searchBody = document.getElementById("searchBody")
    var search = document.getElementById("currentSearch")
    var more = document.getElementById("more")
    if(page){        
        if(page.innerText){
            ajax.open("POST","/search"+page.innerText)
            ajax.responseType = "document"
            ajax.send(`searchdashowMore=${search.innerText}&sortdata=${order}`)
            ajax.addEventListenshowMore("load",function(){
                more.remove()
                searchBody.innerHTML += ajax.responseXML.body.innerHTML
            }) 
        }
    }
    if(order && order.includes("st")){
        ajax.open("POST","/search")
        ajax.responseType = "document"
        ajax.send(`searchdata=${search.innerText}&sortdata=${order}`)
        ajax.addEventListener("load",function(){
            searchBody.innerHTML = ajax.responseXML.body.innerHTML
        })
    }else{
        if(event.keyCode >= 65 && event.keyCode <=90 || event.keyCode === 8){  
            ajax.open("POST","/search")
            ajax.setRequestHeader("Requested-for","Name")
            ajax.responseType = "document"
            ajax.send(`searchdata=${searchInput.value}`)
            ajax.addEventListener("load",function(){
                change.innerHTML = ajax.responseXML.body.innerHTML
            })
        }else if(event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode===189 || event.keyCode===8){
            change.innerHTML = '<h6 class="container text-secondary"><b>Use the format: 1996-10-10</b></h6>'    
            if(search.value.length <= 10){
                ajax.open("POST","/search")
                ajax.setRequestHeader("Requested-for","Date")
                ajax.responseType = "document"
                ajax.send(`searchdata=${search.value}`)
                ajax.addEventListener("load",function(){
                    change.innerHTML = ajax.responseXML.body.innerHTML
                })
            }
        }
    }
}

function nextFunc(id,...args){
    var pic = document.getElementById(id)
    if(args.indexOf(pic.attributes.src.value) !== (args.length-1)){
        var image = args[args.indexOf(pic.attributes.src.value)+1]
    }else{
        var image = args[0]
    }
    
    if(image.endsWith("jpg")||image.endsWith("jpeg")||image.endsWith("png")||image.endsWith("JPG")||image.endsWith("PNG")
    || image.endsWith("PNG")|| image.endsWith("JPEG")){
        if(pic.nodeName === "VIDEO" || pic.nodeName === "AUDIO"){
            var img = document.createElement("img")
            img.setAttribute("id", id)
            img.setAttribute("class","card-img-top img-thumbnail")
            img.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])
            pic.replaceWith(img)
            
        }else{
            pic.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])
        }
    }else if(image.endsWith("mp4")|| image.endsWith("avi")||image.endsWith("mkv")){
        if(pic.nodeName === "IMG"|| pic.nodeName === "AUDIO"){
            var video = document.createElement("video")
            video.setAttribute("id",id)
            video.setAttribute("class","card-img-top img-thumbnail")
            video.controls = true
            video.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])
            pic.replaceWith(video)
            
        }else{
            pic.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])
        }
    }else if(image.endsWith("mp3")|| image.endsWith("m4a")){
        if(pic.nodeName === "IMG"||pic.nodeName === "VIDEO"){
            var audio = document.createElement("audio")
            audio.setAttribute("id",id)
            audio.setAttribute("class", "card-img-top img-thumbnail")
            audio.controls = true
            audio.setAttribute("style", "height:200px")
            audio.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])
            pic.replaceWith(audio)
        }else{
            pic.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])  
        }
    }
   
}
function prevFunc(id,...args){
    var pic = document.getElementById(id)
    if(args.indexOf(pic.attributes.src.value) !== (args.length-1)){
        var image = args[args.indexOf(pic.attributes.src.value)+1]
    }else{
        var image = args[0]
    }
    if(image.endsWith("jpg")||image.endsWith("jpeg")||image.endsWith("png")||image.endsWith("JPG")||image.endsWith("PNG")
    || image.endsWith("PNG")|| image.endsWith("JPEG")){
        if(pic.nodeName === "VIDEO" || pic.nodeName === "AUDIO"){
            var img = document.createElement("img")
            img.setAttribute("id", id)
            img.setAttribute("class","card-img-top img-thumbnail")
            img.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])
            pic.replaceWith(img)
            
        }else{
            pic.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])
        }
    }else if(image.endsWith("mp4")|| image.endsWith("avi")||image.endsWith("mkv")){
        if(pic.nodeName === "IMG"|| pic.nodeName === "AUDIO"){
            var video = document.createElement("video")
            video.setAttribute("id",id)
            video.setAttribute("class","card-img-top img-thumbnail")
            video.controls = true
            video.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])
            pic.replaceWith(video)
            
        }else{
            pic.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])
        }
    }else if(image.endsWith("mp3")|| image.endsWith("m4a")){
        if(pic.nodeName === "IMG"||pic.nodeName === "VIDEO"){
            var audio = document.createElement("audio")
            audio.setAttribute("id",id)
            audio.setAttribute("class", "card-img-top img-thumbnail")
            audio.controls = true
            audio.setAttribute("style", "height:200px")
            audio.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])
            pic.replaceWith(audio)
        }else{
            pic.setAttribute("src",args.indexOf(pic.attributes.src.value) !== (args.length-1)?
            args[args.indexOf(pic.attributes.src.value) +1]:args[0])  
        }
    }
}
function check(){
    var confirmpassword = document.getElementById("confirmPassword")
    var password = document.getElementById("password")
    var passinfo = document.getElementById("passinfo")
    if(confirmpassword.value !== password.value){
        passinfo.style.display = "block"
        confirmpassword.focus()
        confirmpassword.style.borderColor = "red"
    }else{
        passinfo.style.display = "none"
        confirmpassword.style.borderColor = "white"
    }     
}
function userMenu(){
    var menu = document.getElementById("userMenu")
    menu.style.display === "block"?menu.style.display = "none":menu.style.display = "block"
}

function followed(event){
    event.preventDefault()
    var form = document.createElement("form")
    var follow = document.getElementById("follow")
    var hide = document.createElement("input")
    var submitt  = document.createElement("input")
    var followForm = document.getElementById("followForm")
    var stats = document.getElementById("userStats")
    var ajax = new XMLHttpRequest
    ajax.open("POST", "/follow")
    ajax.send(`user=${follow.value}`)
    ajax.addEventListener("load",function(){
        form.method = "POST"
        form.setAttribute("onsubmit","unFollow(event)")
        hide.type = "hidden"
        hide.id = "unfollow"
        hide.value = follow.value
        form.id="unFollowForm"                            
        hide.name = "user"
        submitt.type = "submit"
        submitt.value = "Unfollow"
        submitt.setAttribute("class", "btn btn-primary")
        form.appendChild(hide)
        form.appendChild(submitt)
        followForm.replaceWith(form)
        stats.innerText = ajax.response
        
    })
}
function unFollow(event){
    event.preventDefault()
    var form = document.createElement("form")
    var unfollow = document.getElementById("unfollow")
    var hide = document.createElement("input")
    var submitt  = document.createElement("input")
    var followForm = document.getElementById("unFollowForm")
    var stats = document.getElementById("userStats")
    var ajax = new XMLHttpRequest
    ajax.open("POST", "/unfollow")
    ajax.send(`user=${unfollow.value}`)
    ajax.addEventListener("load",function(){
        form.method = "POST"
        form.setAttribute("onsubmit","follow(event)")
        hide.type = "hidden"
        hide.value = unfollow.value
        form.id="follow"                                                                
        hide.name = "user"
        submitt.type = "submit"
        submitt.value = "Follow"
        submitt.setAttribute("class", "btn btn-primary")
        form.appendChild(hide)
        form.appendChild(submitt)
        followForm.replaceWith(form)
        stats.innerText = ajax.response
    })
}
function moreJingle(event){
    var form = document.getElementById("form")
    var btn = document.getElementById("moreSample")
    var btn2 = document.getElementById("moreSample2")
    if(btn){
        btn.display = "block"
    }
    if(btn2){
        btn.display = "block"
    }    
}

function commentFunc(event,url,first,second,id){
    event.preventDefault()
    var post = document.getElementById(first)
    var comment = document.getElementById(second)
    var main = document.getElementById("main"+id)
    var ajax = new XMLHttpRequest()
    ajax.open("POST",url)
    ajax.responseType = "document"
    if(url === "/comment"){
        ajax.send(`comment=${comment.value}&post=${post.value}`)  
        ajax.addEventListener("load", function(){
        main.innerHTML += ajax.responseXML.body.innerHTML    
    })
    }else if(url=== "/replycomment"){
        ajax.send(`comment=${post.value}&reply=${comment.value}`)
        ajax.addEventListener("load",function(){
            var body = document.getElementById("body")
            body.innerHTML += ajax.responseXML.body.innerHTML
        })
    }
}

function rest(){
    if(window.innerHeight <= 517){
        var res = document.getElementById("res")
        var ins = document.getElementById("ins")
        res.style.width = "100%"
        ins.replaceWith(res)
    }
}

function showMenu(why,id){
    var menu = document.getElementById(id)
    if(why === "open"){
        menu.style.display = "block"
    }else{
        menu.style.display = "none"
    }
}

function displaySearch(){
    var menuPointer = document.getElementById("menuPointer")
    var searchForm = document.getElementById("searchForm")
    var login = document.getElementById("loginBotton")
    var navArrow = document.getElementById("navbarArrow")
    var profilePic = document.getElementById("profilePic")
    if(navArrow.innerText.includes("<")){
        searchForm.style.display = "block"
        menuPointer.style.animationName = "searchOut"
        menuPointer.style.animationDuration = "2s"
        menuPointer.style.left = "10%"
        login.style.display = "none"
        navArrow.innerText = '>'
    }else{
        menuPointer.style.animationName = "searchIn"
        menuPointer.style.animationDuration = "1s"
        menuPointer.style.left = "36%"
        login.style.display = "block"
        navArrow.innerText = '<'
        menuPointer.style.paddingLeft = "10px"
        searchForm.style.display = "none"
    }
}

function ajaxFunc(id,user, type){
    var ajax = new XMLHttpRequest()
    if(type === "report"){
        var report = document.getElementById("report"+id)
        ajax.open("POST", "/report")
        ajax.send(`user=${user}&post=${id}`)
        ajax.addEventListener("load",function(){
            report.innerText = ajax.response
        })
    }else if(type === "notification"){
        document.querySelector("#notificationTray").style.display = "block"
        ajax.open("POST","/notification")
        ajax.send("user="+user)
    }else if(type==="closeNotification"){
        document.querySelector("#notificationTray").style.display = "none"
    }else if(type==="cart"){
        var cart = document.getElementById("cart")
        ajax.open("POST","/cart")
        ajax.send(`post=${id}&user=${user}`)
        ajax.addEventListener("load",function(){
            var add = document.getElementById("a"+id)
            var anchor = document.createElement("a")
            var nocart = document.getElementById("nocart")
            if(nocart){
                anchor.className = "badge btn badge-pill" 
                anchor.style.marginTop = "10px"
                anchor.style.fontSize = "20px"
                anchor.href = "/cart/"+ajax.response.substring(ajax.response.search(",")+1,ajax.response.length)
                anchor.innerText = "Cart"
                nocart.replaceWith(anchor)
            }
            add.remove()
            cart.innerText = ajax.response.substring(0,ajax.response.search(","))
        })
    }else if(type==="removefromcart"){
        ajax.open("POST","/cart/remove")
        ajax.send(`cart=${id}&itemId=${user[1]}&itemJingle=${user[0]}&itemName=${user[2]}&itemCurrency=${user[3]}&itemPrice=${user[4]}&id=${user[5]}`)
        ajax.addEventListener("load",function(){
            if(ajax.response === "Deleted"){
                document.location = "/"
            }else{
                document.querySelector("#item"+user[1]).remove()
            }            
        })
    }
}

function changeSearch(item){
    var names = document.getElementById("names"),
        description = document.getElementById("descriptions"),
        dates = document.getElementById("dates"),
        locations = document.getElementById("locations"),
        nameMenu = document.getElementById("menuNames"),
        descriptionMenu = document.getElementById("menuVenues"),
        locationMenu = document.getElementById("menuLocations"),
        dateMenu = document.getElementById("menuDates"),
        main = document.getElementById("main")
    
    if(item == "names"){
        nameMenu.style.backgroundColor = "#007bff"
        descriptionMenu.style.backgroundColor = "#fff"
        locationMenu.style.backgroundColor = "#fff"
        dateMenu.style.backgroundColor = "#fff"
        main.innerHTML = names.innerHTML
        description.style.display = "none"
        dates.style.display = "none"
        locations.style.display = "none"
    }else if(item === "descriptions"){
        descriptionMenu.style.backgroundColor = "#007bff"
        nameMenu.style.backgroundColor = "#fff"
        locationMenu.style.backgroundColor = "#fff"
        dateMenu.style.backgroundColor = "#fff"
        main.innerHTML = descriptions.innerHTML
        description.style.display = "block"
        dates.style.display = "none"
        locations.style.display = "none"
    }else if(item === "dates"){
        dateMenu.style.backgroundColor = "#007bff"
        descriptionMenu.style.backgroundColor = "#fff"
        locationMenu.style.backgroundColor = "#fff"
        nameMenu.style.backgroundColor = "#fff"
        main.innerHTML = dates.innerHTML
        description.style.display = "none"
        dates.style.display = "block"
        locations.style.display = "none"
    }else if(item === "locations"){
        locationMenu.style.backgroundColor = "#007bff"
        descriptionMenu.style.backgroundColor = "#fff"
        nameMenu.style.backgroundColor = "#fff"
        dateMenu.style.backgroundColor = "#fff"
        main.innerHTML = locations.innerHTML
        description.style.display = "none"
        dates.style.display = "none"
        locations.display = "block"
    }else{
        names.style.display = "none"
        description.style.display = "none"
        dates.style.display = "none"
        locations.style.display = "none"
    }
}
window.onclick = function (){
    document.querySelector("#change").innerText = ""
}
if(document.location.pathname.startsWith("/search")){
    window.addEventListener("scroll",()=>{
        if(window.scrollY+window.innerHeight == document.body.scrollHeight){
            var search = document.getElementById("searchInput")
            var change = document.getElementById("change")
            var page = document.getElementById("page")
            var ajax = new XMLHttpRequest()
            var searchBody = document.getElementById("searchBody")
            var search = document.getElementById("currentSearch")
            if(page.innerText){
                ajax.open("POST","/search"+page.innerText)
                ajax.responseType = "document"
                ajax.send(`searchdata=${search.innerText}&sortdata=${order}`)
                ajax.addEventListener("load",function(){
                    searchBody.innerHTML += ajax.responseXML.body.innerHTML
                }) 
            }
        }
    })
}