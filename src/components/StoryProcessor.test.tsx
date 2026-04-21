import { transformStoryEntry } from "./StoryProcessor";
import testStory from "./storyprocessor.test.data";

describe("Story Processor", () => {
  it("does stuff", () => {
    expect(transformStoryEntry(testStory)).toEqual([
      [
        { text: `There’s nothing stop` },
        { text: `ping`, target: { x: 1, y: null, z: null } },
        { text: ` us from taking ` },
        { text: `to the`, requirement: "overrider" },
        { text: ` stars.` },
      ],
      [
        { text: `We can’t sto` },
        { text: `p ing`, target: { x: 1, y: 2, z: null } },
        { text: `enuity. We ` },
        { text: `can`, override: "forced" },
        { text: ` only ` },
        { text: `hope`, target: { x: 1, y: 2, z: 3 } },
        { text: ` to hold it at bay.` },
      ],
      [
        { text: `And we can ` },
        {
          text: `link`,
          target: { x: 1, y: null, z: null },
          action: "actionType",
        },
      ],
    ]);
    expect(true).toBeTruthy();
  });
});
