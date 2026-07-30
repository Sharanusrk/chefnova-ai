import Navbar from "../components/Navbar";
import ChatInput from "../components/ChatInput";
import Footer from "../components/Footer";

function Home({ onNewChat }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar onNewChat={onNewChat} />

      <main className="flex-1 flex items-center justify-center px-5">
        <div className="w-full max-w-4xl">
          <ChatInput />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;