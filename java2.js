document.getElementById("myform").addEventListener("submit",saveBookmark)
function saveBookmark(e)
{
  var siteName=document.getElementById("sitename").value;
  var urlName= document.getElementById("siteurl").value;
    if(!validateform(siteName,urlName))
        {
            return false;
        }
   
    var bookmark={name:siteName , url:urlName}


if( localStorage.getItem("bookmarks")==null)
    {
        var bookmarks=[] ;
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks" , JSON.stringify(bookmarks));   
    }
else{
      var bookmarks= JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks" , JSON.stringify(bookmarks)); 
        
    }
    document.getElementById("myform").reset();
    fetchBookmarks();
    e.preventDefault();
    
}

function deleteBookmark(url)
{
    var bookmarks= JSON.parse(localStorage.getItem("bookmarks"));
     for(var i=0; i<bookmarks.length; i++)
         {
           if(bookmarks[i].url==url) 
               {
                   bookmarks.splice(i,1);
                   
               }
         }
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks));
    fetchBookmarks();
}


function fetchBookmarks(url)
{
     var bookmarks= JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarksResults=document.getElementById("bookmarkerresult");
    
    bookmarksResults.innerHTML="";
    
    for(var i=0; i<bookmarks.length; i++)
      {
         var name= bookmarks[i].name;
         var url=bookmarks[i].url;
        
        bookmarksResults.innerHTML+= '<div class="well">'+
                                     '<h3>'+name+
                                     '<a class="btn btn-light ml-3 mr-1" target="blank" href="'+url+'">visit</a>'+
                                     '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" herf="#">Delete</a>'+
                                     '</h3>'+
                                     '</div>';   
      }
     
}
function validateform(siteName,urlName)
{
    if(!siteName || !urlName)
        {
            alert("please fill in the form");
            return false;
        }
    var expression= /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!urlName.match(regex))
        {
            alert("please use a valide url");
            return false;
        }
    return true;
}







$("#btn1").click(function(){
    $(".test").slideDown(1000,function(){
          $("h1").css("display","block")
    })
})

$(".item").click(function(){
    var x=$(this).attr("src");
    $("#mainImg").attr("src",x);
})



$(function(){
    var $orders=$("#orders");
    var $id=$("#id");
    var $first_name=$("#name");
    var $last_name=$("#name1");
    var $avatar=$("#avatar");
 $.ajax({
     type: 'GET',
     url:'https://reqres.in/api/users?page=2' ,
     success: function(orders){
     $.each(orders.data,function(i,value){
      $orders.append("<li> id:"+value.id+" , first name: "+value.first_name+" , last name: "+value.last_name+
                     " , avatar: "+value.avatar+"</li>")
     }) 
 },
    }) 
     $("#add-order").click(function(){
     var order={
     id: $id.val(),
     name: $first_name.val(),
     last: $last_name.val(),
     avatar: $avatar.val(),
 };
   $.ajax({
        type: 'POST',
        url:'https://reqres.in/api/users?page=2' ,
        data: order,
        success:function(newvalue){
     $orders.append("<li> id:"+newvalue.id+" , first name: "+newvalue.first_name+" , last name: "+newvalue.last_name+" , avatar: "+newvalue.avatar+"</li>")
                            }
            
 })
 })  
     
})
