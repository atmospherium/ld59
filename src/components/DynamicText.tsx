import { useGameContext } from "./GameContext";
import { StoryEntry } from "./StoryProcessor";

export type DynamicParagraphProps = {
  storyEntry: StoryEntry;
  reveal: boolean;
};
export const DynamicText: React.FC<DynamicParagraphProps> = ({
  storyEntry,
  reveal,
}: DynamicParagraphProps) => {
  const collectedItems = useGameContext((state) => state.collectedItems);
  const addCollectedItem = useGameContext((state) => state.addCollectedItem);

  const checkpoints = useGameContext((state) => state.checkpoints);
  const addCheckpoint = useGameContext((state) => state.addCheckpoint);

  const xVal = useGameContext((state) => state.slider1.val);
  const yVal = useGameContext((state) => state.slider2.val);
  const zVal = useGameContext((state) => state.slider3.val);
  const minProximity = storyEntry.target
    ? Math.max(
        ...[
          storyEntry?.target?.x ? Math.abs(storyEntry.target.x - xVal) : 0,
          storyEntry?.target?.y ? Math.abs(storyEntry.target.y - yVal) : 0,
          storyEntry?.target?.z ? Math.abs(storyEntry.target.z - zVal) : 0,
        ],
      )
    : 100;

  const forceDisplay =
    (storyEntry.override && collectedItems.includes(storyEntry.override)) ||
    storyEntry.override == "*";
  const preventDisplay =
    storyEntry.requirement && !collectedItems.includes(storyEntry.requirement);

  const currentlyCollectible =
    (!!storyEntry.action &&
      !collectedItems.includes(storyEntry.action) &&
      minProximity <= 1) ||
    (!!storyEntry.checkpoint &&
      !checkpoints.includes(storyEntry.checkpoint) &&
      minProximity <= 1);

  return (
    <span
      style={{
        filter:
          !preventDisplay && (forceDisplay || reveal)
            ? ""
            : `blur(${Math.min(Math.pow((8 * (preventDisplay ? 100 : minProximity)) / 16, 2), 8)}px)`,
        color: reveal
          ? "#333333"
          : minProximity <= 1 && !preventDisplay && currentlyCollectible
            ? "green"
            : "gray",
        textDecoration: currentlyCollectible && !reveal ? "underline" : "none",
        cursor: currentlyCollectible && !reveal ? "pointer" : "default",
      }}
      onClick={() => {
        if (!currentlyCollectible) return null;
        if (reveal) return null;
        if (storyEntry.action) {
          addCollectedItem(storyEntry.action);
        }
        if (storyEntry.checkpoint) {
          addCheckpoint(storyEntry.checkpoint);
        }
      }}
    >
      {storyEntry.text}
    </span>
  );
};
