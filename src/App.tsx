import "./App.css";
import { Slider } from "./components/Slider";
import { useGameContext } from "./components/GameContext";
import { DynamicText } from "./components/DynamicText";
import { transformStoryEntry } from "./components/StoryProcessor";
import { StoryContainer } from "./components/StoryContainer";
import { story3 } from "./narrative/Story3.data";
import { story2 } from "./narrative/Story2.data";
import { story1 } from "./narrative/Story1.data";
import { story4 } from "./narrative/Story4.data";
import { maskOfAlthan } from "./narrative/MaskofAlthan.data";
import { story5 } from "./narrative/Story5.data";
import { mainStory } from "./narrative/Main.data";
import { quillOfTheCordant } from "./narrative/QuilloftheCordant.data";
import { scepterOfTheWarden } from "./narrative/ScepteroftheWarden.data";
import { end } from "./narrative/end.data";
import { story6 } from "./narrative/Story6.data";

export const App = () => {
  const collectedItems = useGameContext((state) => state.collectedItems);
  const checkpoints = useGameContext((state) => state.checkpoints);
  const slider1 = useGameContext((state) => state.slider1);
  const slider2 = useGameContext((state) => state.slider2);
  const slider3 = useGameContext((state) => state.slider3);

  return (
    <>
      <div style={{ position: "relative" }}>
        <Slider
          name="Communication Device"
          sliderState={slider1}
          requiredItem="Communication Device"
        />
        <Slider
          name="Ship Controls"
          sliderState={slider2}
          type="vertical"
          position="left"
          requiredItem="Ship Controls"
        />
        <Slider
          name="Cloaking Device"
          sliderState={slider3}
          type="vertical"
          labelPosition="post"
          position="right"
          requiredItem="Cloaking Device"
        />

        <StoryContainer
          story={end}
          displayCriteria={checkpoints.includes("Defeat the Warden")}
          revealCriteria={false}
        />

        <StoryContainer
          story={mainStory}
          displayCriteria={checkpoints.includes("Story1")}
          revealCriteria={checkpoints.includes("Defeat the Warden")}
        />

        <StoryContainer
          story={story6}
          displayCriteria={
            collectedItems.includes("Quill of the Cordant") &&
            collectedItems.includes("Scepter of the Warden") &&
            collectedItems.includes("Mask of Althan")
          }
          revealCriteria={collectedItems.includes("Unity of Purpose")}
        />

        {collectedItems.reverse().map((item) => {
          if (item === "Quill of the Cordant") {
            return (
              <StoryContainer
                story={quillOfTheCordant}
                displayCriteria={collectedItems.includes(
                  "Quill of the Cordant",
                )}
                revealCriteria={collectedItems.includes(
                  "Scepter of the Warden",
                )}
              />
            );
          }
          if (item === "Scepter of the Warden") {
            return (
              <StoryContainer
                story={scepterOfTheWarden}
                displayCriteria={collectedItems.includes(
                  "Scepter of the Warden",
                )}
                revealCriteria={collectedItems.includes("Mask of Althan")}
              />
            );
          }
          if (item === "Mask of Althan") {
            return (
              <StoryContainer
                story={maskOfAlthan}
                displayCriteria={collectedItems.includes("Mask of Althan")}
                revealCriteria={collectedItems.includes("Quill of the Cordant")}
              />
            );
          }
        })}

        <StoryContainer
          story={story4}
          displayCriteria={collectedItems.includes(
            "Prayer of Althan the Depraved",
          )}
          revealCriteria={
            collectedItems.includes("Quill of the Cordant") ||
            collectedItems.includes("Scepter of the Warden") ||
            collectedItems.includes("Mask of Althan")
          }
        />

        <StoryContainer
          story={story3}
          displayCriteria={collectedItems.includes("Anomalous Signal")}
          revealCriteria={collectedItems.includes(
            "Prayer of Althan the Depraved",
          )}
        />

        <StoryContainer
          story={story2}
          displayCriteria={
            checkpoints.includes("Story1") &&
            !collectedItems.includes("Anomalous Signal")
          }
          revealCriteria={collectedItems.includes("Anomalous Signal")}
        />

        <StoryContainer
          story={story1}
          displayCriteria={true}
          revealCriteria={checkpoints.includes("Story1")}
        />

        {collectedItems.length > 0 && (
          <div>
            <h3>Collected Items</h3>
            <p>
              {collectedItems.reduce(
                (a, b) => (a == "" ? b : `${a}, ${b}`),
                "",
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
