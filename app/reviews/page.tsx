import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions";
import ReviewCard from "@/components/reviews/ReviewCard";
import SectionTitle from "@/components/global/SectionTitle";
import FormContainer from "@/components/form/FormContainer";
import { IoTrashOutline  } from "react-icons/io5";


async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser();
  if(reviews.length === 0){
    return <SectionTitle text="No reviews found" />
  }

  return (
    <>
      <SectionTitle text="My Reviews" />
      <section className="grid md:grid-cols-2 gap-9 mt-4">
        {reviews.map((review)=>{
          const {comment,rating} = review;
          const {name,image} = review.product;
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          }

          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo} >
              <DeleteReviewForm reviewId={review.id} />
            </ReviewCard>
          )
        })}
      </section>
    </>
  )
}

const DeleteReviewForm = ({reviewId}:{reviewId:string})=>{
  const deleteReview = deleteReviewAction.bind(null,{reviewId});
  return (
    <FormContainer action={deleteReview}>
      <button type="submit" className="cursor-pointer">
        <IoTrashOutline className="size-4 text-red-500"/>
      </button>
    </FormContainer>
  )
}

export default ReviewsPage