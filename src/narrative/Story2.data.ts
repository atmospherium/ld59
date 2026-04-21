export const story2 = `
{{The coast is clear. You can bring your cloak down.[[x,x,100]]}}.
{{At least for now[[x,x,80]]}}.
{{You're on a treacherous route. I don't know how or why you got to where you are.[[x,x,10]]}}
{{While your cloak is all the way down, try sweeping the antennae of your Communication Device. And see what you can find.[[x,x,1]]}}
${Array(100)
  .fill(0)
  .map(
    (val, index) =>
      `{{${index > 31 && index < 35 ? "!" : "."}[[${index + 1},x,1]]${index > 31 && index < 35 && "<<Anomalous Signal>>"}}}`,
  )
  .reduce((a, b) => `${a}${b}`, "")}
`;
