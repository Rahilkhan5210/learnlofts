import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '@/Features/Api/purchaseApi'
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BuyCourseButton = ({courseId}) => {
  const [createCheckoutSession,{data,isLoading,isSuccess,isError,error}] =useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async()=>{
    await createCheckoutSession(courseId);
  }

  //useEffect
  useEffect(()=>{
    if(isSuccess){
      if(data?.url){
        window.location.href = data.url; // Redirect to stripe checkout
      }else{
        toast.error("Invalid Response From Server");
      }
    }
    if(isError){
      toast.error(error?.data?.message || "Failed To Create Checkout Session");
    }
  },[data,isSuccess,isError,error]);
  return (
    <Button 
    onClick={purchaseCourseHandler}
    className='w-full'>
      {
        isLoading ? (
          <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
          Please Wait
          </>
        ):"Purchase Course"
      }
    </Button>
  )
}

export default BuyCourseButton
