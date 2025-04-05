import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
function SectionTitle({text, className}: {text:string, className?:string}){
  return (
    <div>
      <h2 className={cn("text-3xl font-medium capitalize tracking-wider mb-8", className)}>{text}</h2>
      <Separator className="border-gray-400 dark:border-gray-300"/>
    </div>
  )
}

export default SectionTitle