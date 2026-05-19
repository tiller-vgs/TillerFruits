import Button from "@mui/material/Button"
import { NavLink } from "react-router-dom"

function Footer() {
  return (
  <div className="flex flex-col items-center mt-auto justify-center p-5 min-w-full bg-transparent">
    <h1 className="text-xl font-bold">Tiller VGS</h1>
    <h2 className="text-lg">2026</h2>
    <p>Les terms of service!!</p>
    <NavLink to="/tos">
      <Button variant="text">TOS</Button>
    </NavLink>
  </div>
  )
}

export default Footer