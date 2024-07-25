import Blogs from "../Components/Blogs/Blogs";
import Carousel from "../Components/Carousel/Carousel";
import Faculties from "../Components/Programs/Programs";
import Marq from "../Components/Marque/Marque";
import McutMap from "../Components/McutMap/McutMap";
import Memorandum from "../Components/Memorandum/Memorandum";
import NewsAndUpdates from "../Components/NewsAndUpdates/NewsAndUpdates";
import ViceChanclor from "../Components/ViceChanclor/ViceChanclor";
import { Suspense } from "react";
export default function Home() {
  return (
    <div className="w-full">
<Carousel />
<Suspense>
<Marq />
</Suspense>
<br />
<ViceChanclor />
<br />
<Suspense>
<NewsAndUpdates />
</Suspense>
<br />
<Suspense>
<Faculties />
</Suspense>
<br />
<Blogs />
<br />
<Memorandum />
<br />
<Suspense>
<McutMap />
</Suspense>
    </div>
  );
}
