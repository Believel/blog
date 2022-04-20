function User({resource}) {
  const user = resource.user.read()
  console.log('user:', user)
  return (
    <div className="border">
      <h3>User - 网络请求</h3>
      <p>{user.name.first}</p>
    </div>
  )
}

export default User