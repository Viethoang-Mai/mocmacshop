import { useSelector, useDispatch } from "react-redux";
import { closeDrop, setOverlay } from "../../../../stores/slices/effectSlice";
import { useCallback, useEffect } from "react";
import clsx from "clsx";
export default function Overlay() {
    const { heightHeader, overlay } = useSelector((state) => state.effect);
    const dispatch = useDispatch();
    const handleClose = (e) => {
        if (e.key === "Escape" || e.type === "click") {
            dispatch(closeDrop());
        }
    };
    useEffect(() => {
        if (overlay === true) {
            document.addEventListener("keydown", handleClose);
            document.addEventListener("click", handleClose);
        }
        return () => {
            document.removeEventListener("keydown", handleClose);
            document.removeEventListener("click", handleClose);
        };
    }, [overlay]);
    return (
        <span
            className={clsx(
                `overlay fixed left-0 right-0 bottom-0 bg-black/30  transition-all duration-150 ease-in-out `,
                overlay ? "opacity-100 z-10" : "opacity-0 z-[-1]"
            )}
            style={{ top: heightHeader + "px" }}
        ></span>
    );
}
