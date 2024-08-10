

const Footer = () => {
  return (
    <div className="mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col space-y-4 md:space-y-0 items-start  md:justify-between text-sm md:text-md py-8">
      <div className="flex flex-col text-white">
        <p>Featured Blogs</p>
        <p>Most Viewed</p>
        <p>User's Choice</p>
      </div>

      <div className="flex flex-col text-white">
        <p>Forum</p>
        <p>Support</p>
        <p>Recent posts</p>
      </div>

      <div className="flex flex-col text-white">
        <p>Privacy Policy</p>
        <p>About Us</p>
        <p>Terms and Conditions</p>
      </div>
    </div>
  )
}

export default Footer
