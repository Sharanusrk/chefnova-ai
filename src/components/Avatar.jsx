import { ChefHat, User } from "lucide-react";

export function AIAvatar() {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-paprika bg-paper">
      <span className="absolute inset-1 rounded-full border border-dashed border-paprika/40" />
      <ChefHat size={19} className="text-paprika" />
    </div>
  );
}

export function UserAvatar() {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper">
      <User size={19} className="text-ink" />
    </div>
  );
}
