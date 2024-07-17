import Link from "next/link"

export function Toppagelayout() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <HeroSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-primary to-primary-foreground py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Unlock Your Business Potential
          </h1>
          <p className="max-w-[600px] text-primary-foreground/90 md:text-xl">
            Our cutting-edge platform empowers you to streamline your operations, drive innovation, and achieve
            unprecedented success.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Get Started
            </Link>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
          </div>
        </div>
        <img
          src="/placeholder.svg"
          width="500"
          height="500"
          alt="Hero"
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
        />
      </div>
    </section>
  )
}
