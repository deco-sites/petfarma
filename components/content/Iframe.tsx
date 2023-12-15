import { useEffect, useRef } from "preact/hooks";

export interface Props {
  src: string;
}

const Iframe = ({ src }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.style.height = `${
          iframe.contentWindow!.document.documentElement.scrollHeight
        }px`;
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data === "iframeResize") {
        handleResize();
      }
    };

    const observeIframeChanges = () => {
      const observer = new MutationObserver(handleResize);
      observer.observe(iframeRef.current!.contentDocument!.documentElement, {
        attributes: true,
        childList: true,
        subtree: true,
      });
      return observer;
    };

    const iframe = iframeRef.current;
    iframe?.addEventListener("load", () => {
      handleResize();
      observeIframeChanges();
      iframe.contentWindow?.addEventListener("resize", handleResize);
      iframe.contentWindow?.addEventListener("message", handleMessage);
    });

    return () => {
      iframe?.contentWindow?.removeEventListener("resize", handleResize);
      iframe?.contentWindow?.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <iframe
      title="Petfarma Iframe"
      src={src}
      ref={iframeRef}
      frameBorder="0"
      style={{ width: "100%", border: "none" }}
      allowFullScreen
    />
  );
};

export default Iframe;
