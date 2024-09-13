import React from 'react'
import Cart from '../cart/Cart'
import { Input } from '@mui/material'
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Button } from '../ui/button';
export default function MainNav() {
  return (
    <div className='flex flex-row items-center justify-around h-full min-h-20'>
      <Link href={"/"}>
<h1>LOGO</h1>
      </Link>
<div className='flex w-1/2 gap-5'>
<TextField id="outlined-basic" label="Explore" variant="outlined" size='small' fullWidth />
<Button className='text-white bg-black'>Search</Button>
</div>

        <Cart/>
    </div>
  )
}
