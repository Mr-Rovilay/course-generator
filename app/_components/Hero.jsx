import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
<section className="bg-gray-50">
  <div className="max-w-screen-xl px-4 py-32 mx-auto lg:flex lg:items-center">
    <div className="max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl text-primary">
       AI course Generator
        <strong className="font-extrabold text-black sm:block"> Custom learning path by AI </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
       Unlock personalized information with AI-driven course creation tailor your learning journey to fit our unique goas andd pace
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link
          className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-primary focus:outline-none sm:w-auto"
          href="/dashboard"
        >
          Get Started
        </Link>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero