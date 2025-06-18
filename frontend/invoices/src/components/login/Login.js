
function Login(){
    return (
        <form action="#">
              <div class="mb-3 mt-3">
                <label for="username" class="form-label" >User name:</label>
                <input type="text" class="form-control" id="username" placeholder="Enter user name" name="username" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="Enter password" name="password" />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
        </form>
    )
}


export default Login