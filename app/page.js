import NotesBranchWise from "./components/NotesBranchWise";
import TestimonialCarousel from "./testimonials/page";
import ShareNotes from "./components/ShareNotes";
import Contact from "./components/Contact";
import Hero from "./components/hero";
import About from "./components/about";
import AuthOnly from "./components/AuthOnly";

export default function Home() {
  return (
    <div>
      <div>
        <Hero/>
      </div>
      <div>
        <About/>
      </div>
      <AuthOnly>
        <div id="notes">
          <NotesBranchWise />
        </div>
        <div id="reviews">
          <TestimonialCarousel />
        </div>
        <div id="uploads">
          <ShareNotes />
        </div>
      </AuthOnly>
      <div id="contacts">
        <Contact />
      </div>
    </div>
  );
}
