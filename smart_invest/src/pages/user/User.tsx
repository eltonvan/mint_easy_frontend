import "./user.scss"
import Single from "../../components/single/Single"
import { singleUser } from "../../data"

export const User = () => {
  return (
    <div className="user">
      <Single {...singleUser}/>
    </div>
  )
}

export default User
