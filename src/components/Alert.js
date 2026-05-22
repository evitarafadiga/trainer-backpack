const Alert = ({ message, show }) => {
    if (!show) return null;
    
    return (
        <>
            <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                <p>{message}</p>
            </div>
        </>
    )
}

export default Alert;