"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";
import { type actionFunction } from "@/utils/types";
import { Popsicle } from "lucide-react";

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

function ImageInputContainer(props: ImageInputContainerProps) {
    const {image, name, action, text} = props;
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  return (
    <div className="mb-8 ">
        <Image src={image} width={250} height={250} 
        className="rounded object-cover mb-4 w-[250px] h-[250px]"
        alt={name}
        priority
        />
        <Button variant='outline' size='sm' 
        onClick={()=>setIsUpdateFormVisible((prev)=>!prev)}
        >
            {text}
        </Button>
        {isUpdateFormVisible && <div className="max-w-md mt-4 ">
            <FormContainer action={action}>
                {props.children}
                <ImageInput/>
                <SubmitButton size="sm" text={text} className="mt-4 bg-red-500 hover:bg-red-600" />
            </FormContainer>
            </div>}
    </div>
  )
}

export default ImageInputContainer