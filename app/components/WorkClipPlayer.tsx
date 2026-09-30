import { Icon } from "./Icon";
import { clockDuration, type WorkClip } from "@/lib/workClips";

/**
 * One job clip.
 *
 * A plain <video> with preload="none". No client component, no player library,
 * no JavaScript of any kind — the whole card ships as HTML.
 *
 * The obvious alternative was a click-to-mount facade: show a lazily-loaded
 * poster, and only put a <video> in the DOM once the visitor taps. That is
 * marginally lighter, and it is the wrong call here, because Google's video
 * indexing guidance is explicit that a page must not "rely on user actions
 * (such as swiping, clicking, or typing) to load the video" and that the video
 * must be present and measurable in the rendered HTML. A facade hides the video
 * from exactly the crawler this page exists to talk to.
 *
 * preload="none" gets almost all of the performance back anyway: the browser
 * fetches the poster image and zero bytes of video until play is pressed. The
 * cost is that posters are fetched eagerly (there is no lazy-loading a <video>
 * poster), which is why posters want to be small — see docs/work-proof.md.
 *
 * The native controls are already keyboard-operable and already announce
 * themselves to screen readers. react-player or video.js would add more
 * kilobytes than every poster on this page put together, and take that away.
 */
export function WorkClipPlayer({ clip }: { clip: WorkClip }) {
  return (
    <figure className="work-clip" id={`clip-${clip.slug}`}>
      <div className="work-clip-frame">
        <video
          className="work-clip-video"
          src={clip.src}
          poster={clip.poster}
          controls
          playsInline
          // Muted by default: the footage is shot on real jobs and its audio is
          // site noise and whatever was playing nearby, none of it licensed for
          // this site. Controls stay on, so a visitor who wants sound can
          // unmute; nothing is stripped from the file itself.
          muted
          preload="none"
          // Read out by screen readers in place of the bare "video" the native
          // control group would otherwise announce.
          aria-label={`Video: ${clip.title}`}
        >
          Your browser cannot play this video.{" "}
          <a href={clip.src}>Download the clip instead.</a>
        </video>
        {clip.durationSeconds ? (
          <span className="work-clip-time" aria-hidden="true">
            {clockDuration(clip.durationSeconds)}
          </span>
        ) : null}
      </div>
      <figcaption className="work-clip-body">
        <h3>{clip.title}</h3>
        <p>{clip.description}</p>
        {clip.city ? (
          <div className="work-clip-meta">
            <Icon name="map" size={14} />
            <span>{clip.city}</span>
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}
