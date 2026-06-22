import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [currentView, setCurrentView] = useState("terminal");
  const [viewData, setViewData] = useState([]);
  const [history, setHistory] = useState([
    { type: "success", text: "Welcome to DadOS v4.2.0" },
    { type: "output", text: "System initialized. Marine theme active." },
    { type: "output", text: "Type 'help' to see available commands." }
  ]);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll terminal to the bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  // Focus input when the card finishes opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 1200); // Wait for CSS transition
    }
  }, [isOpen]);

  // --- CUSTOMIZE COMMANDS HERE ---
  const commands = {
    help: [
      { type: "output", text: "Available commands:" },
      { type: "output", text: "  about        - View dad's profile" },
      { type: "output", text: "  birthday     - Compile the birthday message" },
      { type: "output", text: "  achievements - List unlocked milestones" },
      { type: "output", text: "  coffee       - Check caffeine levels" },
      { type: "output", text: "  love         - Run affection calculation" },
      { type: "output", text: "  boat         - Deploy the vessel" },
      { type: "output", text: "  clear        - Clear the terminal screen" }
    ],
    about: [
      { type: "output", text: "Dad profile loaded..." },
      { type: "output", text: "Name: Tomasz" },
      { type: "output", text: "Role: Dad, coder, problem solver, legend." },
      { type: "output", text: "Special skills: fixing bugs, giving advice, building cool things." }
    ],
    birthday: [
      { type: "output", text: "Compiling birthday message..." },
      { type: "success", text: "Build successful ✅" },
      { type: "output", text: "Happy Birthday Dad! Thank you for everything you do for us." }
    ],
    achievements: [
      { type: "output", text: "Achievements unlocked:" },
      { type: "success", text: "[x] Completed PhD" },
      { type: "success", text: "[x] Built amazing projects" },
      { type: "success", text: "[x] Raised an awesome family" },
      { type: "success", text: "[x] Survived countless production bugs" },
      { type: "success", text: "[x] Unlocked 'Marine Expert' badge" }
    ],
    coffee: [
      { type: "output", text: "Checking sensor data..." },
      { type: "success", text: "Coffee level: 99%" },
      { type: "error", text: "Warning: Dad productivity is now unstoppable." }
    ],
    love: [
      { type: "output", text: "Calculating love..." },
      { type: "output", text: "[██████████████████████████████] 100%" },
      { type: "error", text: "Error: Stack overflow ❤️" },
      { type: "output", text: "Love variable exceeds maximum integer size." }
    ],
    boat: [
      { type: "output", text: "Deploying Dad's Ocean Cruiser..." },
      {
        type: "ascii", text: `
      |    |    |
     )_)  )_)  )_)
    )___))___))___)\\
   )____)____)_____)\\\\
 _____|____|____|____\\\\\\__
 \\    Dad's Ocean Cruiser /
  \\ -------------------- /
~~~~~~~~~~~~~~~~~~~~~~~~~~~` }
    ]
  };

  function runCommand(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim().toLowerCase();

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (commands[command]) {
      setViewData(commands[command]);
      setCurrentView("output");
    } else {
      setViewData([
        { type: "error", text: `Command not found: ${command}` },
        { type: "output", text: "Type 'help' to see available commands." }
      ]);
      setCurrentView("output");
    }

    setInput("");
  }

  return (
    <>
      <div className="ocean-bg"></div>

      {/* Mobile rotation hint - managed by CSS media queries */}
      <div className="rotation-hint">
        📱 For the best experience, please use landscape mode or desktop.
      </div>

      <div className="scene-wrapper">
        <div className="scene">
          <div className={`card-container ${isOpen ? "open" : ""}`}>

            {/* Right side of the card (Inside Right) - The Terminal */}
            <div className="card-page inside-right">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <div className="terminal-title">bash - DadOS</div>
              </div>

              {currentView === "terminal" ? (
                <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
                  {history.map((line, index) => (
                    <div key={index} className={`terminal-line ${line.type}`}>
                      {line.text}
                    </div>
                  ))}

                  {isOpen && (
                    <form className="terminal-form" onSubmit={runCommand}>
                      <span className="prompt">root@dados:~$</span>
                      <input
                        ref={inputRef}
                        className="terminal-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        spellCheck="false"
                        autoComplete="off"
                      />
                    </form>
                  )}
                  <div ref={terminalEndRef} />
                </div>
              ) : (
                <div className="terminal-body output-view">
                  <button className="back-button" onClick={() => setCurrentView("terminal")}>
                    ← Back to Terminal
                  </button>
                  <div className="output-content">
                    {viewData.map((line, index) => (
                      <div key={index} className={`terminal-line ${line.type}`}>
                        {line.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Left flap of the card (Cover and Inside Left) */}
            <div className="card-page front-flap" onClick={() => !isOpen && setIsOpen(true)}>

              {/* The front cover */}
              <div className="face front-cover">
                {/* Minimalist SVG Sailboat Graphic */}
                <svg className="marine-graphic" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48 10L48 60M48 15L20 50L48 55M52 15L80 50L52 55" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 65L85 65L75 80L25 80L15 65Z" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 90Q25 80 50 90T90 90" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
                  <path d="M10 95Q25 85 50 95T90 95" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </svg>

                <h1>Happy Birthday<br />Dad</h1>
                <p>System Boot Sequence Initiated</p>
                {!isOpen && <div className="click-hint">Click to Open</div>}
              </div>

              {/* The inside left page */}
              <div className="face inside-left">
                <div className="message-content">
                  {/* --- CUSTOMIZE MESSAGE HERE --- */}
                  <h2>Happy Birthday! 🎂</h2>
                  <p>
                    I wanted to build something special for you this year. Something that combines your love for technology, coding, and the sea.
                  </p>
                  <p>
                    Thank you for being the ultimate problem solver in our lives. Whether it's a bug in code or a bug in life, you always know how to fix it.
                  </p>
                  <p>
                    I hope you enjoy exploring the DadOS terminal!
                  </p>
                  <div className="signature">
                    With love,<br />
                    Your favorite eldest daughter
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;