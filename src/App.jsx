import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [chatKey, setChatKey] = useState(0);

  function handleNewChat() {
    setChatKey((prev) => prev + 1);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              key={chatKey}
              onNewChat={handleNewChat}
            />
          }
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;