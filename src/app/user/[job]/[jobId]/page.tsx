import JobView from '@/components/user/jobView/jobView'
import React from 'react'

function page({params}) {
  console.log('jobId', params.jobId)
  return (
    <JobView/>
  )
}

export default page