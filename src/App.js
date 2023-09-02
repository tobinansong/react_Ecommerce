import {Routes, Route} from "react-router-dom"

import Home from "./routes/home/home.route.component";
import Navigation from "./routes/navigation/navigation.route.component";
import SignIn from "./routes/sign-in/sign-in.component.route";

const Shop = () => {
  return <h1>I am the shop page</h1>
}

const App = () => {
  return (
    <Routes>
       <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="sign-in" element={<SignIn />} />
       </Route>
  </Routes>
  )
}


export default App;
