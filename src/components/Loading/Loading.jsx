import "./loading.css";
export default function Loading() {
    return (
        <div className="over-loading absolute z-50 inset-0 max-h-screen justify-center items-center">
            <span className="loader"></span>
        </div>
    );
}
