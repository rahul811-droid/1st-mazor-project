{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm =$('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost =newPostDom(data.data.post);
                    $('#posts-list-container>ul').prrpend(newPost);
                    deletePost($('delete-post-button',newPost));

                },error:function(error){
                    console.log(error.responseText);
                }

            })
        });


    }

    // method to create  a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id }">
        <p>
            
                <small>
    
                    <a class="delete-post-button" href="/posts/destroy/${post.id}">Delete</a>
                </small>
                
                ${ post.content }
                        <br>
                        <small>
                    ${ post.username%}
                        </small>
        </p>
        <div class="post-comments">
            
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comments"
                        required>
                    <input type="text" name="post" value="${post._id}">
                    <input type="submit " value="Add comments">
    
    
                </form>
                
    
                    <div class="post-comments-list">
                        <ul id="post-cpmments-${post._id}">
                            
                        </ul>
    
    
                    </div>
        </div>
    
    </li>`)
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`$post-${data.post_id}`).remove();
                },error:function(errData){
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();
}