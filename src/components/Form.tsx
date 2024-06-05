'use client';

import CustomSelectBox from '@/components/CustomSelectBox';
import CustomUploader from '@/components/CustomUploader';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formDataSchema } from '@/lib/schema';

// array of skills for CustomSelectBox Component
const options = [
    { value: 1, label: "React" },
    { value: 2, label: "NextJS" },
    { value: 3, label: "PHP" },
    { value: 4, label: "NodeJS" },
    { value: 5, label: "TailwindCSS" },
    { value: 6, label: "HTML/CSS" },
    { value: 7, label: "Python" },
    { value: 8, label: "Java" },
    { value: 9, label: "Bootstrap" },
    { value: 10, label: "Shadcn" },
    { value: 11, label: "Next UI" },
    { value: 12, label: "Django" },
    { value: 13, label: "Laravel" },
];

type FormFields = z.infer<typeof formDataSchema>;

export default function Form() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        setError,
        control,
        clearErrors
    } = useForm<FormFields>({
        resolver: zodResolver(formDataSchema),
    });

    // onSubmit form handler
    const processForm: SubmitHandler<FormFields> = async (data) => {
        // Pretending to send data to the server
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // throw new Error();
            console.log(data);
        } catch (error) {
            setError("root", {
                message: "Unexpected error, please try again.",
            });
        }
    };

    return (
        <div className="flex flex-col gap-[30px] w-[40rem] border rounded-[32px] px-[38.5px] py-[40px]">
            <div className="flex flex-col gap-4 w-[560px] h-[120px]">
                <h1 className="text-4.5xl font-semibold leading-11 tracking-[-.03em] gray-950">Drop us a line</h1>
                <p className="text-xl leading-7.5 tracking-[-.01em] gray-700">Our documentary campaigns feature leading figures, organisations and leaders, in open and candid discussions.</p>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(processForm)} >
                <input
                    className="w-full text-lg h-[64px] border rounded-[20px] bg-gray-200 gray-100 px-5"
                    type="text"
                    placeholder="Name"
                    {...register("name", )}
                />
                {errors.name && (
	                <div className="text-red-500">{errors.name.message}</div>
                )}
                <div className="flex gap-4">
                    <div>
                        <input
                            className="w-full text-lg h-[64px] border rounded-[20px] bg-gray-200 gray-100 px-5 py-0"
                            type="text"
                            placeholder="Phone"
                            {...register("phone", )}
                        />
                        {errors.phone && (
                            <div className="text-red-500">{errors.phone.message}</div>
                        )}
                    </div>
                    <div>
                        <input
                            className="w-full text-lg h-[64px] border rounded-[20px] bg-gray-200 gray-100 px-5 py-0"
                            type="text"
                            placeholder="E-mail"
                            {...register("email", )}
                        />
                        {errors.email && (
                            <div className="text-red-500">{errors.email.message}</div>
                        )}
                    </div>
                </div>
                <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                        <CustomSelectBox 
                            multiple 
                            options={options}
                            {...field}
                        />
                    )}
                /> 
                {errors.skills && (
                    <div className="text-red-500">{errors.skills.message}</div>
                )}
                <div className="flex gap-4 z-0">
                    <div className="flex flex-col gap-3">
                        <h3 className="font-medium text-base text-gray-950">Dokument hochladen</h3>
                        <p className="text-xs leading-[18px] text-gray-400">Klicken Sie auf die Schaltfläche oder ziehen Sie ein Dokument im PDF-, DOCX-, PNG.</p>
                    </div>
                    <Controller
                        name="file"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <CustomUploader
                                selectedFile={value}
                                onFileSelect={(file) => {
                                    onChange(file); // Updating the field value in react-hook-form
                                    clearErrors('file');
                                }}
                                onClear={() => {
                                    onChange(null); // clean up the file
                                    clearErrors('file');
                                }}
                            />
                        )}
                    />
                </div>
                {errors.file && 
                    <div className="text-center text-red-500">
                        {errors.file.message}
                    </div>}
                <Controller
                    control={control}
                    name="consent"
                    render={({ field }) => (
                        <div className="flex gap-4 rounded-lg mt-2 mb-2">
                            <input
                                type="checkbox"
                                className="w-6 h-6"
                                checked={field.value}
                                onChange={e => field.onChange(e.target.checked)}
                            />
                            <h3 className="text-lg leading-[26px]">
                                I'm agree with every data you collect
                            </h3>
                            {errors.consent && (
                                <div className="text-center text-red-500">
                                    {errors.consent.message}
                                </div>
                            )}
                        </div>
                    )}
                />
                <button 
                    type="submit"
                    className="h-16 rounded-full bg-blue-600 text-white z-0"
                    disabled={isSubmitting}
                >
                    <span className="font-medium text-lg leading-[26px]">   
                        {isSubmitting ? "Loading..." : "Send" }
                    </span>
                </button>
                {errors.root && (
                    <div className="text-center text-red-500">{errors.root.message}</div>
                )}
            </form>
        </div>
    )
}