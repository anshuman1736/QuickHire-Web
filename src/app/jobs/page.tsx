import FilterJobs from "@/components/Jobs/FilterJobs";
import { Suspense } from "react";

export default function Jobs(){
    return(
        <Suspense>
            <FilterJobs/>
        </Suspense>
    )
}