import { useState, useRef, ChangeEvent, useCallback } from 'react';
import Image from 'next/image';
import { IoCloseOutline } from "react-icons/io5";

interface CustomUploaderProps {
    selectedFile: File | null;
    onFileSelect: (file: File) => void;
    onClear: () => void;
  }

const CustomUploader: React.FC<CustomUploaderProps> = ({ selectedFile, onFileSelect, onClear }) => {
    const [progress, setProgress] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const [dragging, setDragging] = useState(false);
    const dragCounter = useRef(0);
    const dropRef = useRef<HTMLDivElement>(null);

    // Animating download handler
    const handleProgress = (file: Blob) => {
        const reader = new FileReader();
            reader.onprogress = (progressEvent) => {
                const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
            };
            reader.readAsArrayBuffer(file);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            onFileSelect(file);
        }
        if (event.target.files) {
            const file = event.target.files[0];
            handleProgress(file);
        }
    };

    /* Drag & Drop */
    const handleDragIn = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dragCounter.current++;
        if (event.dataTransfer?.items && event.dataTransfer.items.length > 0) {
          setDragging(true);
        } 
    }, []);
    
    const handleDragOut = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setDragging(false);
        }
    }, []);
    
    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);
    
    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragging(false);
        dragCounter.current = 0;
        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            onFileSelect(file);
            if (file) {
            handleProgress(file);
            }   
            event.dataTransfer.clearData();
        }
    }, [onFileSelect]);
    
    const onChooseFile = () => {
        inputRef.current?.click();
    };

    const clearFileInput = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        } 
        onClear();
        setProgress(0);
    };

  return (
    <div  className="flex justify-center items-center min-w-[234px] h-[120px] border-2 border-dashed rounded-[20px] border-gray-400 cursor-pointer"     
        onClick={onChooseFile}
        ref={dropRef}
        onDragOver={handleDragOver}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDrop={handleDrop}
    >
        <input 
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleFileChange}
        />
        
        {!selectedFile && (
            <Image
                src="/assets/icons/plus.svg"
                className=""
                alt="Upload File" 
                width={32} 
                height={32}
            />
        )}

        {selectedFile && (
            <div className="flex gap-4 items-center">
                <div className="overflow-ellipsis overflow-hidden whitespace-nowrap w-32">
                    <h6>{selectedFile.name.slice(0, 9) + "..." + selectedFile.name.split('.').pop()}</h6>
                    <div className="bg-gray-300 w-full h-[5px] rounded-[8px]">
                        <div className="bg-green-500 h-[5px] z-1" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <button onClick={e => {
                    e.stopPropagation();
                    clearFileInput();
                }}>
                    <span className="hover:text-red-400"><IoCloseOutline className="w-[18px] h-[18px]" /></span>
                </button>
            </div>
            
        )}
        {dragging && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-200 bg-opacity-75">
                <p className="text-lg font-semibold">Release the file here</p>
            </div>
        )}
    </div>
  )
}

export default CustomUploader