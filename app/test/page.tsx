import WorkCard from "@/components/workCard/WorkCard";
import reno from "@/public/renovation.jpg";
import beew from "@/public/new.jpg";
import ImgModal from "@/components/imgModal/ImgModal";
import test1 from "@/public/landing.jpg";
import test2 from "@/public/new.jpg";
import test3 from "@/public/renovation.jpg";
export default function Test() {
  const imgArr: string[] = [test1.src, test2.src, test3.src];
  const descArr: string[] = ["first img", "sec img", "third img"];
  return (
    <>
      <ImgModal imgArr={imgArr} descArr={descArr} />
    </>
  );
}
