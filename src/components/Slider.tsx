import { useGameContext } from "./GameContext";
import "./Slider.css";

export type SliderState = {
  val: number;
  targets: Array<number>;
  setVal: (val: number) => void;
  proximities: () => number;
  proximity: (index: number) => number;
};

export type SliderProps = {
  name: string;
  sliderState: SliderState;
  type?: "horizontal" | "vertical";
  labelPosition?: "pre" | "post";
  position?: "top" | "left" | "right";
  requiredItem: string;
};

export const Slider = ({
  name,
  sliderState,
  type = "horizontal",
  labelPosition = "pre",
  position = "top",
  requiredItem,
}: SliderProps) => {
  const collectedItems = useGameContext((state) => state.collectedItems);
  const proximity = sliderState.proximities();
  const closeness = proximity == 0 ? "match" : proximity < 10 ? "high" : "low";
  return (
    <div
      className={`sliderGroup ${type} ${position}`}
      style={{
        visibility: collectedItems.includes(requiredItem)
          ? "visible"
          : "hidden",
      }}
    >
      {labelPosition === "pre" && (
        <>
          <label htmlFor={name}>{name}</label>
          <br />
        </>
      )}
      <input
        name={name}
        type="range"
        min={1}
        max={100}
        value={sliderState.val}
        onChange={(e) => {
          sliderState.setVal(parseInt(e.target.value));
          e.stopPropagation();
        }}
        // className={`closeness ${closeness}`}
      />
      {labelPosition === "post" && (
        <>
          <br />
          <label htmlFor={name}>{name}</label>
        </>
      )}
    </div>
  );
};
