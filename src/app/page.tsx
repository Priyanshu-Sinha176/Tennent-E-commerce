import React from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const page = () => {
  return (
    <div className='p-4'>

      <p className='text-rose-500 '> Hello World </p>

      <div className="flex flex-col gap-y-6">

        <div> <Button variant="elevated"> This is a Button </Button> </div>

        <div> <Input placeholder='I am an Input' />  </div>

        <div> <Progress value={50}/> </div>

        <div> <Textarea placeholder='I am a Text Area' /> </div>

        <div> <Checkbox /> </div>

      </div>

    </div>

  );
}

export default page;
