export type StoryTarget =
  | {
      x?: number | null;
      y?: number | null;
      z?: number | null;
    }
  | undefined;

export type StoryEntry = {
  text: string;
  target?: StoryTarget;
  action?: string;
  requirement?: string;
  override?: string;
  checkpoint?: string;
};

export type StoryParagraph = Array<StoryEntry>;

export type StorySchema = Array<StoryParagraph>;

export const transformStoryEntry = (story: string): StorySchema => {
  const splitBy = new RegExp(/(\{\{[^}]*\}\})/);
  return story
    .split(/\r?\n/)
    .filter((entry) => entry.length > 0)
    .map((_entry) => {
      const entries = _entry.split(splitBy);
      return entries
        .filter((entry) => entry !== "")
        .map((entry): StoryEntry => {
          if (entry.indexOf("{") == -1) return { text: entry };
          const text = entry.match(/{{([^<[]*).*}}/)?.[1] ?? "";

          const proximityVal = entry.match(/\[\[(.*)\]\]/)?.[1];
          const proximityList =
            proximityVal
              ?.split(",", 3)
              .map((val) => (val == "x" ? null : parseInt(val))) ?? undefined;
          const target: StoryTarget = proximityList && {
            x: proximityList[0],
            y: proximityList[1],
            z: proximityList[2],
          };

          const action = entry.match(/\<\<(.*)\>\>/)?.[1] ?? undefined;
          const checkpoint = entry.match(/\<\$*(.*)\$\>/)?.[1] ?? undefined;

          const requirement = entry.match(/\<\!(.*)\!\>/)?.[1] ?? undefined;
          const override = entry.match(/\[\!(.*)\!\]/)?.[1] ?? undefined;

          return Object.assign(
            {},
            {
              text,
            },
            target && { target },
            action && { action },
            checkpoint && { checkpoint },
            requirement && { requirement },
            override && { override },
          );
        });
    });
};
