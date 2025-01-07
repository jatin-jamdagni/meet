import { useState } from "react";



export const useContainerDimensions = () => {

const [containerDimensions, setContainerDimensions] = useState<{ width: number; height: number } | null>(null);

const onContainerLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerDimensions({ width, height });
}


return {
    containerDimensions,
    onContainerLayout
}

}