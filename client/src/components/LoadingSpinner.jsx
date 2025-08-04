import { Loader2 } from "lucide-react";
export const LoadingSpinner = ({ message = "Loading amazing content" }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-4" />
    <p className="text-slate-400 text-lg">{message}</p>
  </div>
);
