'use client';

import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';

export type SelectOption = {
    label: string
    value: string | number
}

type MultipleSelectProps = {
    multiple: true
    value: SelectOption[]
    onChange: (value: SelectOption[]) => void
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

const CustomSelectBox = ({ multiple, options, value, onChange }: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
    const [shouldStayOpen, setShouldStayOpen] = useState(false);

    // When select skills
    function selectOption(option: SelectOption) {
        if (multiple) {
            if (value && value.find(o => o.value === option.value)) {
                onChange(value.filter(o => o.value !== option.value));
            } else {
                onChange([...value ?? [], option]);
            }
        } else {
            onChange(option);
        }
    };

    // Clean Up chosen skills
    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined);
    };

    function isOptionSelected(option: SelectOption) {
        return multiple ? 
            value 
                ? value.some(v => v.label === option.label) 
                : false
            : value === option;    
    }
	
	return (
        <div className="flex flex-col justify-beetween w-full text-lg border rounded-[20px] text-gray-400 bg-gray-200 px-5 py-0">
            <div 
                className="flex justify-between items-center cursor-pointer min-h-[64px]"
                tabIndex={0}
                onBlur={() => {
                    if (!shouldStayOpen) {
                        setIsOpen(false);
                    }
                }}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span className="flex flex-wrap gap-2 py-2 text-gray-950">
                    {multiple
                        ? (value as SelectOption[])?.length > 0
                            ? (value as SelectOption[]).map(v => (
                                <button
                                    className="rounded-[20px] border text-white bg-coolgray hover:bg-red-400 p-1"
                                    key={v.value}
                                    onClick={(e => {
                                        e.stopPropagation()
                                        selectOption(v)
                                    })
                                }>
                                    {v.label}
                                    <span className="p-1">&times;</span>
                                </button>
                            ))
                            : <span className="text-gray-400">Your skill</span>
                        : ((value as SelectOption)?.label || <span className="text-gray-400">Your skill</span>)
                    }
                </span>
                <div className="flex justify-between items-center mr-[2px]">
                    <IoCloseOutline 
                        className={`text-gray-950 w-5 h-5 ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 '}`}
                        onClick={e => {
                            e.stopPropagation();
                            clearOptions();
                        }}
                    />
                    {isOpen ? 
                        <BiChevronUp className="text-gray-950" />
                     : 
                        <BiChevronDown className="text-gray-950" />
                    }           
                </div>
            </div>
            <ul className={`text-gray-800  ${isOpen ? 'opacity-100 h-auto mb-2 cursor-pointer' : 'opacity-0 h-0'} transition-all duration-200`}>
                {options.map((option) => (
                    <li
                        key={option.value} 
                        className={
                            `flex justify-start items-center gap-x-2 ${isOptionSelected(option) ? 'bg-blue-300' :  ''} hover:bg-gray-300`
                        }
                        onMouseDown={() => {
                            setShouldStayOpen(true);
                            setTimeout(() => setShouldStayOpen(false), 200);
                        }}
                        onClick={e => {
                            isOpen ? (
                                e.stopPropagation(),
                                selectOption(option)
                            ) : null
                        }}
                    >
                        <AiOutlineCheck className={`text-gray-950 ${isOptionSelected(option) ? 'opacity-100' : 'opacity-0'}`} />
                        <span>{option.label}</span>
                    </li>
                ))}
            </ul>
        </div>
	);
}

export default CustomSelectBox;