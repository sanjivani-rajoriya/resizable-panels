type Props = {
  width: number | "auto";
  bg?: string;
  children: React.ReactNode;
};

export default function ResizablePanel({ width, bg = "bg-white", children }: Props) {
  return (
    <div
      style={{ width: width === "auto" ? "auto" : width }}
      className={`${bg} p-4 overflow-auto`}
    >
      {children}
    </div>
  );
}
