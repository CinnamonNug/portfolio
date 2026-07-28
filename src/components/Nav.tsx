import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";
  return (
    <div class="bg-black-800" >
      <ul class="container flex items-center p-3 text-white-200">
        {/* <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li> */}
        <li class={`border-b-2 ${active("")} mx-1.5 sm:mx-6`}>
          <a href="https://github.com/CinnamonNug" target="_blank"> [ Github ]</a>
        </li>
        <li class={`border-b-2 ${active("")} mx-1.5 sm:mx-6`}>
          <a href="https://www.linkedin.com/in/cencimen/" target="_blank">[ LinkedIn ]</a>
        </li>
        <li class={`border-b-2 ${active("")} mx-1.5 sm:mx-6`}>
          <a href="https://leetcode.com/u/cengizcimen007/" target="_blank">[ LeetCode ]</a>
        </li>
        <li class={`border-b-2 ${active("")} mx-1.5 sm:mx-6`}>
          <a href="mailto:cencimen200@gmail.com" target="_blank">[ Contact ]</a>
        </li>
        
        
      </ul>
    </div>
  );
}
