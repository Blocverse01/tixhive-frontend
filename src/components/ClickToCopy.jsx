import useCopy from "use-copy";

export default function ClickToCopy({ text, buttonText }) {
  const [copied, copy, setCopied] = useCopy(text);
  const copyText = () => {
    copy();
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <button className="text-center rounded-none" onClick={copyText}>
      {copied ? "Copied" : buttonText}
    </button>
  );
}
