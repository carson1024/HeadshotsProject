import blur from "/public/blur.png";
import example from "/public/example.png";
import result from "/public/result.png";

export default function ExplainerSection() {
  return (
    <div className="w-full px-20 mt-16 p-8 bg-gray-100 rounded-lg space-y-8 lg:py-10 border-b border-t border-orange-100 bg-orange-50 items-center py-8">
      <h2 className="text-5xl font-bold text-[#1b145d]">How It Works</h2>

      <div className="w-full flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/3 w-full mt-2 md:px-4">
          {/* Step 1: Upload your images */}
          <div className="space-y-4 text-[#1b145d]">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-3xl font-bold text-[#1b145d] bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
                1
              </div>
              <h3 className="text-2xl font-semibold">Upload your images</h3>
            </div>
            <p className="text-sm text-center">
              Upload 4+ high-quality selfies: front facing, 1 person in frame, no
              glasses or hats.
            </p>
            <img
              src={example.src}
              alt="AI Headshot example"
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="lg:w-1/3 w-full mt-2 md:px-4 text-[#1b145d]">
          {/* Step 2: Train your model */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-3xl font-bold text-[#1b145d] bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
                2
              </div>
              <h3 className="text-2xl font-semibold">Our AI gets to work</h3>
            </div>
            <p className="text-sm text-center">
              The AI magic takes ~20 minutes. You'll get an email when its ready!
            </p>
            <img
              src={blur.src}
              alt="AI Headshot blur"
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="lg:w-1/3 w-full mt-2 md:px-4 text-[#1b145d]">
          {/* Step 3: Generate images */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-3xl font-bold text-[#1b145d] bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
                3
              </div>
              <h3 className="text-2xl font-semibold">Get amazing headshots</h3>
            </div>
            <p className="text-sm text-center">
              Once your model is trained, we'll give you amazing headshots!
            </p>
            <img
              src={result.src}
              alt="AI Headshot result"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
