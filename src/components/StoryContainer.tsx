import { DynamicText } from "./DynamicText";
import { transformStoryEntry } from "./StoryProcessor";

export type StoryContainerProps = {
  story: string;
  displayCriteria: boolean;
  revealCriteria: boolean;
};
export const StoryContainer: React.FC<StoryContainerProps> = ({
  story,
  displayCriteria,
  revealCriteria,
}) => {
  return displayCriteria ? (
    <div className="storyContainer">
      {transformStoryEntry(story).map((_story) => (
        <p>
          {_story
            .map((entry) => {
              return <DynamicText storyEntry={entry} reveal={revealCriteria} />;
            })
            .reduce((a, b) => (
              <>
                {a}
                {b}
              </>
            ))}
        </p>
      ))}
    </div>
  ) : (
    <></>
  );
};
