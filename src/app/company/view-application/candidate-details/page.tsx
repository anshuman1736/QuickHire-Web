import CandidateDetails from '@/components/company/candiatesApplication/CandidateDetails'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <CandidateDetails/>
    </Suspense>
  )
}

export default page