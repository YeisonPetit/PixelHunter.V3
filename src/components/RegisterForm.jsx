import { useState } from "react"
import { SUPABASE_CONFIG } from '..//utils/constants'

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleRegister = async (event) => {
    event.preventDefault()
    setLoading(true)

    const { error } = await SUPABASE_CONFIG.auth.signUp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert("Check your email for the login link!")
    }

    setLoading(false)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <form className="form-widget" onSubmit={handleRegister}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className="button block" disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
