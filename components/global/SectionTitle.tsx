import { Separator } from "@/components/ui/separator"

function SectionTitle({text}: {text:string}){
  return (
    <div>
      <h2 className="text-3xl font-medium capitalize tracking-wider mb-8">{text}</h2>
      <Separator className="border-gray-400 dark:border-gray-300"/>
    </div>
  )
}

export default SectionTitle