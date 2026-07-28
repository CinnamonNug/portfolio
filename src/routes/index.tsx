import catGif from "~/assets/cat.gif";

export default function Home() {
  // This is the home page
  return (
   <div class="mt-auto mb-auto w-screen flex flex-col items-center">
    <img 
      src={catGif}
      class='w-90 -mb-15'
    />
    <h1 class="text-3xl md:text-8xl font-mono text-white tracking-tight">
      CENGIZ CIMEN
    </h1>
    <p class="mt-4 text-lg text-white font-mono tracking-tight">
      Computer Science & Mathematics @ UNSW
    </p>
  

    <ul class="flex flex-wrap gap-6 font-mono mt-4 flex-row">
        <li>
          <a class="hover:underline" href="https://github.com/CinnamonNug/rgbd2sdg" target="_blank">[ RGBD2SDG ]</a>
        </li>
        <li>
          <a class="hover:underline" href="https://quantsoc.org" target="_blank">[ QuantSoc ]</a>
        </li>
        <li>
          <a class="hover:underline" href="https://github.com/CinnamonNug/ELPVAnalyser" target="_blank">[ ELPVAnalyser ]</a>
        </li>
    </ul>

  </div>
  );
}
