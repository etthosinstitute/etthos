import React from 'react'
import Image from "next/image";
import { logo } from "@etthos/assets";

const page = () => {
  return (
    <div className=''>
      Hi
      <Image src={logo} alt="Etthos Logo" width={50} height={50} />
      
    </div>
  )
}

export default page
