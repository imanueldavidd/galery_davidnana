import { useState } from "react";
import Opening from "./components/opening/Opening";
import MusicPlayer from "./components/musicplayer/MusicPlayer";
import Letter from "./components/letter/Letter";
import Gallery from "./components/gallery/Gallery";
import Closing from "./components/closing/Closing";
import LivingSky from "./components/shared/LivingSky";
import useLogVisit from "./hooks/useLogVisit";

const STAGE = {
  OPENING: "opening",
  LETTER: "letter",
  GALLERY: "gallery",
  CLOSING: "closing",
};

function App() {
  const [stage, setStage] = useState(STAGE.OPENING);
  useLogVisit(stage !== STAGE.OPENING);

  return (
    <div className="relative min-h-[100dvh] w-full text-ink">
      <LivingSky />

      {stage === STAGE.OPENING && (
        <Opening onOpen={() => setStage(STAGE.LETTER)} recipientName="Van" />
      )}

      {stage !== STAGE.OPENING && <MusicPlayer autoPlay={true} />}

      {stage === STAGE.LETTER && <Letter onFinish={() => setStage(STAGE.GALLERY)} />}
      {stage === STAGE.GALLERY && <Gallery onFinish={() => setStage(STAGE.CLOSING)} />}
      {stage === STAGE.CLOSING && <Closing />}
    </div>
  );
}

export default App;