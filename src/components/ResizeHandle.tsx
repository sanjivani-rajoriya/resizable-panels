const MIN_WIDTH = 100;
const MAX_WIDTH = 800;

type Props = {
  type: "left" | "right";
  size: number;
  onMouseDown: (type: "left" | "right", e: React.MouseEvent) => void;
  onKeyDown: (type: "left" | "right", e: React.KeyboardEvent) => void;
};

export default function ResizeHandle({ type, size, onMouseDown, onKeyDown }: Props) {
  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation="vertical"
      aria-valuenow={size}
      aria-valuemin={MIN_WIDTH}
      aria-valuemax={MAX_WIDTH}
      onMouseDown={(e) => onMouseDown(type, e)}
      onKeyDown={(e) => onKeyDown(type, e)}
      className="w-1 bg-gray-400 cursor-col-resize"
    />
  );
}
