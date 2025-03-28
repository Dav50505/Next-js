function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className='text-center flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl'>
        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center">We love</span>
          <span className='bg-red-600 py-2 px-4 rounded-lg tracking-widest text-white inline-flex items-center min-h-[40px]'>
            store
          </span>
        </div>
      </h1>
      <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground'>
      At Comfy, shopping for furniture isn’t just about finding pieces—it’s about creating a home that reflects 
      your style and comfort. We love this site because it offers a seamless and enjoyable shopping experience,
       whether you’re browsing for a cozy new sofa, a stylish dining set, or the perfect accent piece. With a carefully
        curated selection, high-quality craftsmanship, and an easy-to-navigate interface, Comfy makes decorating
         your space effortless and fun. Plus, with excellent customer service and convenient delivery options,
          furnishing your home has never been easier. This is more than just a furniture store—it’s a place where
           comfort meets style.
      </p>
    </section>
  );
}
export default AboutPage;