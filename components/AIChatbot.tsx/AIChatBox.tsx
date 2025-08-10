"use client";

import React, { useState, useEffect, useRef } from "react";
import { ImSpinner2 } from "react-icons/im";
import BeterLeaseLogoWhite from "../BeterLeaseLogo/BeterLeaseLogoWhite";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Stars } from "../Stars/Stars";
import ReactMarkdown from "react-markdown";

interface AIChatBotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

const AIChatBot: React.FC<AIChatBotProps> = ({ isOpen, setIsOpen }) => {
  const now = new Date();
  const currentHour = now.getHours();
  const binnenOpeningstijden = currentHour >= 8 && currentHour < 21;
  const [introPending, setIntroPending] = useState(false); // ⬅️ nieuw
  const [viewState, setViewState] = useState<"home" | "overview" | "chat">(
    "home"
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: "bot",
      text: `Hoi! Wat leuk dat je contact met ons opneemt.

Stel gerust je vraag. Je kunt ook mailen naar [info@reactly.nl](mailto:info@reactly.nl) of bellen naar [+31 (0)6 10 10 29 52](tel:+31610102952).

📅 We zijn bereikbaar op werkdagen tussen 08:00 en 21:00.

💬 Via de Chat en WhatsApp zijn we 24/7 beschikbaar!`,
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStartTime, setChatStartTime] = useState<string | null>(null);
  const [chatId, setChatId] = useState(uuidv4());
  const [language, setLanguage] = useState<"nl" | "en">("nl");
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatStartTime) {
      const now = new Date();
      const formatted = now.toLocaleString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setChatStartTime(formatted);
    }
  }, [isOpen, chatStartTime]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { from: "user", text: trimmed } as ChatMessage;
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({
              role: m.from === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: trimmed },
          ],
          language,
          chatId,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "Er ging iets mis." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, ik kon geen antwoord ophalen." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const startNewChat = () => {
    if (messages.length === 1) {
      setChatStartTime(
        new Date().toLocaleString("nl-NL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setChatId(uuidv4());
    }
    setViewState("chat");
  };

  useEffect(() => {
    // Alleen bij het openen van de chat en alleen als het echt de eerste bot-welkom is
    if (
      viewState === "chat" &&
      messages.length === 1 &&
      messages[0].from === "bot"
    ) {
      setIntroPending(true);
      setIsTyping(true); // laat de bestaande spinner zien
      const t = setTimeout(() => {
        setIntroPending(false);
        setIsTyping(false);
      }, 1000); // ~1 seconde

      return () => clearTimeout(t);
    }
  }, [viewState, messages]); // ⬅️ nieuw

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes wave {
          0% {
            transform: rotateZ(0deg) translate3d(0, 10%, 15px) rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg) translate3d(0, 10%, 15px) rotateZ(-360deg);
          }
        }
      `;
    document.head.appendChild(style);
  }, []);

  const renderHome = () => (
    // <div className="flex flex-col relative h-full w-full bg-gradient-to-b from-[#0f1c31] via-[#334155] to-[#5f6d9b] text-white">
    <div className="flex flex-col relative h-full w-full bg-gradient-to-b via-[#c2b293] from-[#111] to-[#000] dark:from-[#000]  dark:to-[#111] text-white">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Stars number={60} />
      </div>

      {/* Smoke Layers */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src="/images/smoke1.png"
          alt="smoke1"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_8s_linear_infinite] right-[-50%] top-[-10%] w-[2000px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke2.png"
          alt="smoke2"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_15s_linear_infinite] right-[-20%] top-[-45%] w-[2000px] max-w-none mix-blend-screen"
        />
        <Image
          src="/images/smoke3.png"
          alt="smoke3"
          width={10000}
          height={10000}
          className="absolute opacity-50 animate-[wave_10s_linear_infinite] right-[-15%] top-[-50%] w-[2000px] max-w-none mix-blend-screen"
        />
      </div>

      <div className="px-4 m-0.5 z-20 py-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <BeterLeaseLogoWhite />
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="hidden md:block"
            aria-label="Toggle size"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d={
                  isExpanded
                    ? "M13.59 5.31h-1.7l3.3-3.3-1.2-1.2-3.3 3.3v-1.7a.85.85 0 1 0-1.7 0v4.6h4.6a.85.85 0 1 0 0-1.7M1.57 9.84c0 .47.38.85.85.85h1.7l-3.3 3.3 1.2 1.2 3.3-3.3v1.7a.85.85 0 1 0 1.7 0v-4.6h-4.6a.85.85 0 0 0-.85.85"
                    : "M6.49 8.31L3.69 11.11V9.41a.72.72 0 0 0-1.7 0V14.01H6.59a.72.72 0 0 0 0-1.7H4.89l2.8-2.8L6.49 8.31zM9.41 1.99a.72.72 0 0 0 0 1.7h1.7L8.31 6.49l1.2 1.2 2.8-2.8v1.7a.72.72 0 1 0 1.7 0V1.99H9.41z"
                }
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="pt-5 space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold">Welkom 👋</h2>
          <h3 className="text-lg pb-10 font-medium">
            Hoe kunnen we je helpen?
          </h3>

          {/* A.I. */}
          <div className="hover:tracking-wider rounded-3xl hover:scale-105 hover:font-semibold transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#c2b293]">
            <div
              className="bg-white dark:shadow-inner  dark:bg-[#282828] dark:shadow-[#444444] text-black rounded-2xl p-4 shadow flex justify-between items-center cursor-pointer"
              onClick={() => setViewState("overview")}
            >
              <div>
                <div className="text-sm tracking-wide font-medium dark:text-white">
                  Start een chat
                </div>
                <div className="font-normal text-gray-500 dark:text-white/50 text-xs text-black/50 tracking-wide flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                  <div className="pt-[0.9px] text gray-500">
                    Chat met ons AI asisstant
                  </div>
                </div>
              </div>
              <div className="text-black text-xl dark:text-white">›</div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="hover:tracking-wider rounded-3xl hover:scale-105 hover:font-semibold transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#c2b293]">
            <div
              className="bg-white dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] text-black rounded-2xl p-4 shadow flex justify-between items-center cursor-pointer"
              onClick={() => setViewState("overview")}
            >
              <div>
                <div className="text-sm tracking-wide dark:text-white font-medium">
                  WhatsApp
                </div>
                <div className="font-normal text-gray-500 dark:text-white/50 text-xs text-black/50 tracking-wide flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                  <div className="pt-[0.9px] text gray-500">
                    Vaak binnen 5 minuten reactie
                  </div>
                </div>
              </div>
              <div className="text-black text-xl dark:text-white">›</div>
            </div>
          </div>

          {/* Bellen */}
          <div className="hover:tracking-wider rounded-3xl hover:scale-105 hover:font-semibold transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#c2b293]">
            <div
              className="bg-white dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] text-black rounded-2xl p-4 shadow flex justify-between items-center cursor-pointer"
              onClick={() => setViewState("overview")}
            >
              <div>
                <div className="text-sm tracking-wide font-medium dark:text-white">
                  Bellen
                </div>
                <div className="font-normal text-gray-500 dark:text-white/50 text-xs text-black/50 tracking-wide flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full inline-block ${
                      binnenOpeningstijden ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <div className="pt-[0.9px]">
                    {binnenOpeningstijden
                      ? "Bereikbaar van 08:00 t/m 19:00"
                      : "Momenteel gesloten"}
                  </div>
                </div>
              </div>
              <div className="text-black text-xl dark:text-white">›</div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Social Links verplaatst naar hier */}
      {/* <div className="flex flex-wrap justify-center gap-4 pt-4 pb-6">
        {[
          {
            href: "https://facebook.com",
            label: "Facebook",
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
              </svg>
            ),
          },
          {
            href: "https://linkedin.com",
            label: "LinkedIn",
            icon: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z"
                />
              </svg>
            ),
          },
          {
            href: "https://instagram.com",
            label: "Instagram",
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.227 0-2.59.006-3.626.052-.706.034-1.18.128-1.618.299a2.59 2.59 0 0 0-.972.633 2.601 2.601 0 0 0-.634.972c-.17.44-.265.913-.298 1.618C4.805 9.367 4.8 9.714 4.8 12c0 2.227.006 2.59.052 3.626.034.705.128 1.18.298 1.617.153.392.333.674.632.972.303.303.585.484.972.633.445.172.918.267 1.62.3.993.047 1.34.052 3.626.052 2.227 0 2.59-.006 3.626-.052.704-.034 1.178-.128 1.617-.298.39-.152.674-.333.972-.632.304-.303.485-.585.634-.972.171-.444.266-.918.299-1.62.047-.993.052-1.34.052-3.626 0-2.227-.006-2.59-.052-3.626-.034-.704-.128-1.18-.299-1.618a2.619 2.619 0 0 0-.633-.972 2.595 2.595 0 0 0-.972-.634c-.44-.17-.914-.265-1.618-.298-.993-.047-1.34-.052-3.626-.052Z" />
              </svg>
            ),
          },
          {
            href: "https://youtube.com",
            label: "YouTube",
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="m10 15 5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
              </svg>
            ),
          },
          {
            href: "#",
            label: "WhatsApp",
            icon: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.574 13.712a.894.894 0 0 1-.898-.898c0-.5.4-.899.898-.899.5 0 .898.4.898.899s-.399.898-.898.898Zm-4.426 0a.895.895 0 0 1-.898-.898c0-.5.4-.899.899-.899s.898.4.898.899-.4.898-.899.898Zm6.568 5.04C22.116 17.744 23 16.245 23 14.6c0-3.048-2.947-5.505-6.607-5.505S9.786 11.552 9.786 14.6c0 3.047 2.948 5.505 6.607 5.505a7.79 7.79 0 0 0 2.162-.295c.049-.025.122-.025.196-.025a.8.8 0 0 1 .344.099l1.45.835c.048.025.073.05.122.05a.22.22 0 0 0 .22-.22v-.002c0-.05-.024-.098-.024-.172 0-.025-.196-.688-.295-1.106-.024-.049-.024-.098-.024-.148a.347.347 0 0 1 .172-.368"></path>
                <path d="M11.52 8.516a1.019 1.019 0 0 1-1.027-1.026c0-.573.453-1.027 1.026-1.027s1.027.454 1.027 1.027-.454 1.026-1.027 1.026Zm-5.26 0A1.019 1.019 0 0 1 5.233 7.49c0-.573.454-1.027 1.027-1.027s1.026.454 1.026 1.027-.453 1.026-1.026 1.026ZM8.95 3C4.57 3 1 5.944 1 9.599c0 1.987 1.058 3.778 2.757 4.98a.556.556 0 0 1 .222.441c0 .05-.025.123-.025.172-.123.49-.345 1.3-.37 1.325-.024.073-.048.122-.048.196 0 .147.122.27.27.27.05 0 .099-.025.148-.05l1.748-1.005a.83.83 0 0 1 .418-.123c.074 0 .148 0 .222.025a9.99 9.99 0 0 0 2.584.368h.443a5.079 5.079 0 0 1-.27-1.62c0-3.311 3.25-6.01 7.237-6.01h.443C16.213 5.404 12.914 3 8.95 3Z"></path>
              </svg>
            ),
          },
        ].map(({ href, label, icon }, index) => (
          <a
            key={index}
            href={href}
            title={label}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full p-3 bg-white/10 backdrop-blur-md text-white"
          >
            <span className="sr-only">{label}</span>
            <div className="text-white group-hover:text-blue-300 transition-colors duration-300">
              {icon}
            </div>
          </a>
        ))}
      </div> */}

      {/* Footer Menu */}
      <div className="bg-white z-20 py-4 border-t border-gray-200 flex justify-around items-center">
        <button
          className={`flex flex-col items-center text-xs font-medium ${
            viewState === "home" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setViewState("home")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="mb-2"
          >
            <mask id="cfe0a" fill="none">
              <path
                fillRule="evenodd"
                d="M10.5 2.335 3 7.51c-.625.437-1 1.116-1 1.84V19.7C2 20.965 3.125 22 4.5 22h15c1.375 0 2.5-1.035 2.5-2.3V9.35c0-.724-.375-1.403-1-1.84l-7.5-5.175a2.69 2.69 0 0 0-3 0M7.316 14.366a.85.85 0 1 0-1.132 1.268A8.7 8.7 0 0 0 12 17.852a8.7 8.7 0 0 0 5.816-2.218.85.85 0 1 0-1.132-1.268A7 7 0 0 1 12 16.152c-1.8 0-3.44-.675-4.684-1.786"
                clipRule="evenodd"
              ></path>
            </mask>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M10.5 2.335 3 7.51c-.625.437-1 1.116-1 1.84V19.7C2 20.965 3.125 22 4.5 22h15c1.375 0 2.5-1.035 2.5-2.3V9.35c0-.724-.375-1.403-1-1.84l-7.5-5.175a2.69 2.69 0 0 0-3 0M7.316 14.366a.85.85 0 1 0-1.132 1.268A8.7 8.7 0 0 0 12 17.852a8.7 8.7 0 0 0 5.816-2.218.85.85 0 1 0-1.132-1.268A7 7 0 0 1 12 16.152c-1.8 0-3.44-.675-4.684-1.786"
              clipRule="evenodd"
            ></path>
            <path
              fill="currentColor"
              d="m3 7.51-.965-1.4-.01.007zm7.5-5.175L9.538.934l-.003.002zM21 7.51l.974-1.393-.009-.006zm-7.5-5.175.966-1.4-.004-.001zM6.116 14.434l1.268 1.132zm1.2-.068 1.133-1.268zm-1.132 1.268L5.05 16.902zm11.632 0 1.133 1.268zm.068-1.2-1.268 1.132zm-1.2-.068-1.133-1.268zM3.965 8.91l7.5-5.175L9.536.936l-7.5 5.175zm-.265.44c0-.12.063-.299.274-.447L2.026 6.117C.987 6.843.3 8.022.3 9.35zm0 10.35V9.35H.3V19.7zm.8.6a.9.9 0 0 1-.615-.227.5.5 0 0 1-.185-.373H.3c0 2.335 2.022 4 4.2 4zm15 0h-15v3.4h15zm.8-.6a.5.5 0 0 1-.185.373.9.9 0 0 1-.615.227v3.4c2.178 0 4.2-1.665 4.2-4zm0-10.35V19.7h3.4V9.35zm-.274-.447c.211.148.274.326.274.447h3.4c0-1.328-.687-2.507-1.726-3.233zm-7.491-5.169 7.5 5.175 1.93-2.798-7.5-5.175zm-1.073.002a.99.99 0 0 1 1.076 0L14.462.934a4.39 4.39 0 0 0-4.924 0zm-4.078 11.83a.85.85 0 0 1-1.2.068l2.265-2.536a2.55 2.55 0 0 0-3.6.203zm-.068-1.2c.35.313.38.85.068 1.2l-2.536-2.265a2.55 2.55 0 0 0 .203 3.6zM12 16.152c-1.8 0-3.44-.675-4.684-1.786l-2.265 2.536A10.4 10.4 0 0 0 12 19.552zm4.684-1.786A7 7 0 0 1 12 16.152v3.4c2.667 0 5.105-1.004 6.949-2.65zm-.068 1.2a.85.85 0 0 1 .068-1.2l2.265 2.536a2.55 2.55 0 0 0 .203-3.6zm1.2.068a.85.85 0 0 1-1.2-.068l2.536-2.265a2.55 2.55 0 0 0-3.6-.203zM12 17.852a8.7 8.7 0 0 0 5.816-2.218l-2.265-2.536A5.3 5.3 0 0 1 12 14.452zm-5.816-2.218A8.7 8.7 0 0 0 12 17.852v-3.4a5.3 5.3 0 0 1-3.551-1.354z"
              mask="url(#cfe0a)"
            ></path>
          </svg>
          Home
        </button>
        <button
          className={`flex flex-col items-center text-xs font-medium ${
            viewState === "overview" || viewState === "chat"
              ? "text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setViewState("overview")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="mb-2"
          >
            <mask id="74d5a" fill="#fff">
              <path
                fillRule="evenodd"
                d="M19 2a3 3 0 0 1 3 3v15.806c0 1.335-1.613 2.005-2.559 1.062L15.56 18H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z"
                clipRule="evenodd"
              ></path>
            </mask>
            <path
              fill="currentColor"
              d="m19.441 21.868 1.2-1.204zM15.56 18v-1.7h.702l.498.496zM20.3 5A1.3 1.3 0 0 0 19 3.7V.3A4.7 4.7 0 0 1 23.7 5zm0 8.956V5h3.4v8.956zm0 2.544v-2.544h3.4V16.5zm0 4.306V16.5h3.4v4.306zm.341-.142a.23.23 0 0 0-.218-.043.23.23 0 0 0-.123.185h3.4c0 2.848-3.441 4.277-5.459 2.267zm-3.882-3.868 3.882 3.868-2.4 2.409-3.882-3.869zM5 16.3h10.559v3.4H5zM3.7 15A1.3 1.3 0 0 0 5 16.3v3.4A4.7 4.7 0 0 1 .3 15zm0-10v10H.3V5zM5 3.7A1.3 1.3 0 0 0 3.7 5H.3A4.7 4.7 0 0 1 5 .3zm14 0H5V.3h14z"
              className="b360719bfill"
              mask="url(#74d5a)"
            ></path>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M17 7a.85.85 0 0 1 0 1.7H7A.85.85 0 1 1 7 7zm-5 4a.85.85 0 0 1 0 1.7H7A.85.85 0 0 1 7 11z"
              className="b360719bfill"
              clipRule="evenodd"
            ></path>
          </svg>
          Berichten
        </button>
      </div>
      {/* <Meteors number={20} /> */}
    </div>
  );

  const renderMessagesOverview = () => (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg text-black font-medium text-center">
          Berichten
        </h2>
      </div>
      <div
        className="flex items-center justify-between px-4 py-5 hover:bg-gray-100 cursor-pointer"
        onClick={startNewChat}
      >
        <div className="flex items-center space-x-3">
          <Image
            src="/favicon.ico"
            alt="bot"
            width={1000}
            height={1000}
            className="rounded-full h-10 w-10 object-cover"
          />
          <div>
            <div className="text-sm text-black font-medium">
              {messages.length > 1 ? "Hervat gesprek" : "Start een gesprek"}
            </div>
            <div className="text-xs text-gray-500">
              {messages.length > 1
                ? "Je kunt verder chatten"
                : "Wij staan klaar"}
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-xl">{">"}</div>
      </div>
      <div className="mt-auto p-5">
        <button
          onClick={startNewChat}
          className=" whitespace-nowrap hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out px-4 text-sm rounded-md flex justify-center mx-auto bg-[#0057FF]  shadow-inner shadow-[#0080ff] text-white py-2 font-medium hover:bg-blue-700"
        >
          {messages.length > 1 ? "Verder chatten" : "Stuur ons een bericht"}
        </button>
      </div>
      {/* Footer Menu */}
      <div className="bg-white py-4 border-t border-gray-200 flex justify-around items-center">
        <button
          className={`flex flex-col items-center text-xs font-medium ${
            viewState === "home" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setViewState("home")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="mb-2"
          >
            <mask id="cfe0a" fill="none">
              <path
                fillRule="evenodd"
                d="M10.5 2.335 3 7.51c-.625.437-1 1.116-1 1.84V19.7C2 20.965 3.125 22 4.5 22h15c1.375 0 2.5-1.035 2.5-2.3V9.35c0-.724-.375-1.403-1-1.84l-7.5-5.175a2.69 2.69 0 0 0-3 0M7.316 14.366a.85.85 0 1 0-1.132 1.268A8.7 8.7 0 0 0 12 17.852a8.7 8.7 0 0 0 5.816-2.218.85.85 0 1 0-1.132-1.268A7 7 0 0 1 12 16.152c-1.8 0-3.44-.675-4.684-1.786"
                clipRule="evenodd"
              ></path>
            </mask>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M10.5 2.335 3 7.51c-.625.437-1 1.116-1 1.84V19.7C2 20.965 3.125 22 4.5 22h15c1.375 0 2.5-1.035 2.5-2.3V9.35c0-.724-.375-1.403-1-1.84l-7.5-5.175a2.69 2.69 0 0 0-3 0M7.316 14.366a.85.85 0 1 0-1.132 1.268A8.7 8.7 0 0 0 12 17.852a8.7 8.7 0 0 0 5.816-2.218.85.85 0 1 0-1.132-1.268A7 7 0 0 1 12 16.152c-1.8 0-3.44-.675-4.684-1.786"
              clipRule="evenodd"
            ></path>
            <path
              fill="currentColor"
              d="m3 7.51-.965-1.4-.01.007zm7.5-5.175L9.538.934l-.003.002zM21 7.51l.974-1.393-.009-.006zm-7.5-5.175.966-1.4-.004-.001zM6.116 14.434l1.268 1.132zm1.2-.068 1.133-1.268zm-1.132 1.268L5.05 16.902zm11.632 0 1.133 1.268zm.068-1.2-1.268 1.132zm-1.2-.068-1.133-1.268zM3.965 8.91l7.5-5.175L9.536.936l-7.5 5.175zm-.265.44c0-.12.063-.299.274-.447L2.026 6.117C.987 6.843.3 8.022.3 9.35zm0 10.35V9.35H.3V19.7zm.8.6a.9.9 0 0 1-.615-.227.5.5 0 0 1-.185-.373H.3c0 2.335 2.022 4 4.2 4zm15 0h-15v3.4h15zm.8-.6a.5.5 0 0 1-.185.373.9.9 0 0 1-.615.227v3.4c2.178 0 4.2-1.665 4.2-4zm0-10.35V19.7h3.4V9.35zm-.274-.447c.211.148.274.326.274.447h3.4c0-1.328-.687-2.507-1.726-3.233zm-7.491-5.169 7.5 5.175 1.93-2.798-7.5-5.175zm-1.073.002a.99.99 0 0 1 1.076 0L14.462.934a4.39 4.39 0 0 0-4.924 0zm-4.078 11.83a.85.85 0 0 1-1.2.068l2.265-2.536a2.55 2.55 0 0 0-3.6.203zm-.068-1.2c.35.313.38.85.068 1.2l-2.536-2.265a2.55 2.55 0 0 0 .203 3.6zM12 16.152c-1.8 0-3.44-.675-4.684-1.786l-2.265 2.536A10.4 10.4 0 0 0 12 19.552zm4.684-1.786A7 7 0 0 1 12 16.152v3.4c2.667 0 5.105-1.004 6.949-2.65zm-.068 1.2a.85.85 0 0 1 .068-1.2l2.265 2.536a2.55 2.55 0 0 0 .203-3.6zm1.2.068a.85.85 0 0 1-1.2-.068l2.536-2.265a2.55 2.55 0 0 0-3.6-.203zM12 17.852a8.7 8.7 0 0 0 5.816-2.218l-2.265-2.536A5.3 5.3 0 0 1 12 14.452zm-5.816-2.218A8.7 8.7 0 0 0 12 17.852v-3.4a5.3 5.3 0 0 1-3.551-1.354z"
              mask="url(#cfe0a)"
            ></path>
          </svg>
          Home
        </button>
        <button
          className={`flex flex-col items-center text-xs font-medium ${
            viewState === "overview" || viewState === "chat"
              ? "text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setViewState("overview")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="mb-2"
          >
            <mask id="74d5a" fill="#fff">
              <path
                fillRule="evenodd"
                d="M19 2a3 3 0 0 1 3 3v15.806c0 1.335-1.613 2.005-2.559 1.062L15.56 18H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z"
                clipRule="evenodd"
              ></path>
            </mask>
            <path
              fill="currentColor"
              d="m19.441 21.868 1.2-1.204zM15.56 18v-1.7h.702l.498.496zM20.3 5A1.3 1.3 0 0 0 19 3.7V.3A4.7 4.7 0 0 1 23.7 5zm0 8.956V5h3.4v8.956zm0 2.544v-2.544h3.4V16.5zm0 4.306V16.5h3.4v4.306zm.341-.142a.23.23 0 0 0-.218-.043.23.23 0 0 0-.123.185h3.4c0 2.848-3.441 4.277-5.459 2.267zm-3.882-3.868 3.882 3.868-2.4 2.409-3.882-3.869zM5 16.3h10.559v3.4H5zM3.7 15A1.3 1.3 0 0 0 5 16.3v3.4A4.7 4.7 0 0 1 .3 15zm0-10v10H.3V5zM5 3.7A1.3 1.3 0 0 0 3.7 5H.3A4.7 4.7 0 0 1 5 .3zm14 0H5V.3h14z"
              className="b360719bfill"
              mask="url(#74d5a)"
            ></path>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M17 7a.85.85 0 0 1 0 1.7H7A.85.85 0 1 1 7 7zm-5 4a.85.85 0 0 1 0 1.7H7A.85.85 0 0 1 7 11z"
              className="b360719bfill"
              clipRule="evenodd"
            ></path>
          </svg>
          Berichten
        </button>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-neutral-900">
      <div className="bg-[#fff] shadow-sm dark:bg-black text-white py-4 px-4 flex justify-between items-center text-sm font-medium">
        <div className="flex gap-x-4 items-center">
          <button
            className="text-black dark:text-white"
            onClick={() => setViewState("overview")}
          >
            &lt;
          </button>
          <Image
            src="/favicon.ico"
            alt="bot"
            width={1000}
            height={1000}
            className="rounded-full h-10 w-10 object-cover"
          />
          <div>
            <div className="text-sm text-black dark:text-white">Reactly</div>
            <div className="font-normal dark:text-white/50 text-xs text-black/50 tracking-wide flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              <div className="pt-[0.9px]">Online</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="hidden md:block text-black dark:text-white"
          aria-label="Toggle size"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d={
                isExpanded
                  ? "M13.59 5.31h-1.7l3.3-3.3-1.2-1.2-3.3 3.3v-1.7a.85.85 0 1 0-1.7 0v4.6h4.6a.85.85 0 1 0 0-1.7M1.57 9.84c0 .47.38.85.85.85h1.7l-3.3 3.3 1.2 1.2 3.3-3.3v1.7a.85.85 0 1 0 1.7 0v-4.6h-4.6a.85.85 0 0 0-.85.85"
                  : "M6.49 8.31L3.69 11.11V9.41a.72.72 0 0 0-1.7 0V14.01H6.59a.72.72 0 0 0 0-1.7H4.89l2.8-2.8L6.49 8.31zM9.41 1.99a.72.72 0 0 0 0 1.7h1.7L8.31 6.49l1.2 1.2 2.8-2.8v1.7a.72.72 0 1 0 1.7 0V1.99H9.41z"
              }
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm flex flex-col">
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            {index === 0 && chatStartTime && (
              <div className="text-center text-[10px] text-gray-400">
                {chatStartTime}
              </div>
            )}
            {/* <div
            className={`rounded-xl px-4 py-2.5 max-w-[70%] whitespace-pre-line text-[13px] tracking-wide ${
              msg.from === "bot"
                ? "bg-white dark:bg-neutral-800 text-black dark:text-white self-start shadow"
                : "bg-[#c2b293] dark:bg-[#6a6a6a] text-white self-end shadow"
            }`}
          >
            {msg.text}
          </div> */}
            {!(introPending && index === 0 && msg.from === "bot") && (
              <div
                className={`rounded-xl px-4 py-2.5 max-w-[70%] text-[13px] tracking-wide whitespace-pre-line ${
                  msg.from === "bot"
                    ? "bg-white dark:bg-neutral-800 text-black dark:text-white self-start shadow"
                    : "bg-[#c2b293] dark:bg-[#6a6a6a] text-white self-end shadow"
                }`}
              >
                {msg.from === "bot" ? (
                  <ReactMarkdown
                    components={{
                      img: ({ src = "", alt }) => {
                        if (!src) return null;

                        return (
                          <Image
                            src={src}
                            alt={alt || "auto"}
                            width={800}
                            height={500}
                            className="rounded-lg mb-2 w-full h-auto object-cover shadow-md"
                          />
                        );
                      },
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 {...props} className="text-base font-bold mb-1" />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            )}
          </React.Fragment>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gray-500 self-start animate-pulse">
            <ImSpinner2 className="animate-spin" />
            {language === "en" ? "Typing..." : "Analyseren"}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 border-t dark:border-white/15 px-3 py-2 bg-white dark:bg-neutral-900 items-center">
        <input
          type="text"
          className="flex-1 bg-gray-100 dark:bg-neutral-800 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none dark:placeholder:text-neutral-500 placeholder:text-gray-400"
          placeholder={
            language === "en" ? "Type your message..." : "Typ je bericht..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="p-2 bg-[#c2b293] hover:bg-[#ab9f86] dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white rounded-full transition hover:scale-105"
          aria-label="Verstuur bericht"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path
              fill="currentColor"
              d="M7.4 1.899a.85.85 0 0 1 1.2 0l4.5 4.5a.85.85 0 0 1-1.2 1.2L8.85 4.55V13.5a.85.85 0 0 1-1.7 0V4.55L4.1 7.6a.85.85 0 1 1-1.2-1.2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ✅ Donkere achtergrond overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm transition-opacity duration-300" />
      )}

      {/* ✅ Chatvenster */}
      <div
        className={`fixed bottom-20 right-4 bg-white border border-black/10 dark:border-[#111]/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        } ${isExpanded ? "w-[600px] h-[800px]" : "w-[360px] h-[650px]"}`}
      >
        {viewState === "home" && renderHome()}
        {viewState === "overview" && renderMessagesOverview()}
        {viewState === "chat" && renderChat()}
      </div>
    </>
  );
};

export default AIChatBot;
