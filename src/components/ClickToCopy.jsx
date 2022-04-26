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
    <button className="py-[24px] text-center" onClick={copyText}>
      {copied ? "Copied" : buttonText}
    </button>
  );
}
