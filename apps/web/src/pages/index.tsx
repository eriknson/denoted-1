import { Card } from "../components/Card";

const draftData = [
  {
    id: 1,
    title: "some random titles",
    author: "0xBD5CEb146588230AAa5e9f70C2d867591BDea122",
    timestamp: 1677538898,
  },
  {
    id: 2,
    title: "some titles",
    author: "0xBD5CEb146588230AAa5e9f70C2d867591BDea122",
    timestamp: 1677534398,
  },
  {
    id: 3,
    title: "some ",
    author: "0x3731e4c9D191b5fEBFa1435686ffe2c6b5B25a29",
    timestamp: 1675495390,
  },
  {
    id: 4,
    title: "some random titles",
    author: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
    timestamp: 1675495390,
  },
  {
    id: 5,
    title: "some random titles",
    author: "0x3731e4c9D191b5fEBFa1435686ffe2c6b5B25a29",
    timestamp: 1677538898,
  },
  {
    id: 6,
    title: "some random titles",
    author: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
    timestamp: 1675495390,
  },
];

export default function Web() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {draftData.map((data) => (
        <Card
          key={data.id}
          id={data.id}
          title={data.title}
          timeStamp={data.timestamp}
          author={data.author}
        />
      ))}
    </div>
  );
}
