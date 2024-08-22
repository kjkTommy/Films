import { RefObject, useEffect, useRef, useState } from "react";

export const useOutsideClick = (initialValue: boolean) => {
    const [isActive, setIsActive] = useState<boolean>(initialValue);
    const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return { ref, isActive, setIsActive };
};
