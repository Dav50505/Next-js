import Link from "next/link"
import { Button } from "../ui/button"
import HeroCarousel from "./HeroCarousel"

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div className="text-center lg:text-left">
        <h1 className="max-w-2xl mx-auto lg:mx-0 font-bold text-4xl tracking-tight sm:text-6xl">
          We are changing the way you shop.
        </h1>
        <p className="mt-8 max-w-xl mx-auto lg:mx-0 text-lg leading-8 text-muted-foreground">
        At Comfy, we&apos;re redefining the furniture shopping experience. With a 
        perfect blend of style, quality, and comfort, we make it easier than 
        ever to find pieces that truly feel like home. Explore our curated 
        collections, enjoy seamless online and in-store browsing, and let our 
        expert team help you bring your vision to life.
        </p>
        <Button asChild size='lg' className="mt-10"> 
          <Link className="bg-red-600 hover:bg-red-700" href='/products'>Shop Now</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  )
}

export default Hero