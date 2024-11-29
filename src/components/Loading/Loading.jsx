import "./loading.css";
export default function Loading() {
    return (
        <div className="over-loading fixed z-[1111] inset-0  flex justify-center items-center">
            <span className="loader"></span>
        </div>
    );
}
