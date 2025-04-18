"use client"

import { useState } from "react";
import { Button } from "../ui/button";


function Comment({comment}:{comment:string}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () =>{
    setIsExpanded(!isExpanded);
  }

  const longComment = comment.length > 100;
  // const displayComment = longComment ? comment.slice(0,100) + "..." : comment; // Removed unused variable

  return (
    <div>
      <p className="text-sm">
        {isExpanded ? comment : (longComment ? comment.slice(0,100) + "..." : comment)}
      </p>
      {longComment && <Button variant='link' className="pl-0 text-muted-foreground" onClick={toggleExpanded}>
        {isExpanded ? "Show less" : "Show more"}
      </Button>}
    </div>
  )
}

export default Comment