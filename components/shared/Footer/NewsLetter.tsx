import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const NewsLetter = () => {
  return (
    <div className="flex w-full h-[200px] bg-Neutral-white-W100 justify-center items-center">
      <div className="w-full container max-w-5xl flex flex-col md:flex-row justify-center md:justify-between ">
        <div className="max-md:mb-5">
          <h4 className="text-[24px] text-Neutral-B900 font-bold mb-3 md:mb-7">
            Join Our Newsletter
          </h4>
          <span className=" text-Neutral-B500 text-[14px] font-normal">
            We love to surprise our subscribers with occasional gifts.
          </span>
        </div>

        <div className="flex gap-4 items-center">
          <Input className="border-[1px] border-Neutral-B300 w-[250px]" placeholder="Enter your email" type="email"/>
          <Button>
            Subscribe
          </Button>
        </div>

      </div>
    </div>
  )
}

export default NewsLetter