
import * as zod from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import Form from '@/components/Form';

export default function Home() {
  return (
    // className=" min-h-screen flex-col items-center justify-between p-24"
    <main className="flex min-h-screen justify-center items-center">
       <Form />
    </main>
  );
}
