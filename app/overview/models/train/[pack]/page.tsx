import TrainModelZone from "@/components/TrainModelZone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export default async function Index({ params }: { params: { pack: string } }) {

  return (
    <div className="w-full px-20 mx-auto pt-[100px] training">
      <div
        id="train-model-container"
        className="flex flex-1 flex-col gap-2 px-2"
      >
        <Link href={packsIsEnabled ? "/overview/packs" : "/overview"} className="text-sm w-fit">
          <Button variant={"outline"} className="w-[500px] py-6 text-[white] px-2 md:px-8 mt-4 shadow-md md:mt-6 text-xl flex w-full md:w-auto  md:inline-flex justify-center items-center rounded-full  font-semibold bg-[#20aca0] hover:bg-[#20aca0] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all">
            <FaArrowLeft className="mr-2" />
            Go Back
          </Button>
        </Link>
        <Card>
          <CardContent className="grid gap-6">
            <TrainModelZone packSlug={params.pack} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
