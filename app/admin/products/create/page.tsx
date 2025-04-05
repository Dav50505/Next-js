// import {faker} from '@faker-js/faker'
import FormInput from "@/components/form/FormInput";
import { createProduct } from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import { SubmitButton } from "@/components/form/Buttons";


function CreateProductPage() {
  const description = "This section provides an overview of the key details, including important features, specifications, and relevant information. It highlights the main points, ensuring clarity and ease of understanding.";
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>create product</h1>
      <div className='border p-8 rounded-md'>
       <FormContainer action={createProduct}>
        <div className="grid gap-4 md:grid-cols-2 my-4">
          <FormInput type='text' name='name' label='product name' placeholder='Product'/>
          <FormInput type='text' name='company' label='company name' placeholder='Company'/>
          <PriceInput/>
          <ImageInput/>
        </div>
        <TextAreaInput name='description' labelText='description' defaultValue={description}/>
        <div className="mt-6">
          <CheckBoxInput name='featured' label='featured'/>
        </div>
        <SubmitButton text='create product' className="mt-8 bg-red-500 hover:bg-red-600"/>
       </FormContainer>
      </div>
    </section>
  )
}

export default CreateProductPage