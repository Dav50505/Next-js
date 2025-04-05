import { ReloadIcon } from "@radix-ui/react-icons";

function LoadingTable() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <ReloadIcon className="size-8 animate-spin text-primary" />
    </div>
  )
}

export default LoadingTable