// Runs before React hydrates. On a slow connection the page is visible for
// several seconds before its JavaScript arrives, and a tap on the CTA in that
// window would otherwise be silently dropped — the tap that "does nothing".
// This records which CTA was tapped, so the hydrated button opens the form
// for it (see cta-button.tsx), and flags the button so the CSS-only spinner in
// globals.css shows in the meantime. Once a button is hydrated it carries
// data-tf-live and this listener ignores it.
//
// It only touches attributes, never text or children: React does not patch
// attribute differences during hydration, but a text mismatch would force a
// full client re-render.
const script = `document.addEventListener("click",function(e){var t=e.target;if(!t||!t.closest)return;var b=t.closest("button[data-tf-cta]");if(!b||b.hasAttribute("data-tf-live"))return;e.preventDefault();window.__skTfPendingClick=b;b.setAttribute("aria-busy","true")},true);`;

export default function CtaPrehydrateScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
