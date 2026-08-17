import {
  SectionEight,
  SectionFive,
  SectionFour,
  SectionNine,
  SectionOne,
  SectionSeven,
  SectionSix,
  SectionThree,
  SectionTwo,
} from "@/content/sections";

export default function Home() {
  return (
    <main className="page">
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
      <SectionEight />
      <SectionNine />
    </main>
  );
}
