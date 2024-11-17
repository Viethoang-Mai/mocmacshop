import "./loading.css";
export default function Loading() {
    return (
        <div className="over-loading fixed z-50 inset-0 justify-center items-center">
            <span className="loader"></span>
        </div>
    );
}
