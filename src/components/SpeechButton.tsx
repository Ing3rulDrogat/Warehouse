"use client";
import { useState } from "react";
import annyang from "annyang";

export default function VoiceButton() {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const sendToN8N = async (text: string) => {
    try {
      const res = await fetch("https://ing3rudrogat.app.n8n.cloud/webhook-test/speech-input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ speech: text }), // 👈 Send speech as JSON
      });

      const data = await res.json(); // 👈 Parse response
      setResponse(data.reply); // 👈 Show reply from N8N
    } catch (error) {
      console.error("Error talking to N8N:", error);
    }
  };

  const startListening = () => {
    if (annyang) {
      annyang.abort(); // Stop old sessions
      annyang.addCommands({
        "*speech": (speech: string) => {
          setTranscript(speech);
          sendToN8N(speech); // 👈 Send to N8N when received
        },
      });
      annyang.start();
    }
  };

  return (
    <div className="p-4">
      <button onClick={startListening} className="bg-blue-600 text-white px-4 py-2 rounded text-4xl">
        🎤 Start Listening
      </button>

      <p className="mt-2">
        <strong>You said:</strong> {transcript}
      </p>
      <div className=" w-1/2 h-1/2">
        <p className="mt-2 text-green-600 text-2xl">
          <strong>Artificial Intelligence reply:</strong> {response}
        </p>
      </div>
    </div>
  );
}
