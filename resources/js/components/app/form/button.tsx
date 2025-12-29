const Button = ({ label, type = 'button' }: { label: string; type?: 'button' | 'submit' | 'reset' }) => {
    return (
        <div>
            <button
                type={type}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg p-4 mt-6 md:mt-4"
            >
                {label}
            </button>
        </div>
    );
};

export default Button;