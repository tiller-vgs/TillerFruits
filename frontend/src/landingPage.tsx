function landingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-bright-snow ">
      <h1 className="text-5xl font-bold text-coffee-bean mb-4">Velkommen til TillerFruits</h1>
      <p className="text-xl text-coffee-bean mb-8">Skole ting</p>
      <p className="text-lg text-coffee-bean mb-4">Som en elev så kan du få dine tekster vurdert av andre elever!</p>
      <p className="text-lg text-coffee-bean mb-4">Som en lærer så kan du se hva elevene vurderer de andre basert på dine kriterier!</p>
      <a href="/home" className="text-coffee-bean underline hover:opacity-70 mt-4">Get started!</a>
    </div>
  )
}

export default landingPage