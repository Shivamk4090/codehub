{
  let createPost = () => {
    let postForm = $("#postform");
    postForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/user/createPost",
        data: postForm.serialize(),
        success: function (response) {
          let dom = domPost(response);
          $("#post-List > ul").prepend(dom);
          deletePost(" .dltPost", dom);
        },
        error: (err) => {
          console.log("error", err.responseText);
        },
      });
    });
  };
  let domPost = (data) => {
    return `

          

            <li id=${data.post._id} class="list-group-item"   >  
         
                <a class="dltPost" href="/post/destroy/${
                  data.post._id
                }" ><img  src="https://img.icons8.com/flat-round/25/000000/delete-sign.png"/></a>
          
                ${data.post.content}

                <br><small> ..... ${data.user.name}  </small> <br>  
                <div class="comment">
                <form action="/user/comment" method="post" class="form-inline">
                    <input type="text" name="comment" id="" class="form-control" required>
                    <input type="hidden" name="postId" value= ${data.post.id} >
                    <input type="submit" value="comment" class="btn">
                </form>
                <div class="post-comments" >
                    <ul >
                    
                        ${"commentLater"}
                       
                    </ul>
                </div>
                </div>            
                <br>
            </li>

        `;
  };
  let deletePost = (dltbtn) => {
    $(dltbtn).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(dltbtn).prop("href"),
        success: function (response) {
          $(`#${response}`).remove();
        },
      });
    });
  };

  createPost();
}

// x.id
// x.user.name
// include("commentList")
