import { RoundedSkeleton } from "./RoundedSkeleton";

interface AvatarProps {
  loading?: boolean;
  avatarUrl?: string | null;
  size?: "small" | "medium" | "big";
}

const sizeMap = {
  small: ["w-10", "h-10"],
  medium: ["w-24", "h-24"],
  big: ["w-36", "h-36"],
};

export default function Avatar({
  loading = false,
  avatarUrl = "",
  size = "medium",
}: AvatarProps) {
  const [width, height] = sizeMap[size];
  const placeholderCssClass = !avatarUrl ? "placeholder" : "";
  return (
    <div className={`avatar ${placeholderCssClass}`}>
      <div className={`${width} rounded-full`}>
        {loading || !avatarUrl ? (
          <RoundedSkeleton className={`${height} ${width}`} />
        ) : (
          <img src={avatarUrl} />
        )}
      </div>
    </div>
  );
}
