import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import ScreenTransition from "./components/ScreenTransition";
import "./app.css";

export default function App() {
  return (
    <Router base={import.meta.env.SERVER_BASE_URL}
      root={props => (
        <>
        <main class="flex flex-col min-h-screen">
          {/* <ScreenTransition /> */}
          <Nav />

          <div class="flex flex-1">
            <Suspense>{props.children}</Suspense>
          </div>
        </main>
        </>
      )}
    >
    <FileRoutes />
    </Router>
  );
}
